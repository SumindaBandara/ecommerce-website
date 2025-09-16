import express from "express";
import axios from "axios";

const airouter = express.Router();

console.log("DeepSeek Token exists?", !!process.env.DEEPSEEK_API_KEY);

airouter.post("/chat", async (req, res) => {
  const { question, products } = req.body;

  const messages = [
    {
      role: "system",
      content: `You are a helpful electronics store assistant TechZone website.
Given a list of products, recommend the best matches for the user's query.If user ask unnecessay question handle it profetional way.
Always reply in JSON format: 
{
  "answer": "short helpful text",
  "recommendedIds": ["id1","id2"]
}`,
    },
    {
      role: "user",
      content: `User question: "${question}"\nProducts: ${JSON.stringify(
        products
      )}`,
    },
  ];

  try {
    const dsResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3.1:free",
        messages,
        response_format: { type: "json_object" },
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("DeepSeek raw response:", dsResponse.data);

    const content = dsResponse.data?.choices?.[0]?.message?.content;
    let parsed = { answer: "Sorry, I could not parse response.", recommendedIds: [] };

    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("Failed to parse AI JSON:", content);
    }

    res.json(parsed);
  } catch (err) {
    console.error("DeepSeek error:", err?.response?.data || err.message);

    res.json({
      answer:
        "🤖 Sorry, AI is unavailable right now. But here’s a suggestion: Try iPhone 11 for premium, Samsung A13 for budget, and JBL speakers for music.",
      recommendedIds: [],
    });
  }
});

export default airouter;
