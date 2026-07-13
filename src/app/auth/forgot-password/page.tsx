import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight mt-2">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to recover your account.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
