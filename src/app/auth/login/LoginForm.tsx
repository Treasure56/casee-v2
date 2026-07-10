"use client";

import AppInput from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { FormMessage } from "@/components/form/FormMessage";
import { useAppActionState } from "@/hooks/useAppActionState";
import { paths } from "@/utils/paths";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

const formFields = [
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
];

export default function LoginForm() {
  const { state, action, formKey } = useAppActionState(loginAction, {
    closeOnSuccess: false,
  });

  return (
    <form key={formKey} action={action} className="flex flex-col gap-4 w-full">
      <FormMessage res={state} />

      {formFields.map((field) => (
        <AppInput
          key={field.name}
          {...field}
          error={state?.fieldErrors?.[field.name]}
        />
      ))}

      <FormButton type="submit" className="w-full btn btn-primary !py-3 !rounded-md">
        Login
      </FormButton>

      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-2">
          <p>Don&apos;t have an account?</p>
          <Link href={paths.register} className="text-brand-primary font-semibold">
            Sign Up
          </Link>
        </div>
        <Link href={paths.forgotPassword} className="text-muted-foreground hover:text-foreground transition-colors">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}
