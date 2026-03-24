import { useState, useRef } from "react";
import type { DragEvent } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Spinner } from "@/shared/components/Spinner";
import { cn } from "@/lib/utils";

type Props = {
  uid: string;
  onUploaded: (url: string) => void;
};

export const ImageUploader = ({ uid, onUploaded }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Create local preview immediately for better UX
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      const signResponse = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: `listings/${uid}` }),
      });

      if (!signResponse.ok) throw new Error("Unable to sign upload.");

      const { timestamp, folder, signature, cloudName, apiKey } = await signResponse.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadResponse.ok) throw new Error("Upload failed.");

      const { secure_url } = await uploadResponse.json();
      setPreviewUrl(secure_url);
      onUploaded(secure_url);
    } catch {
      setError("Image upload failed. Please try again.");
      setPreviewUrl(""); // Reset if cloud upload fails
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl("");
    onUploaded("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-muted">Product Image</label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative group cursor-pointer flex flex-col items-center justify-center min-h-[180px] rounded-[20px] border-2 border-dashed transition-all duration-300",
          isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-surface",
          previewUrl && !loading ? "border-solid border-primary/20 bg-white shadow-sm" : "hover:border-primary/50 hover:bg-white"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-3">
             <Spinner />
             <p className="text-sm font-bold text-primary animate-pulse">Uploading...</p>
          </div>
        ) : previewUrl ? (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-elevated">
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            </div>
            <button 
              onClick={reset}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors border border-red-100 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-4 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
               <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Image Ready</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
              <UploadCloud className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-black text-foreground tracking-tight">Drop your image here</h4>
            <p className="mt-1 text-xs font-medium text-muted">or click to browse from device</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
               <ImageIcon className="h-3 w-3" />
               PNG, JPG up to 10MB
            </div>
          </div>
        )}

        {error && (
          <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-2 text-xs font-bold text-red-600 justify-center">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </div>
        )}
      </div>
      {/* Spacer for error msg absolute pos */}
      {error && <div className="h-6" />}
    </div>
  );
};
