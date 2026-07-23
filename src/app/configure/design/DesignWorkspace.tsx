"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import DesignConfig from "./DesignConfig";
import DesignFeatures from "./DesignFeatures";
import { useDesignStore } from "@/store/useDesignStore";
import { saveDesignConfigAction } from "@/actions/design";

type DesignWorkspaceProps = {
  configId: string;
  imageUrl: string;
  width: number;
  height: number;
  initialConfig: any | null;
};

export default function DesignWorkspace({
  configId,
  imageUrl,
  width,
  height,
  initialConfig,
}: DesignWorkspaceProps) {
  const router = useRouter();

  // Synchronously hydrate store before first paint to prevent model/color flash
  const initializedRef = useRef(false);
  if (!initializedRef.current) {
    if (initialConfig) {
      useDesignStore.getState().loadSavedConfig(initialConfig);
    } else {
      useDesignStore
        .getState()
        .initFromParams({ configId, imageUrl, width, height });
    }
    initializedRef.current = true;
  }

  // ── Save handler ──
  const isSaving = useDesignStore((s) => s.isSaving);
  const setIsSaving = useDesignStore((s) => s.setIsSaving);
  const clearPersistedState = useDesignStore((s) => s.clearPersistedState);

  const handleContinue = async () => {
    const {
      images,
      selectedColor,
      selectedModel,
      selectedMaterial,
      selectedFinish,
    } = useDesignStore.getState();

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
        images,
      });

      if (result.success && result.configId) {
        clearPersistedState();
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 app-container">
      <DesignConfig />
      <DesignFeatures onSave={handleContinue} isSaving={isSaving} />
    </div>
  );
}
