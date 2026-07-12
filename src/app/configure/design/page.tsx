"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import DesignConfig from "./DesignConfig";
import DesignFeatures from "./DesignFeatures";
import { colors, models, material, finishes } from "@/validators/optionValidators";
import { saveDesignConfigAction } from "@/actions/design";

function DesignWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const imageUrl = searchParams.get("imageUrl") || "/images/user1.jpg";
  const width = parseInt(searchParams.get("width") || "300");
  const height = parseInt(searchParams.get("height") || "600");
  const configId = searchParams.get("id") || "";

  // 1. Shared Options State
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]>(
    colors[0]
  );
  const [selectedModel, setSelectedModel] = useState<(typeof models.options)[number]>(
    models.options[0]
  );
  const [selectedMaterial, setSelectedMaterial] = useState<
    (typeof material.options)[number]
  >(material.options[0]);
  const [selectedFinish, setSelectedFinish] = useState<
    (typeof finishes.options)[number]
  >(finishes.options[0]);

  // 2. Shared Dimensions and Coordinates
  const [renderedDimension, setRenderedDimension] = useState({
    width: width / 4,
    height: height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 40,
    y: 120,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      const result = await saveDesignConfigAction({
        configId,
        imageUrl,
        width,
        height,
        color: selectedColor.value,
        model: selectedModel.value,
        material: selectedMaterial.value,
        finish: selectedFinish.value,
        x: renderedPosition.x,
        y: renderedPosition.y,
        renderedWidth: renderedDimension.width,
        renderedHeight: renderedDimension.height,
      });

      if (result.success && result.configId) {
        router.push(`/configure/preview?id=${result.configId}`);
      } else {
        alert(result.error || "Failed to save configuration");
        setIsSaving(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving your design.");
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 py-6 app-container">
      <DesignConfig
        imageUrl={imageUrl}
        imageDimensions={{ width, height }}
        color={selectedColor}
        renderedDimension={renderedDimension}
        setRenderedDimension={setRenderedDimension}
        renderedPosition={renderedPosition}
        setRenderedPosition={setRenderedPosition}
      />
      <DesignFeatures
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        selectedFinish={selectedFinish}
        setSelectedFinish={setSelectedFinish}
        onSave={handleContinue}
        isSaving={isSaving}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading designer...</div>}>
      <DesignWorkspace />
    </Suspense>
  );
}
