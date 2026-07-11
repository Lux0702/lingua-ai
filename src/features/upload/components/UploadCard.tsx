"use client";

import { ChangeEvent } from "react";

interface UploadCardProps {
  onUpload(file: File): void;
}

export function UploadCard({ onUpload }: UploadCardProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    onUpload(file);
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">Upload Learning Material</h2>

      <input type="file" accept=".pdf,.txt,.docx" onChange={handleChange} />
    </div>
  );
}
