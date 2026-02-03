import OpenAI from "openai";
import { AI_CHAT_KEY } from "../env.js";

const client = new OpenAI({
  apiKey: AI_CHAT_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const Chat = async (text) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a helpful healthcare assistant."
        },
        {
          role: "user",
          content: text
        }
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.log("error in ai chat");
    console.log(error);
    throw error;
  }
};
