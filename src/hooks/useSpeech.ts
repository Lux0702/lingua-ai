import { useState } from "react";

export function useSpeech(language: string) {
  const [speaking, setSpeaking] = useState(false);

  function speak(text: string) {
    if (!text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    switch (language) {
      case "zh":
        utterance.lang = "zh-CN";
        break;
      case "ja":
        utterance.lang = "ja-JP";
        break;
      case "ko":
        utterance.lang = "ko-KR";
        break;
      default:
        utterance.lang = "en-US";
    }

    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
  }

  return {
    speak,
    speaking,
  };
}
