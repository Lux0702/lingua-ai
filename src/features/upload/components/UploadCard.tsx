"use client";

import { ChangeEvent, useState } from "react";

import type { Language, Level } from "@/services/ai/contracts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export interface UploadRequest {
  file: File;
  language: Language;
  level: Level;
}

interface UploadCardProps {
  loading?: boolean;

  onUpload(request: UploadRequest): void | Promise<void>;
}

export function UploadCard({ loading = false, onUpload }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);

  const [language, setLanguage] = useState<Language>("zh");

  const [level, setLevel] = useState<Level>("beginner");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  }

  function handleSubmit() {
    if (!file) return;

    onUpload({
      file,
      language,
      level,
    });
  }

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">Upload Learning Material</h2>

        <p className="text-sm text-muted-foreground">
          Upload a PDF, DOCX or TXT file to generate a lesson with AI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>

          <Select
            value={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="zh">Chinese</SelectItem>

              <SelectItem value="en">English</SelectItem>

              <SelectItem value="ja">Japanese</SelectItem>

              <SelectItem value="ko">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Level</label>

          <Select
            value={level}
            onValueChange={(value) => setLevel(value as Level)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>

              <SelectItem value="intermediate">Intermediate</SelectItem>

              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-2 p-4 rounded-xl hover:scale-105 duration-300 transition-transform">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="cursor-pointer "
        />

        {file && (
          <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
        )}
      </div>

      <Button disabled={!file || loading} onClick={handleSubmit}>
        {loading ? "Generating..." : "Generate Lesson"}
      </Button>
    </div>
  );
}
