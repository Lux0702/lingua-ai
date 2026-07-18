import fs from "node:fs";
import path from "node:path";

import type { Language, Level } from "./contracts";

interface BuildLessonPromptOptions {
  language: Language;
  level: Level;
  content: string;
}

const AGENT_DIR = path.join(process.cwd(), ".agent");

function readAgentFile(fileName: string): string {
  return fs.readFileSync(path.join(AGENT_DIR, fileName), "utf8");
}

function readExample(fileName: string): string {
  return fs.readFileSync(path.join(AGENT_DIR, "examples", fileName), "utf8");
}

const AGENT = readAgentFile("AGENT.md");
const AI_INSTRUCTIONS = readAgentFile("AI_INSTRUCTIONS.md");
const OUTPUT_RULES = readAgentFile("OUTPUT_RULES.md");
const JSON_SCHEMA = readAgentFile("JSON_SCHEMA.md");
const PROMPTS = readAgentFile("PROMPTS.md");

export function buildLessonPrompt({
  language,
  level,
  content,
}: BuildLessonPromptOptions): string {
  const EXAMPLE = readExample("lesson.example.json");

  return `
# AGENT

${AGENT}

------------------------------------------------

# AI INSTRUCTIONS

${AI_INSTRUCTIONS}

------------------------------------------------

# OUTPUT RULES

${OUTPUT_RULES}

------------------------------------------------

# JSON SCHEMA

${JSON_SCHEMA}

------------------------------------------------

# PROMPTS

${PROMPTS}

------------------------------------------------

# EXAMPLE

${EXAMPLE}

------------------------------------------------

# USER REQUEST

Task:
Generate Lesson

Language:
${language}

Level:
${level}

Learning Material:

${content}

------------------------------------------------

Analyze the uploaded learning material.

Identify every distinct lesson contained in the material.

Generate exactly one Lesson object for each identified lesson.

Return ONLY a valid JSON array.

Rules:

- If the material contains one lesson, return an array with exactly one element.
- If the material contains multiple lessons, return one Lesson object for each lesson.
- Preserve the original lesson order.
- Do not merge multiple lessons into one.
- Do not split one lesson into multiple lessons.
- Every array element must strictly follow the Lesson schema.
- Do not wrap the array inside another object.
`;
}
