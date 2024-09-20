"use client";

import { useState, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { UploadCloud, File } from "lucide-react";

export function CoolFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="mx-auto mt-2 w-full">
      <div
        className="p-4 text-center rounded-lg border-2 border-dashed transition-colors duration-200 border-muted hover:border-primary"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="mb-4">
          <Avatar className="mx-auto size-16">
            {preview ? (
              <AvatarImage src={preview} alt="Preview" />
            ) : (
              <AvatarFallback>
                {file ? (
                  <File className="text-gray-400 size-8" />
                ) : (
                  <UploadCloud className="text-gray-400 size-8" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? "Change file" : "Select file"}
        </Button>
        {file && (
          <div className="mt-2">
            <p className="text-sm truncate text-muted-foreground">
              {file.name}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="mt-1"
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      {!file && (
        <p className="mt-2 text-sm text-center text-muted-foreground">
          Drag & drop a file here, or click to select
        </p>
      )}
    </div>
  );
}
