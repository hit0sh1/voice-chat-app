"use client";

import { useState } from "react";
import CharacterSelect from "./character-select";
import { Characters } from "./config";
import { CharacterType } from "./types";

const Main = () => {
    const [character, setCharacter] = useState<CharacterType>(Characters[0]);

    const playAudio = async (text: string, speaker: string) => {};

    return (
        <div>
            <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />
        </div>
    );
};
export default Main;
