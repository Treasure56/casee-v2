"use server";

import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import { SaveConfigParams } from "@/types/designConfig";

export async function saveDesignConfigAction(params: SaveConfigParams) {
  await dbConnect();

  try {
    let config;
    if (
      params.configId &&
      params.configId !== "undefined" &&
      params.configId !== "null" &&
      params.configId.length > 5
    ) {
      config = await Configuration.findByIdAndUpdate(
        params.configId,
        {
          color: params.color,
          phoneModel: params.model,
          material: params.material,
          finish: params.finish,
          x: params.x,
          y: params.y,
          renderedWidth: params.renderedWidth,
          renderedHeight: params.renderedHeight,
        },
        { new: true }
      );
    } else {
      config = await Configuration.create({
        imageUrl: params.imageUrl,
        width: params.width,
        height: params.height,
        color: params.color,
        phoneModel: params.model,
        material: params.material,
        finish: params.finish,
        x: params.x,
        y: params.y,
        renderedWidth: params.renderedWidth,
        renderedHeight: params.renderedHeight,
      });
    }

    if (!config) {
      return {
        error: "Configuration not found",
      };
    }

    return {
      success: "Configuration saved successfully",
      configId: config._id.toString(),
    };
  } catch (error) {
    console.error("Save config error:", error);
    return {
      error: "Failed to save design configuration. Please try again.",
    };
  }
}
