"use client";

import AppInput, { AppInputProps } from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { useState } from "react";

export default function ForgetPasswordForm() {
  const [step] = useState<"email" | "otp" | "password">("email");
  

  return (
    <form className="flex flex-col gap-3 py-3 text-neutral-500">

      {formFields.slice(0, 1).map((field) => (
        <AppInput
          key={field.name}
          {...field}
          readonly={step !== "email"}
        />
      ))}
      {step === "otp" &&
        formFields
          .slice(1, 2)
          .map((field) => (
            <AppInput
              key={field.name}
              {...field}
            />
          ))}
      {step === "password" &&
        formFields
          .slice(2)
          .map((field) => (
            <AppInput
              key={field.name}
              {...field}
            />
          ))}
      <FormButton
        className="btn-primary btn !py-3 px-4 text-center !rounded-md"
      >
        {step === "email"
          ? "Send Verification Code"
          : step === "otp"
          ? "Verify OTP"
          : "Reset Password"}
      </FormButton>
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "email",
    type: "email",
    placeholder: "example@gmail.com",
    title: "Email",
  },
  {
    name: "otp",
    type: "number",
    placeholder: "Enter verification code",
    title: "Verification Code",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter new password",
    title: "New Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm new password",
    title: "Confirm Password",
  },
];
