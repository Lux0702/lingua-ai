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
- Every property defined in the schema must exist.
- Arrays must be empty instead of omitted.
- Objects must never be omitted.
- Strings must never be null.
- If a string value is unknown, use "".
- If an array value is unknown, use [].
- Do not add extra properties that are not defined in the schema.

## Language

- Preserve the original language whenever possible.
- Do not translate proper nouns.
- `text` must always be written in the target language.
- `pronunciation` must contain the standard pronunciation for the target language.
  - Chinese → Pinyin with tone marks.
  - English → IPA.
  - Japanese → Kana reading.
  - Korean → Standard pronunciation.
- `romanization` should only be provided for languages that do not use the Latin alphabet.
- For languages that already use the Latin alphabet (English, French, Spanish, German, etc.), set `romanization` to "".

## Quality

- Do not hallucinate unsupported facts.
- Prioritize uploaded learning materials.
- Use general knowledge only when necessary.
- Keep all examples natural and appropriate for the lesson level.
- Ensure translations are accurate and contextually correct.

Every response MUST satisfy:

✓ Valid JSON

✓ UTF-8

✓ No Markdown

✓ No HTML

✓ No explanation

✓ No code block

✓ No comments

✓ No trailing commas

✓ Keys must follow JSON_SCHEMA.md exactly.

✓ Every required property must exist.

✓ Arrays must never be omitted.

✓ Objects must never be omitted.

✓ Unknown strings must be "".

✓ Unknown arrays must be [].