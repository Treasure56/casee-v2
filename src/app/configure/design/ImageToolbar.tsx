"use client";

import { ImageLayer } from "@/types/designConfig";
import {
  LuFlipHorizontal2,
  LuFlipVertical2,
  LuChevronUp,
  LuChevronDown,
  LuUndo2,
  LuTrash2,
  LuSparkles,
} from "react-icons/lu";

type ImageToolbarProps = {
  layer: ImageLayer;
  /** Total number of image layers (used to show/hide layer order buttons) */
  layerCount: number;
  /** Index of this layer in the images array (0 = bottom) */
  layerIndex: number;
  onUpdate: (updates: Partial<ImageLayer>) => void;
  onReorder: (direction: "up" | "down") => void;
  onDelete: () => void;
};

/**
 * Floating toolbar that appears when an image layer is selected.
 * Provides rotation, flip, opacity, and layer ordering controls.
 */
export default function ImageToolbar({
  layer,
  layerCount,
  layerIndex,
  onUpdate,
  onReorder,
  onDelete,
}: ImageToolbarProps) {
  const hasTransforms =
    layer.rotation !== 0 ||
    layer.flipH ||
    layer.flipV ||
    layer.opacity !== 1;

  const handleReset = () => {
    onUpdate({ rotation: 0, flipH: false, flipV: false, opacity: 1 });
  };

  return (
    <div
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg
        bg-zinc-900/95 dark:bg-zinc-800/95 backdrop-blur-sm border border-zinc-700/50 shadow-xl
        pointer-events-auto select-none"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* ── Flip Controls ── */}
      <ToolbarButton
        title="Flip horizontal"
        active={layer.flipH}
        onClick={() => onUpdate({ flipH: !layer.flipH })}
      >
        <LuFlipHorizontal2 className="size-3.5" />
      </ToolbarButton>

      <ToolbarButton
        title="Flip vertical"
        active={layer.flipV}
        onClick={() => onUpdate({ flipV: !layer.flipV })}
      >
        <LuFlipVertical2 className="size-3.5" />
      </ToolbarButton>

      {/* ── Remove BG Control ── */}
      <ToolbarButton
        title="Remove white background"
        active={layer.removeBg}
        onClick={() => onUpdate({ removeBg: !layer.removeBg })}
      >
        <LuSparkles className="size-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* ── Opacity Slider ── */}
      <div className="flex items-center gap-1.5 px-1" title="Opacity">
        <span className="text-[10px] text-zinc-400 font-medium w-7 text-right tabular-nums">
          {Math.round(layer.opacity * 100)}%
        </span>
        <input
          type="range"
          min={20}
          max={100}
          value={Math.round(layer.opacity * 100)}
          onChange={(e) => onUpdate({ opacity: Number(e.target.value) / 100 })}
          className="w-16 h-1 accent-brand-primary bg-zinc-600 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* ── Layer Order (only when multiple layers) ── */}
      {layerCount > 1 && (
        <>
          <ToolbarDivider />
          <ToolbarButton
            title="Bring forward"
            disabled={layerIndex >= layerCount - 1}
            onClick={() => onReorder("up")}
          >
            <LuChevronUp className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            title="Send backward"
            disabled={layerIndex <= 0}
            onClick={() => onReorder("down")}
          >
            <LuChevronDown className="size-3.5" />
          </ToolbarButton>
        </>
      )}

      {/* ── Reset Button (only shown when transforms are applied) ── */}
      {hasTransforms && (
        <>
          <ToolbarDivider />
          <ToolbarButton title="Reset all transforms" onClick={handleReset}>
            <LuUndo2 className="size-3.5" />
          </ToolbarButton>
        </>
      )}

      {/* ── Delete Button ── */}
      <ToolbarDivider />
      <button
        title="Remove image"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 rounded-md transition-colors cursor-pointer text-red-400 hover:text-white hover:bg-red-500/80"
      >
        <LuTrash2 className="size-3.5" />
      </button>
    </div>
  );
}

/* ── Shared sub-components ── */

function ToolbarButton({
  children,
  title,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`p-1.5 rounded-md transition-colors cursor-pointer
        ${
          disabled
            ? "text-zinc-600 cursor-not-allowed"
            : active
              ? "text-brand-primary bg-brand-primary/15"
              : "text-zinc-300 hover:text-white hover:bg-zinc-700/60"
        }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-zinc-600/50 mx-0.5" />;
}
