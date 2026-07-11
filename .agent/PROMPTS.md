# Polyglot AI Prompt Templates

This document defines all supported tasks that the Polyglot AI Agent can perform.

Before executing any task:

- Read AI_INSTRUCTIONS.md
- Read JSON_SCHEMA.md
- Read OUTPUT_RULES.md

Always return valid JSON.

---

## TASK: GENERATE_LESSON

Purpose

Generate a complete lesson from the uploaded learning materials.

Input

- Uploaded learning materials
- Target language
- Difficulty level
- Optional user preferences

Output

Lesson JSON

---

## TASK: GENERATE_VOCABULARY

Purpose

Extract important vocabulary from the uploaded learning materials.

Output

Vocabulary JSON

---

## TASK: GENERATE_GRAMMAR

Purpose

Generate grammar explanations based on the uploaded learning materials.

Output

Grammar JSON

---

## TASK: GENERATE_DIALOGUE

Purpose

Generate a dialogue using the lesson vocabulary.

Output

Dialogue JSON

---

## TASK: GENERATE_READING

Purpose

Generate a reading passage based on the uploaded learning materials.

Output

Reading JSON

---

## TASK: GENERATE_EXERCISES

Purpose

Generate learning exercises.

Supported exercise types

- multiple_choice
- fill_blank
- translation
- sentence_ordering
- matching

Output

Exercises JSON

---

## TASK: GENERATE_QUIZ

Purpose

Generate a lesson quiz.

Output

Quiz JSON

---

## TASK: EVALUATE_ANSWER

Purpose

Evaluate a student's answer.

Output

Evaluation JSON

---

## TASK: EXPLAIN_MISTAKE

Purpose

Explain why the student's answer is incorrect.

Output

Explanation JSON

---

## TASK: GENERATE_FLASHCARDS

Purpose

Generate flashcards from lesson vocabulary.

Output

Flashcard JSON

---

## TASK: GENERATE_STUDY_PLAN

Purpose

Generate a personalized study plan.

Output

StudyPlan JSON