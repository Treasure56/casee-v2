import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Page() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mt-4">Forgot Password</h1>
            <p className="text-gray-500 ">Please enter your email address to reset your password.</p>
            <ForgotPasswordForm />
        </div>
    );
}