"use client";

import AppInput from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { FormMessage } from "@/components/form/FormMessage";
import { useAppActionState } from "@/hooks/useAppActionState";
import { paths } from "@/utils/paths";
import Link from "next/link";
import { useState } from "react";
import {
  forgotPasswordAction,
  verifyOtpAction,
  resetPasswordAction,
} from "@/actions/auth";

type Step = "email" | "otp" | "password";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // ─── Step 1: Send OTP ────────────────────────────────────────────────

  const emailForm = useAppActionState(forgotPasswordAction, {
    closeOnSuccess: false,
    onSuccess: () => {
      setEmail(
        (document.querySelector('input[name="email"]') as HTMLInputElement)
          ?.value ?? "",
      );
      setStep("otp");
    },
  });

  // ─── Step 2: Verify OTP ──────────────────────────────────────────────

  const otpForm = useAppActionState(verifyOtpAction, {
    closeOnSuccess: false,
    onSuccess: () => {
      setOtp(
        (document.querySelector('input[name="otp"]') as HTMLInputElement)
          ?.value ?? "",
      );
      setStep("password");
    },
  });

  // ─── Step 3: Reset Password ──────────────────────────────────────────

  const passwordForm = useAppActionState(resetPasswordAction, {
    closeOnSuccess: false,
  });

  // Select the active form state based on the current step
  const activeForm =
    step === "email" ? emailForm : step === "otp" ? otpForm : passwordForm;

  return (
    <>
      <form
        key={activeForm.formKey}
        action={activeForm.action}
        className="flex flex-col gap-3 py-3 text-neutral-500"
      >
        <FormMessage res={activeForm.state} />

        {/* Hidden fields to carry state across steps */}
        {step !== "email" && (
          <input type="hidden" name="email" value={email} />
        )}
        {step === "password" && (
          <input type="hidden" name="otp" value={otp} />
        )}

        {/* Step 1: Email */}
        {step === "email" && (
          <AppInput
            name="email"
            type="email"
            placeholder="example@gmail.com"
            title="Email"
            error={activeForm.state?.fieldErrors?.["email"]}
          />
        )}

        {/* Show email as readonly in later steps */}
        {step !== "email" && (
          <AppInput
            name="_email_display"
            type="email"
            placeholder="example@gmail.com"
            title="Email"
            value={email}
            readonly
          />
        )}

        {/* Step 2: OTP */}
        {step === "otp" && (
          <AppInput
            name="otp"
            type="text"
            placeholder="Enter 6-digit verification code"
            title="Verification Code"
            inputProps={{ inputMode: "numeric", maxLength: 6 }}
            error={activeForm.state?.fieldErrors?.["otp"]}
          />
        )}

        {/* Step 3: New Password */}
        {step === "password" && (
          <>
            <AppInput
              name="password"
              type="password"
              placeholder="Enter new password"
              title="New Password"
              error={activeForm.state?.fieldErrors?.["password"]}
            />
            <AppInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              title="Confirm Password"
              error={activeForm.state?.fieldErrors?.["confirmPassword"]}
            />
          </>
        )}

        <FormButton className="btn-primary btn !py-3 px-4 text-center !rounded-md">
          {step === "email"
            ? "Send Verification Code"
            : step === "otp"
              ? "Verify Code"
              : "Reset Password"}
        </FormButton>
      </form>

      {/* Success state: show login link */}
      {step === "password" && passwordForm.state?.success && (
        <div className="text-center mt-2">
          <Link
            href={paths.login}
            className="text-brand-primary font-semibold"
          >
            Go to Login →
          </Link>
        </div>
      )}

      <div className="flex gap-2 justify-center mt-2">
        <p>Remember your password?</p>
        <Link href={paths.login} className="text-brand-primary font-semibold">
          Login
        </Link>
      </div>
    </>
  );
}
