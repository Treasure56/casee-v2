import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  colors,
  models,
  material,
  finishes,
} from "@/validators/optionValidators";
import { ImageLayer } from "@/types/designConfig";

// ─── Derived Types ───────────────────────────────────────────────────────────

type Color = (typeof colors)[number];
type Model = (typeof models.options)[number];
type Material = (typeof material.options)[number];
type Finish = (typeof finishes.options)[number];

// ─── State Shape ─────────────────────────────────────────────────────────────

interface DesignState {
  // Canvas image layers
  images: ImageLayer[];

  // Sidebar option selections
  selectedColor: Color;
  selectedModel: Model;
  selectedMaterial: Material;
  selectedFinish: Finish;

  // Async flags
  isSaving: boolean;

  // Params from URL (not persisted — re‑seeded on mount)
  configId: string;
  baseImageUrl: string;
  baseWidth: number;
  baseHeight: number;
}

// ─── Action Signatures ───────────────────────────────────────────────────────

interface DesignActions {
  /**
   * Called once on mount from page.tsx to seed URL‑dependent params.
   * Only creates the default base layer if images are empty
   * (i.e., nothing was restored from localStorage).
   */
  initFromParams: (params: {
    configId: string;
    imageUrl: string;
    width: number;
    height: number;
  }) => void;

  // ── Image Layer Actions ──

  setImages: (images: ImageLayer[]) => void;

  addLayer: (layer: ImageLayer) => void;

  updateLayer: (id: string, updates: Partial<ImageLayer>) => void;

  removeLayer: (id: string) => void;

  /**
   * Swap a layer's position.
   * "up" = toward the end of the array (renders on top).
   * "down" = toward the start of the array (renders below).
   */
  reorderLayer: (id: string, direction: "up" | "down") => void;

  /**
   * Reset all transform properties on a specific layer
   * back to their initial defaults.
   */
  resetLayerTransforms: (id: string) => void;

  // ── Sidebar Option Actions ──

  setSelectedColor: (color: Color) => void;
  setSelectedModel: (model: Model) => void;
  setSelectedMaterial: (mtl: Material) => void;
  setSelectedFinish: (finish: Finish) => void;

  // ── Async Flags ──

  setIsSaving: (saving: boolean) => void;

  // ── Cleanup ──

  /** Remove persisted state from localStorage (called after successful DB save). */
  clearPersistedState: () => void;

  /** Seed store with saved configuration from MongoDB. */
  loadSavedConfig: (config: {
    id: string;
    imageUrl: string;
    width: number;
    height: number;
    color?: string;
    model?: string;
    material?: string;
    finish?: string;
    images?: ImageLayer[];
  }) => void;
}

// ─── Default Values ──────────────────────────────────────────────────────────

const DEFAULT_COLOR = colors[0];
const DEFAULT_MODEL = models.options[0];
const DEFAULT_MATERIAL = material.options[0];
const DEFAULT_FINISH = finishes.options[0];

// ─── Store ───────────────────────────────────────────────────────────────────

