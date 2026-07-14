# Lesson Schema

Generate ONE lesson object that strictly follows the schema below.

Return valid JSON only.

Do not include markdown.

Do not include explanations.

Do not wrap the JSON inside another object.

--------------------------------

id

Type:
string

Required:
true

Example:

zh-acct-book1-lesson-001

--------------------------------

languageCode

Type:
string

Required:
true

Allowed values:

- zh
- en
- ja
- ko

--------------------------------

courseId

Type:
string

Required:
true

Example:

zh-acct-book1

--------------------------------

courseTitle

Type:
string

Required:
true

Example:

A Course in Contemporary Chinese Book 1

--------------------------------

lessonNumber

Type:
number

Required:
true

--------------------------------

title

Type:
string

Required:
true

--------------------------------

overview

Type:
string

Required:
true

--------------------------------

objectives

Type:
array<string>

Required:
true

--------------------------------

vocabulary

Type:
array<Vocabulary>

Required:
true

Vocabulary

id
string

word
string

pinyin
string

meaning
string

example
string

translation
string

--------------------------------

grammar

Type:
array<Grammar>

Required:
true

Grammar

id
string

title
string

explanation
string

example
string

translation
string

--------------------------------

dialogue

Type:
Dialogue

Required:
true

Dialogue

title
string

lines
array<DialogueLine>

DialogueLine

id
string

speaker
string

text
string

translation
string

--------------------------------

reading

Type:
Reading

Required:
true

Reading

title
string

paragraphs
array<ReadingParagraph>

ReadingParagraph

id
string

chinese
string

pinyin
string

translation
string

--------------------------------

exercises

Type:
array<Exercise>

Required:
true

Exercise

id
string

type

Allowed values:

- multiple_choice
- fill_blank

question
string

options
array<ExerciseOption>

answer
string

explanation
string

ExerciseOption

id
string

text
string

--------------------------------

# IMPORTANT

Return ONLY ONE valid JSON object.

Do NOT wrap the lesson inside:

{
  "lesson": {}
}

Do NOT create a "content" object.

All lesson properties must exist at the root level.

Never rename any property.

Every required field must exist.

If information is unavailable:

- string -> ""
- array -> []
- object -> empty object matching the schema

For `multiple_choice` exercises:

- options is required.
- Each option must be an object with:
  - id
  - text

For `fill_blank` exercises:

- options must be [].

The returned JSON must be directly parsable by JSON.parse().