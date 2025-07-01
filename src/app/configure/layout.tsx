import Step from "@/components/ui/Step";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="app-container py-12">
            <Step />
            {children}
        </section>
    );
}