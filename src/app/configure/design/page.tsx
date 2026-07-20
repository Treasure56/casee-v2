"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import DesignConfig from "./DesignConfig";
import DesignFeatures from "./DesignFeatures";
import { useDesignStore } from "@/store/useDesignStore";
import { saveDesignConfigAction, getDesignConfigAction } from "@/actions/design";

function DesignWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const imageUrl = searchParams.get("imageUrl") || "";
  const width = parseInt(searchParams.get("width") || "300");
  const height = parseInt(searchParams.get("height") || "600");
  const configId = searchParams.get("id") || "";

  // Seed the store with URL params on mount
  const initFromParams = useDesignStore((s) => s.initFromParams);
  const loadSavedConfig = useDesignStore((s) => s.loadSavedConfig);

  useEffect(() => {
    if (configId) {
      const restoreConfig = async () => {
        try {
          const res = await getDesignConfigAction(configId);
          if (res.success && res.config) {
            loadSavedConfig(res.config);
          } else {
            initFromParams({ configId, imageUrl, width, height });
          }
        } catch {
          initFromParams({ configId, imageUrl, width, height });
        }
      };
      restoreConfig();
    } else {
      initFromParams({ configId, imageUrl, width, height });
    }
  }, [configId, imageUrl, width, height, initFromParams, loadSavedConfig]);

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
    <div className="grid grid-cols-3 gap-6 py-6 app-container">
      <DesignConfig />
      <DesignFeatures onSave={handleContinue} isSaving={isSaving} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="py-24 text-center">Loading designer...</div>}
    >
      <DesignWorkspace />
    </Suspense>
  );
}
