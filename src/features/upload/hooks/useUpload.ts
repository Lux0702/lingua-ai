"use client";

import { useState } from "react";

export function useUpload() {
  const [file, setFile] = useState<File>();

  return {
    file,

    setFile,
  };
}
