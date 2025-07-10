import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className=" flex flex-col gap-3 ">
      <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold mt-4">Welcome Back</h3>
        <LoginForm />
      </div>
    </div>
  );
}
