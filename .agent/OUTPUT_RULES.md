# Output Rules

The response MUST satisfy the following rules.

## General

- Output JSON only.
- No Markdown.
- No HTML.
- No code fences.
- No comments.
- No additional explanations.
- No conversational text.

## JSON

- JSON must be valid.
- Follow JSON_SCHEMA.md exactly.
- Missing values must be null.
- Arrays must be empty instead of omitted.
- Strings must never be empty unless unknown.

## Language

- Preserve original language when possible.
- Do not translate proper nouns.
- Keep pinyin when available.

## Quality

- Do not hallucinate unsupported facts.
- Prioritize uploaded learning materials.
- Use general knowledge only when necessary.

Every response MUST satisfy:

✓ Valid JSON

✓ UTF-8

✓ No Markdown

✓ No HTML

✓ No explanation

✓ No code block

✓ No comments

✓ No trailing commas

✓ Keys must follow schema.

✓ Missing values must be null.

✓ Arrays must never be omitted.

✓ Unknown values must be null.