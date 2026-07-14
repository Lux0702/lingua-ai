"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {UploadPage, ImportPage} from "@/features/ai-tutor";


export default function AITutorPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Tutor</h1>

        <p className="text-muted-foreground">
          Generate lessons from learning materials or import lesson JSON.
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Generate Lesson</TabsTrigger>

          <TabsTrigger value="import">Import JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <UploadPage />
        </TabsContent>

        <TabsContent value="import">
          <ImportPage />
        </TabsContent>
      </Tabs>
    </main>
  );
}
