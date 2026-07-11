import fs from "node:fs";
import path from "node:path";

import type { Language, Level } from "./contracts";
interface BuildLessonPromptOptions {
  language: Language;
  level: Level;
}
function readAgentFile(fileName: string): string {
  return fs.readFileSync(path.join(process.cwd(), ".agent", fileName), "utf8");
}

const AGENT = readAgentFile("AGENT.md");

const AI_INSTRUCTIONS = readAgentFile("AI_INSTRUCTIONS.md");

const PROMPTS = readAgentFile("PROMPTS.md");

const OUTPUT_RULES = readAgentFile("OUTPUT_RULES.md");

const JSON_SCHEMA = readAgentFile("JSON_SCHEMA.md");

const EXAMPLES = readAgentFile("EXAMPLES.md");

export function buildLessonPrompt({
  language,
  level,
}: BuildLessonPromptOptions): string {
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

# EXAMPLES

${EXAMPLES}

------------------------------------------------

# USER REQUEST



Language:
${language}

Level:
${level}

The user has uploaded a learning document.

Analyze the uploaded document.

Return JSON only.
`;
}
