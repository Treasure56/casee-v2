import ScrollAnimation from "./ScrollAnimation";
import Simple from "./Simple";

export default function Page() {
    return (
        <div className="p-20">
            <Simple />
            <ScrollAnimation />
        </div>
    );
}