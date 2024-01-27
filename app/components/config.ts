import { CharacterType, MessageType } from "./types";

//VOICEVOXのキャラクター
// https://voicevox.hiroshiba.jp/
export const Characters: CharacterType[] = [
    { value: "3", label: "ずんだもん", word: "ずんだもんです" },
    { value: "2", label: "四国めたん", word: "しこくめたんです" },
];

// テスト用メッセージリスト
export const TestMessages: MessageType[] = Array.from({ length: 10 }, () => [
    { type: "question", text: "テスト質問" },
    { type: "answer", text: "テスト回答1\nテスト回答2\nテスト回答3" },
]).flat();
