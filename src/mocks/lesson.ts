import type { Lesson } from "../features/lesson/types";

export const lesson: Lesson = {
  id: "lesson-1",

  title: "Greetings",

  overview: "Learn basic greetings in Chinese.",

  objectives: ["Say hello", "Introduce yourself", "Ask someone's name"],

  vocabulary: [
    {
      id: "1",
      word: "你好",
      pinyin: "nǐ hǎo",
      meaning: "Hello",
    },
    {
      id: "2",
      word: "谢谢",
      pinyin: "xiè xie",
      meaning: "Thank you",
    },
  ],

  grammar: [
    {
      id: "1",
      title: "Basic Greeting",
      explanation: "你好 is the most common greeting in Chinese.",
      example: "你好，我叫小明。",
      translation: "Hello, my name is Xiaoming.",
    },
  ],
  dialogue: {
    title: "Greeting Conversation",

    lines: [
      {
        id: "1",
        speaker: "A",
        text: "你好！",
        translation: "Hello!",
      },
      {
        id: "2",
        speaker: "B",
        text: "你好！你叫什么名字？",
        translation: "Hello! What's your name?",
      },
      {
        id: "3",
        speaker: "A",
        text: "我叫小明。",
        translation: "My name is Xiaoming.",
      },
    ],
  },
  reading: {
    title: "Reading",

    paragraphs: [
      {
        id: "1",

        chinese: "你好，我叫小明。",

        pinyin: "Nǐ hǎo, wǒ jiào Xiǎomíng.",

        translation: "Hello, my name is Xiaoming.",
      },

      {
        id: "2",

        chinese: "我是学生。",

        pinyin: "Wǒ shì xuéshēng.",

        translation: "I am a student.",
      },
    ],
  },
  exercises: [
    {
      id: "1",

      type: "multiple_choice",

      question: "What does 你好 mean?",

      options: [
        {
          id: "a",
          text: "Hello",
        },
        {
          id: "b",
          text: "Thank you",
        },
        {
          id: "c",
          text: "Goodbye",
        },
        {
          id: "d",
          text: "Sorry",
        },
      ],

      answer: "Hello",

      explanation: "你好 is the standard greeting.",
    },
  ],
};
