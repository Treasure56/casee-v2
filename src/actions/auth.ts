"use server";

import { dbConnect } from "@/lib/db";
import User from "@/types/User";
import PasswordResetToken from "@/types/PasswordResetToken";
import bcrypt from "bcryptjs";
import { createSessionCookie } from "@/lib/auth";
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOtpSchema,
  ResetPasswordSchema,
} from "@/validators/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ActionResponse } from "@/types";
import { generateOtp, extractFieldErrors } from "@/functions/helpers";

// register action
export async function registerAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  await dbConnect();

  const rawName = formData.get("name") as string;
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;
  const rawConfirmPassword = formData.get("confirmPassword") as string;

  const result = RegisterSchema.safeParse({
    name: rawName,
    email: rawEmail,
    password: rawPassword,
    confirmPassword: rawConfirmPassword,
  });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: extractFieldErrors(result.error.issues),
    };
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const res = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log(" New user registered:", res);

    await createSessionCookie(res._id.toString());
  } catch (err) {
    console.log("Register error:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }

  redirect("/configure/upload");
}

// login action

export async function loginAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  await dbConnect();

  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const result = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: extractFieldErrors(result.error.issues),
    };
  }

  const { email, password } = result.data;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) {
      return { error: "Invalid email or password" };
    }

    await createSessionCookie(user._id.toString());
  } catch (err) {
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }

  redirect("/configure/upload");
}

// forgot password action step 1
export async function forgotPasswordAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  await dbConnect();

  const rawEmail = formData.get("email") as string;

  const result = ForgotPasswordSchema.safeParse({ email: rawEmail });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: extractFieldErrors(result.error.issues),
    };
  }

  const { email } = result.data;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return {
        error: "No account exists with this email address.",
      };
    }

    // Generate OTP and hash it before storing
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Upsert: overwrites any previous token for this email
    await PasswordResetToken.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        verified: false,
      },
      { upsert: true, new: true },
    );

    // Send the plaintext OTP via email
    await sendPasswordResetEmail(normalizedEmail, otp);

    return {
      success: "A verification code has been sent to your email.",
    };
  } catch (err) {
    console.error("Forgot password error:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─── Forgot Password: Step 2 — Verify OTP ───────────────────────────────────

export async function verifyOtpAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  await dbConnect();

  const rawEmail = formData.get("email") as string;
  const rawOtp = formData.get("otp") as string;

  const result = VerifyOtpSchema.safeParse({ email: rawEmail, otp: rawOtp });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: extractFieldErrors(result.error.issues),
    };
  }

  const { email, otp } = result.data;
  const normalizedEmail = email.toLowerCase();

  try {
    const token = await PasswordResetToken.findOne({
      email: normalizedEmail,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return {
        error: "Verification code has expired. Please request a new one.",
      };
    }

    const isValid = await bcrypt.compare(otp, token.otp);
    if (!isValid) {
      return { error: "Invalid verification code. Please try again." };
    }

    // Mark as verified so Step 3 can proceed
    token.verified = true;
    await token.save();

    return { success: "Verification code confirmed." };
  } catch (err) {
    console.error("Verify OTP error:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─── Forgot Password: Step 3 — Reset Password ───────────────────────────────

export async function resetPasswordAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  await dbConnect();

  const rawEmail = formData.get("email") as string;
  const rawOtp = formData.get("otp") as string;
  const rawPassword = formData.get("password") as string;
  const rawConfirmPassword = formData.get("confirmPassword") as string;

  const result = ResetPasswordSchema.safeParse({
    email: rawEmail,
    otp: rawOtp,
    password: rawPassword,
    confirmPassword: rawConfirmPassword,
  });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: extractFieldErrors(result.error.issues),
    };
  }

  const { email, otp, password } = result.data;
  const normalizedEmail = email.toLowerCase();

  try {
    // Find a verified, non-expired token
    const token = await PasswordResetToken.findOne({
      email: normalizedEmail,
      verified: true,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return { error: "Reset session has expired. Please start over." };
    }

    // Defense in depth: re-verify OTP
    const isValid = await bcrypt.compare(otp, token.otp);
    if (!isValid) {
      return { error: "Invalid reset session. Please start over." };
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email: normalizedEmail },
      { password: hashedPassword },
    );

    // Clean up the used token
    await PasswordResetToken.deleteOne({ _id: token._id });

    return { success: "Password reset successfully. You can now log in." };
  } catch (err) {
    console.error("Reset password error:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
