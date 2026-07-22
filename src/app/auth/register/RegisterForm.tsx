"use client";

import AppInput from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { FormMessage } from "@/components/form/FormMessage";
import GoogleSignInButton from "@/components/form/GoogleSignInButton";
import { useAppActionState } from "@/hooks/useAppActionState";
import { paths } from "@/utils/paths";
import Link from "next/link";
import { registerAction } from "@/actions/auth";

export default function RegisterForm() {
  const { state, action, formKey } = useAppActionState(registerAction);

  return (
    <div className="flex flex-col gap-4 w-full">
      <form key={formKey} action={action} className="flex flex-col gap-4 w-full">
        <FormMessage res={state} />

        {formFields.map((field) => (
          <AppInput
            key={field.name}
            {...field}
            error={state?.fieldErrors?.[field.name]}
          />
        ))}

        <p className="text-xs text-center text-neutral-400 my-2 w-full">
          By creating an account, you agree to our{" "}
          <Link
            href={paths.termsAndCondition}
            className="text-brand-primary font-semibold"
          >
            Terms and Conditions
          </Link>
          {" and "}
          <Link href={paths.privacy} className="text-brand-primary font-semibold">
            Privacy Policy
          </Link>
          .
        </p>

        <FormButton
          type="submit"
          className="w-full btn btn-primary !py-3 !rounded-md"
        >
          Sign Up
        </FormButton>

        <div className="flex gap-2 justify-center">
          <p>Already have an account?</p>
          <Link href={paths.login} className="text-brand-primary font-semibold">
            Login
          </Link>
        </div>
      </form>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <GoogleSignInButton />
    </div>
  );
}

const formFields = [
  {
    name: "name",
    placeholder: "Enter your full name",
    title: "Full Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    title: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    title: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    title: "Confirm Password",
  },
];
