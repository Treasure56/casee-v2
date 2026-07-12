"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { LuImagePlus, LuTriangleAlert } from "react-icons/lu";

export default function Upload() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // SVG Minimal Circular Spinner calculations (Radius = 20)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (uploadProgress / 100) * circumference;

  const startProgressSimulation = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    return interval;
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setErrorMsg(null);
    const progressInterval = startProgressSimulation();

    // Validate size (25MB)
    if (file.size > 25 * 1024 * 1024) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setErrorMsg("File is too large. Please select an image smaller than 25MB.");
      return;
    }

    // Measure dimensions & upload
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const width = img.width;
      const height = img.height;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        clearInterval(progressInterval);
        setUploadProgress(100);

        // Redirect to design page
        router.push(
          `/configure/design?imageUrl=${encodeURIComponent(data.imageUrl)}&width=${width}&height=${height}`
        );
      } catch (err) {
        clearInterval(progressInterval);
        setIsUploading(false);
        setErrorMsg("Failed to upload image. Please try again.");
      }
    };

    img.onerror = () => {
      clearInterval(progressInterval);
      setIsUploading(false);
      setErrorMsg("Invalid image file. Please upload a valid JPG, PNG, or JPEG.");
    };
  };

  return (
    <section className="app-container py-6">
      <div className="flex flex-col bg-muted/50 h-full w-full rounded-xl p-6 py-22 gap-4 items-center justify-center ring-border ring-1">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Sleek and Minimal Progress Ring (No Text) */}
            <div className="relative w-16 h-16 flex items-center justify-center select-none">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background circle track */}
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="stroke-muted-foreground/10 fill-none"
                  strokeWidth="2.5"
                />
                {/* Thin glowing progress line */}
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="stroke-brand-secondary fill-none transition-all duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ) : (
          <Dropzone
            accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                handleUpload(acceptedFiles[0]);
              }
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center border-border rounded-lg p-8 cursor-pointer transition-colors ${
                  isDragActive ? "bg-accent" : ""
                }`}
              >
                <input {...getInputProps()} />
                <LuImagePlus className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-sm">
                  Click to upload your image or drag and drop
                </p>
                <p className="text-muted-foreground text-xs">
                  JPG, PNG, JPEG, WEBP (Max 25MB)
                </p>
              </div>
            )}
          </Dropzone>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-xs font-semibold px-4 py-2.5 rounded-lg border border-destructive/20 mt-4 animate-in fade-in duration-200">
            <LuTriangleAlert className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </section>
  );
}
