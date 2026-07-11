# Examples

This file contains examples of expected AI outputs.

Always follow the JSON schema.

---

# Example 1 - Generate Lesson

## User Request

Generate a lesson from the uploaded material.

## Expected Output

```json
{
  "lesson": {
    "id": "lesson-1",
    "title": "Greetings",
    "language": "Chinese",
    "course": "A Course in Contemporary Chinese",
    "module": "Module 1",
    "content": {
      "overview": "Learn basic greetings in Chinese.",
      "objectives": [
        "Say hello",
        "Introduce yourself"
      ],
      "vocabulary": [
        {
          "word": "你好",
          "pinyin": "nǐ hǎo",
          "meaning": "Hello"
        }
      ],
      "grammar": [],
      "dialogue": {},
      "reading": {},
      "exercises": []
    }
  }
}
```

---

# Example 2 - Generate Quiz

## User Request

Generate a quiz from Lesson 1.

## Expected Output

```json
{
  "quiz": [
    {
      "type": "multiple_choice",
      "question": "What does 你好 mean?",
      "options": [
        "Hello",
        "Goodbye",
        "Thank you",
        "Sorry"
      ],
      "answer": "Hello",
      "explanation": "你好 is the standard greeting."
    }
  ]
}
```

---

# Example 3 - Evaluate Answer

## User Request

Evaluate the student's answer.

## Expected Output

```json
{
  "correct": true,
  "score": 100,
  "feedback": "Correct answer.",
  "explanation": "你好 means Hello."
}
```