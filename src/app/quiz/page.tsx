import { Suspense } from "react";
import { QuizGeneratorPage } from "./QuizGenerator";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizGeneratorPage />
    </Suspense>
  );
}
