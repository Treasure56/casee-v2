"use server";

import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import { SaveConfigParams } from "@/types/designConfig";

export async function saveDesignConfigAction(params: SaveConfigParams) {
  await dbConnect();

  try {
    let config;
    
    // Legacy fallback coordinates
    const firstImg = params.images[0];
    const legacyCoords = {
      x: firstImg?.x || 0,
      y: firstImg?.y || 0,
      renderedWidth: firstImg?.renderedWidth || 0,
      renderedHeight: firstImg?.renderedHeight || 0,
    };

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
          ...legacyCoords,
          images: params.images,
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
        ...legacyCoords,
        images: params.images,
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

export async function getDesignConfigAction(configId: string) {
  await dbConnect();
  try {
    const config = await Configuration.findById(configId).lean();
    if (!config) {
      return { error: "Configuration not found" };
    }

    return {
      success: true,
      config: {
        id: config._id.toString(),
        imageUrl: config.imageUrl,
        width: config.width,
        height: config.height,
        color: config.color,
        model: config.phoneModel,
        material: config.material,
        finish: config.finish,
        images: config.images ? JSON.parse(JSON.stringify(config.images)) : [],
      },
    };
  } catch (error) {
    console.error("Get design config error:", error);
    return { error: "Failed to load configuration from database." };
  }
}
