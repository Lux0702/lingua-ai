import { useState } from "react";

const languageMap = {
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  en: "en-US",
} as const;

export function useSpeech(language: string) {
  const [speaking, setSpeaking] = useState(false);

  function speak(text: string) {
    if (!text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =
      languageMap[language as keyof typeof languageMap] ?? "en-US";

    utterance.rate = 0.9;

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }

  return {
    speak,
    speaking,
  };
}
