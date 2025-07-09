import CaseDetails from "./CaseDetails";
import DesignedCase from "./DesignedCase";

export default function Page() {
    return (
        <div className="app-container py-12 grid grid-cols-12 gap-6 items-center">
            <div className="flex flex-col md:col-span-4">
                <DesignedCase />
            </div>
            <div className="md:col-span-8">
               <CaseDetails />
            </div>
        </div>
    );
}