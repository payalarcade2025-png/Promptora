import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

const ImageDropzone = ({ image, onImageChange }: ImageDropzoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onImageChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    onImageChange(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        Reference Image <span className="text-muted-foreground/50">(optional)</span>
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden",
          isDragOver
            ? "border-primary bg-primary/5 glow-primary"
            : "border-border hover:border-muted-foreground/50",
          preview ? "p-0" : "p-8"
        )}
      >
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={clearImage}
                className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-4 cursor-pointer">
            <div
              className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
                isDragOver
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isDragOver ? (
                <ImageIcon className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drag & drop an image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click to browse
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
