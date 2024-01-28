"use client";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRef, useState } from "react";
import CharacterSelect from "./character-select";
import { Characters, TestMessages } from "./config";
import { CharacterType, MessageType } from "./types";

//メインコンポーネント
const Main = () => {
    const [character, setCharacter] = useState<CharacterType>(Characters[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageType[]>(TestMessages);
    const questionRef = useRef<HTMLInputElement>(null);

    //音声再生
    const playAudio = async (text: string, speaker: string) => {
        try {
            // 音声取得
            const responseAudio = await axios.post("/api/audio", {
                text,
                speaker,
            });
            // base64形式で取得
            const base64Audio = responseAudio?.data?.response;

            // Bufferに変換
            const byteArray = Buffer.from(base64Audio, "base64");

            // Blobに変換
            const audioBlob = new Blob([byteArray], { type: "audio/x-wav" });

            // URLに変換
            const audioUrl = URL.createObjectURL(audioBlob);

            // 音声作成
            const audio = new Audio(audioUrl);

            // 音量[0-1]設定
            audio.volume = 1;

            // 再生
            audio.play();
        } catch (e) {
            console.error(e);
        }
    };

    //送信
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

    return (
        <div>
            {/* キャラクター選択 */}
            <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />

            <div className="px-3">
                {/* メッセージ */}
                {messages.map((data, index) => (
                    <div key={index}>
                        {data.type === "question" ? (
                            <div className="mb-4">
                                <div className="leading-relaxed break-words whitespace-pre-wrap text-gray-600">
                                    {data.text}
                                </div>
                            </div>
                        ) : data.type === "answer" ? (
                            <div className="mb-4">
                                <div className="leading-relaxed break-words whitespace-pre-wrap font-bold">
                                    {data.text}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                ))}

                {/* ローディング */}
                {loading && (
                    <div className="flex items-center justify-center my-2">
                        <ArrowPathIcon className="h-6 w-6 animate-spin text-gray-600" />
                    </div>
                )}
            </div>
            <form onSubmit={onSubmit}>
                {/* 入力フォーム */}
                <input
                    className="w-full border-b py-2 px-3 focus:outline-none bg-transparent"
                    placeholder="質問を入力してください"
                    ref={questionRef}
                    disabled={loading}
                    id="question"
                    required
                />
            </form>
        </div>
    );
};
export default Main;
