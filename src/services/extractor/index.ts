import { extractPdf } from "./pdf";
import { extractDocx } from "./docx";

export async function extractText(file: File) {
  switch (file.type) {
    case "application/pdf":
      return extractPdf(file);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractDocx(file);

    case "text/plain":
      return file.text();

    default:
      throw new Error(`Unsupported file type: ${file.type}`);
  }
}
