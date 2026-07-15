import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary SDK credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. Handle JSON request (External image URL dragged and dropped)
    if (contentType.includes("application/json")) {
      const { url } = await request.json();
      if (!url) {
        return NextResponse.json({ error: "No URL provided" }, { status: 400 });
      }

      let uploadResult;

      if (url.startsWith("data:")) {
        // base64 data URL
        uploadResult = await cloudinary.uploader.upload(url, {
          folder: "casee-custom-covers",
          resource_type: "auto",
        });
      } else {
        // Regular web URL - fetch on server with custom browser headers to bypass CDN / bot protection blocks
        const imgResponse = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "Referer": new URL(url).origin,
          }
        });

        if (!imgResponse.ok) {
          throw new Error(`Failed to fetch remote image: ${imgResponse.statusText}`);
        }

        const arrayBuffer = await imgResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        uploadResult = (await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "casee-custom-covers",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        })) as any;
      }

      return NextResponse.json({
        imageUrl: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      });
    }

    // 2. Handle FormData request (Local file uploaded)
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file object to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer directly to Cloudinary
    const uploadResult = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "casee-custom-covers",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    })) as any;

    // Return Cloudinary secure URL with dimensions
    return NextResponse.json({
      imageUrl: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
