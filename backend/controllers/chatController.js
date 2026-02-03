import { Chat } from "../services/aiHealthCheck.js";

export const chatWithAi = async (req, res) => {
  try {
    const { message } = req.body; // ✅ extract string

    const answer = await Chat(message); // ✅ await

    return res.json({ data: answer });

  } catch (error) {
    console.log("error in chat controller", error);
    res.status(500).json({ error: "AI error" });
  }
};