export const useDesignStore = create<DesignState & DesignActions>()(
  persist(
    (set, get) => ({
      // ── Initial State ──

      images: [],
      selectedColor: DEFAULT_COLOR,
      selectedModel: DEFAULT_MODEL,
      selectedMaterial: DEFAULT_MATERIAL,
      selectedFinish: DEFAULT_FINISH,
      isSaving: false,
      configId: "",
      baseImageUrl: "",
      baseWidth: 300,
      baseHeight: 600,

      // ── Init ──

      initFromParams: ({ configId, imageUrl, width, height }) => {
        const state = get();

        // Always update URL-dependent params (they are not persisted)
        set({
          configId,
          baseImageUrl: imageUrl,
          baseWidth: width,
          baseHeight: height,
        });

        // Only seed the default base layer if store has no images
        // (this means nothing was restored from localStorage)
        if (state.images.length === 0) {
          set({
            images: [
              {
                id: "base",
                url: imageUrl,
                width,
                height,
                x: Math.max(10, Math.round((240 - width / 4) / 2)),
                y: Math.max(10, Math.round((490 - height / 4) / 2)),
                renderedWidth: width / 4,
                renderedHeight: height / 4,
                rotation: 0,
                flipH: false,
                flipV: false,
                opacity: 1,
                removeBg: false,
              },
            ],
          });
        }
      },

      // ── Image Layer Actions ──

      setImages: (images) => set({ images }),

      addLayer: (layer) =>
        set((state) => ({ images: [...state.images, layer] })),

      updateLayer: (id, updates) =>
        set((state) => ({
          images: state.images.map((img) =>
            img.id === id ? { ...img, ...updates } : img,
          ),
        })),

      removeLayer: (id) =>
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        })),

      reorderLayer: (id, direction) =>
        set((state) => {
          const index = state.images.findIndex((img) => img.id === id);
          if (index === -1) return state;

          const swapIndex = direction === "up" ? index + 1 : index - 1;
          if (swapIndex < 0 || swapIndex >= state.images.length) return state;

          const next = [...state.images];
          [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
          return { images: next };
        }),

      resetLayerTransforms: (id) =>
        set((state) => ({
          images: state.images.map((img) =>
            img.id === id
              ? {
                  ...img,
                  x: Math.max(10, Math.round((240 - img.width / 4) / 2)),
                  y: Math.max(10, Math.round((490 - img.height / 4) / 2)),
                  renderedWidth: img.width / 4,
                  renderedHeight: img.height / 4,
                  rotation: 0,
                  flipH: false,
                  flipV: false,
                  opacity: 1,
                  removeBg: false,
                }
              : img,
          ),
        })),

      // ── Sidebar Option Actions ──

      setSelectedColor: (color) => set({ selectedColor: color }),
      setSelectedModel: (model) => set({ selectedModel: model }),
      setSelectedMaterial: (mtl) => set({ selectedMaterial: mtl }),
      setSelectedFinish: (finish) => set({ selectedFinish: finish }),

      // ── Async Flags ──

      setIsSaving: (saving) => set({ isSaving: saving }),

      // ── Load configuration from database ──

      loadSavedConfig: (config) => {
        const matchingColor = colors.find((c) => c.value === config.color) || colors[0];
        const matchingModel = models.options.find((m) => m.value === config.model) || models.options[0];
        const matchingMaterial = material.options.find((m) => m.value === config.material) || material.options[0];
        const matchingFinish = finishes.options.find((f) => f.value === config.finish) || finishes.options[0];

        set({
          configId: config.id,
          images: config.images || [],
          selectedColor: matchingColor,
          selectedModel: matchingModel,
          selectedMaterial: matchingMaterial,
          selectedFinish: matchingFinish,
          baseImageUrl: config.imageUrl,
          baseWidth: config.width,
          baseHeight: config.height,
        });
      },

      // ── Cleanup ──

      clearPersistedState: () => {
        const { configId } = get();
        const key = `casee-design-${configId || "draft"}`;
        try {
          localStorage.removeItem(key);
        } catch {
          // silently ignore
        }
        // Reset store to defaults
        set({
          images: [],
          selectedColor: DEFAULT_COLOR,
          selectedModel: DEFAULT_MODEL,
          selectedMaterial: DEFAULT_MATERIAL,
          selectedFinish: DEFAULT_FINISH,
          isSaving: false,
        });
      },
    }),
    {
      // ── Persist Configuration ──

      name: "casee-design-draft", // Default key — dynamically overridden below
      storage: createJSONStorage(() => localStorage),

      /**
       * Only persist the serializable design data.
       * Exclude transient flags (isSaving) and URL‑derived params
       * (configId, baseImageUrl, etc.) since they are re‑seeded on mount.
       */
      partialize: (state) => ({
        images: state.images,
        selectedColor: state.selectedColor,
        selectedModel: state.selectedModel,
        selectedMaterial: state.selectedMaterial,
        selectedFinish: state.selectedFinish,
      }),
    },
  ),
);
