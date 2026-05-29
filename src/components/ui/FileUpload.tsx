"use client";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { cn } from "@/lib/cn";

interface FileUploadProps {
  id: string;
  name: string;
  required?: boolean;
  hint?: string;
}

export function FileUpload({ id, name, required, hint = "PDF, DOC, DOCX — max 10MB" }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name ?? null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
      setFileName(file.name);
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
        dragging ? "border-amber bg-amber/5" : "border-border hover:border-amber"
      )}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        id={id}
        name={name}
        accept=".pdf,.doc,.docx"
        required={required}
        onChange={handleChange}
        className="sr-only"
      />
      <svg className="mx-auto mb-2 text-text-muted" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <p className="text-sm text-text-secondary">
        {fileName ? (
          <span className="font-medium text-text-primary">{fileName}</span>
        ) : (
          <><span className="text-amber-text underline underline-offset-2">Click to upload</span> or drag and drop</>
        )}
      </p>
      <p className="text-xs text-text-muted mt-1">{hint}</p>
    </div>
  );
}
