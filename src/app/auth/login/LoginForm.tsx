import AppInput, { AppInputProps } from "@/components/form/AppInput";
import FormButton from "@/components/form/FormButton";
import { paths } from "@/utils/paths";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4 w-full">
      {formFields.map((field) => (
        <AppInput key={field.name} {...field} />
      ))}

      
      <FormButton className="w-full btn btn-primary !py-3 !rounded-md">Login</FormButton>
      <div className="flex justify-between items-center">
       <div className="flex gap-2">
         <p>Don&apos;t have an account?</p>
        <Link href={paths.register} className="text-brand-primary font-semibold">
          Sign Up
        </Link>
       </div>
        <Link href={paths.forgotPassword} className="text-gray-700 ">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

const formFields: AppInputProps[] = [
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
