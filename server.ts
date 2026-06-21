import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Nudge Engine (Translates raw CO2 to contextual nudges)
  app.post("/api/nudge", async (req, res) => {
    try {
      const { activity, co2_kg } = req.body;
      
      const prompt = `You are the core intelligence of 'EcoNudge'. The user has logged an activity: "${activity}" which generates approximately ${co2_kg} kg of CO2. Provide a 1-sentence relatable real-world comparison of this carbon cost to build awareness. For example: "This flight generates 100kg of CO2. That's equivalent to 4 months of electricity usage for an average household." Keep it empathetic, punchy, and emotional. Limit to 2 sentences max.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ nudge: response.text });
    } catch (error) {
      console.error("Error generating nudge:", error);
      res.status(500).json({ error: "Failed to generate nudge" });
    }
  });

  // API Route for Insights
  app.post("/api/insights", async (req, res) => {
    try {
      const { activities } = req.body;
      const activityData = JSON.stringify(activities);
      
      const prompt = `Analyze these recent user activities: ${activityData}. Generate exactly 3 short, personalized, highly actionable, and empathetic tips to reduce their specific footprint bottlenecks. Return the response as a JSON array of strings. Do not use markdown blocks like \`\`\`json. Return bare JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      res.json({ insights: JSON.parse(response.text || '[]') });
    } catch (error) {
      console.error("Error generating insights:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
