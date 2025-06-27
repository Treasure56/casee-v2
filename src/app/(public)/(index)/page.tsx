import Hero from "./Hero";
import Reviews from "./Reviews";
import Testimonials from "./Testimonials";
import UploadSection from "./UploadSection";

export default function Page() {
    return (
        <main>
            <Hero />
            <Testimonials />
            <Reviews />
            <UploadSection />
        </main>
    );
}