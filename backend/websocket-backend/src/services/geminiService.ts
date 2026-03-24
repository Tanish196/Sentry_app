import axios from "axios";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";

class GeminiService {
  async generateReply(question: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
      },
      {
        params: { key: apiKey },
        headers: { "Content-Type": "application/json" },
        timeout: Number(process.env.GEMINI_TIMEOUT_MS ?? 15000),
      }
    );

    const answer =
      response.data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("")
        .trim() ?? "";

    if (!answer) {
      throw new Error("Gemini returned an empty response");
    }

    return answer;
  }
}

export const geminiService = new GeminiService();
