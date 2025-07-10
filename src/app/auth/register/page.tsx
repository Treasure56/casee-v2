import RegisterForm from "./RegisterForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 mb-4 ">
                <h1 className=" text-2xl md:text-3xl font-semibold">Let&apos;s get started 🎉 </h1>
            <p className="text-gray-500">Register to start creating your custom phone cases</p>
            </div>
            <RegisterForm />
            
        </div>
    );
}


