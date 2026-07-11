interface FilePreviewProps {
  file?: File;
}

export function FilePreview({ file }: FilePreviewProps) {
  if (!file) return null;

  return (
    <div className="rounded-lg border p-4 mt-4">
      <p className="font-medium">{file.name}</p>

      <p className="text-sm text-muted-foreground">
        {(file.size / 1024).toFixed(2)} KB
      </p>
    </div>
  );
}
