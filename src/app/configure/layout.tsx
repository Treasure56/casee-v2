import Step from "@/components/ui/Step";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="min-h-screen">
            <Step />
            {children}
        </section>
    );
}