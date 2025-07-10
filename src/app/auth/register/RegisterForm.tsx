import AppInput, { AppInputProps } from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { paths } from "@/utils/paths";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-4 w-full">
      {formFields.map((field) => (
        <AppInput key={field.name} {...field} />
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
      <FormButton className="w-full btn btn-primary !py-3 !rounded-md">Sign Up</FormButton>
       <div className=" flex gap-2">
        <p>Already have an account?</p>
        <Link href={paths.login} className="text-brand-primary font-semibold">
          Login
        </Link>
      </div>
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "Full Name",
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
