"use server";

import { dbConnect } from "@/lib/db";
import User from "@/types/User";
import bcrypt from "bcryptjs";
import { createSessionCookie } from "@/lib/auth";
import { RegisterSchema, LoginSchema } from "@/validators/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ActionResponse } from "@/types";

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
    const fieldErrors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        const key = issue.path[0].toString();
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
    });
    return { error: "Validation failed", fieldErrors };
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

  redirect("/");
}

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
    const fieldErrors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        const key = issue.path[0].toString();
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
    });
    return { error: "Validation failed", fieldErrors };
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

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
