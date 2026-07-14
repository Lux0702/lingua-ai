# Examples

This file contains examples of expected AI outputs.

Always follow the JSON schema.

---

# Example 1 - Generate Lesson

## User Request

Generate a lesson from the uploaded material.

## Expected Output

```json
[
    {
        "id": "zh-acct-book1-lesson-001",
        "languageCode": "zh",
        "courseId": "zh-acct-book1",
        "courseTitle": "A Course in Contemporary Chinese Book 1",
        "lessonNumber": 1,
        "title": "Greetings",
        "overview": "Learn how to greet people and introduce yourself in Mandarin Chinese.",
        "objectives": [
            "Say hello",
            "Introduce yourself",
            "Ask someone's name"
        ],
        "vocabulary": [
            {
                "id": "v1",
                "word": "你好",
                "pinyin": "nǐ hǎo",
                "meaning": "Hello",
                "example": "你好！",
                "translation": "Hello!"
            },
            {
                "id": "v2",
                "word": "我",
                "pinyin": "wǒ",
                "meaning": "I / Me",
                "example": "我是學生。",
                "translation": "I am a student."
            },
            {
                "id": "v3",
                "word": "叫",
                "pinyin": "jiào",
                "meaning": "To be called",
                "example": "我叫小明。",
                "translation": "My name is Xiaoming."
            },
            {
                "id": "v4",
                "word": "名字",
                "pinyin": "míng zi",
                "meaning": "Name",
                "example": "你叫什麼名字？",
                "translation": "What's your name?"
            },
            {
                "id": "v5",
                "word": "學生",
                "pinyin": "xué shēng",
                "meaning": "Student",
                "example": "我是學生。",
                "translation": "I am a student."
            }
        ],
        "grammar": [
            {
                "id": "g1",
                "title": "Basic Greeting",
                "explanation": "你好 is the standard greeting in Mandarin.",
                "example": "你好！",
                "translation": "Hello!"
            },
            {
                "id": "g2",
                "title": "Introducing Yourself",
                "explanation": "Use 我叫 + name to introduce yourself.",
                "example": "我叫小明。",
                "translation": "My name is Xiaoming."
            },
            {
                "id": "g3",
                "title": "Asking Someone's Name",
                "explanation": "Use 你叫什麼名字？ to ask someone's name.",
                "example": "你叫什麼名字？",
                "translation": "What's your name?"
            }
        ],
        "dialogue": {
            "title": "Meeting Someone",
            "lines": [
                {
                    "id": "d1",
                    "speaker": "A",
                    "text": "你好！",
                    "translation": "Hello!"
                },
                {
                    "id": "d2",
                    "speaker": "B",
                    "text": "你好！",
                    "translation": "Hello!"
                },
                {
                    "id": "d3",
                    "speaker": "A",
                    "text": "你叫什麼名字？",
                    "translation": "What's your name?"
                },
                {
                    "id": "d4",
                    "speaker": "B",
                    "text": "我叫小明。",
                    "translation": "My name is Xiaoming."
                },
                {
                    "id": "d5",
                    "speaker": "A",
                    "text": "我是學生。",
                    "translation": "I am a student."
                },
                {
                    "id": "d6",
                    "speaker": "B",
                    "text": "我也是學生。",
                    "translation": "I am a student too."
                }
            ]
        },
        "reading": {
            "title": "Reading Practice",
            "paragraphs": [
                {
                    "id": "r1",
                    "chinese": "你好！我叫小明。我是學生。很高興認識你。",
                    "pinyin": "Nǐ hǎo! Wǒ jiào Xiǎomíng. Wǒ shì xuéshēng. Hěn gāoxìng rènshi nǐ.",
                    "translation": "Hello! My name is Xiaoming. I am a student. Nice to meet you."
                }
            ]
        },
        "exercises": [
            {
                "id": "e1",
                "type": "multiple_choice",
                "question": "What does 你好 mean?",
                "options": [
                    {
                        "id": "o1",
                        "text": "Hello"
                    },
                    {
                        "id": "o2",
                        "text": "Goodbye"
                    },
                    {
                        "id": "o3",
                        "text": "Thank you"
                    },
                    {
                        "id": "o4",
                        "text": "Sorry"
                    }
                ],
                "answer": "Hello",
                "explanation": "你好 is the most common greeting in Mandarin."
            },
            {
                "id": "e2",
                "type": "multiple_choice",
                "question": "How do you say 'student' in Chinese?",
                "options": [
                    {
                        "id": "o1",
                        "text": "老師"
                    },
                    {
                        "id": "o2",
                        "text": "學生"
                    },
                    {
                        "id": "o3",
                        "text": "朋友"
                    },
                    {
                        "id": "o4",
                        "text": "名字"
                    }
                ],
                "answer": "學生",
                "explanation": "學生 means student."
            },
            {
                "id": "e3",
                "type": "fill_blank",
                "question": "_____！我叫小明。",
                "answer": "你好",
                "explanation": "Use 你好 to greet someone."
            },
            {
                "id": "e4",
                "type": "fill_blank",
                "question": "我_____小明。",
                "answer": "叫",
                "explanation": "叫 means 'to be called'."
            },
            {
                "id": "e5",
                "type": "multiple_choice",
                "question": "Which sentence means 'What's your name?'",
                "options": [
                    {
                        "id": "o1",
                        "text": "我是學生。"
                    },
                    {
                        "id": "o2",
                        "text": "你好！"
                    },
                    {
                        "id": "o3",
                        "text": "你叫什麼名字？"
                    },
                    {
                        "id": "o4",
                        "text": "我叫小明。"
                    }
                ],
                "answer": "你叫什麼名字？",
                "explanation": "你叫什麼名字？ is used to ask someone's name."
            }
        ]
    }
]
```