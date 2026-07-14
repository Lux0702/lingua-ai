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

Generate ONE lesson.

Follow the JSON schema exactly.

Use the example only as a structural reference.

Do not copy the example content.

Return ONLY valid JSON.
`;
}
