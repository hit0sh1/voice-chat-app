"use client";

import axios from "axios";
import { useState } from "react";
import CharacterSelect from "./character-select";
import { Characters } from "./config";
import { CharacterType } from "./types";

const Main = () => {
    const [character, setCharacter] = useState<CharacterType>(Characters[0]);

    const playAudio = async (text: string, speaker: string) => {
        try {
            const responseAudio = await axios.post("/api/audio", {
                text,
                speaker,
            });

            const base64Audio = responseAudio?.data?.reseponse;

            const byteArray = Buffer.from(base64Audio, "base64");

            const audioBlob = new Blob([byteArray], { type: "audio/x-wav" });

            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);

            audio.volume = 1;

            audio.play();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />
        </div>
    );
};
export default Main;
