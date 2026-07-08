"use client";
import { LuImagePlus } from "react-icons/lu";
import Dropzone from "react-dropzone";

export default function Upload() {
  return (
    <section className="app-container py-6">
      <div className="flex flex-col bg-muted/50 h-full w-full rounded-xl p-6 py-22 gap-4 items-center justify-center ring-border ring-1">
        <Dropzone 
          accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles);
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
              <p className="text-muted-foreground text-xs">JPG, PNG, JPEG</p>
            </div>
          )}
        </Dropzone>
      </div>
    </section>
  );
}