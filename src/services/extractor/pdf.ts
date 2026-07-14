import { extractText } from "unpdf";

export async function extractPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const result = await extractText(new Uint8Array(arrayBuffer));

  return result.text;
}
