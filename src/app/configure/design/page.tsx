import DesignConfig from "./DesignConfig";
import DesignFeatures from "./DesignFeatures";

export default function Page() {
    return (
        <div className="grid grid-cols-3 gap-6 py-6 app-container">
           <DesignConfig />
           <DesignFeatures />
        </div>
    );
}