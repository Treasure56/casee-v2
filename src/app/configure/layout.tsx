import Step from "@/components/ui/Step";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex-1 flex flex-col">
            <Step />
            {children}
        </section>
    );
}