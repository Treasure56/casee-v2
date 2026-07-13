import RegisterForm from "./RegisterForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight mt-2">Let&apos;s get started 🎉</h1>
        <p className="text-sm text-muted-foreground">
          Design your case. Make it yours.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}




