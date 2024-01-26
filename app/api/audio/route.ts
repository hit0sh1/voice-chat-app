import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { text, speaker } = await req.json();

        const responseQuery = await axios.post(
            `${process.env.VOICEVOX_URL}/audio_query?speaker=${speaker}&text=${text}`
        );

        const query = responseQuery.data;

        const responseSynthesis = await axios.post(`${process.env.VOICEVOX_URL}/synthesis?speaker=${speaker}`, query, {
            responseType: "arraybuffer",
        });

        const base64Data = Buffer.from(responseSynthesis.data, "binary").toString("base64");

        return NextResponse.json({ response: base64Data });
    } catch (error) {
        console.log("error", error);
        return NextResponse.error();
    }
}
