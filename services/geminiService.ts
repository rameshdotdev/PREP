import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const executeTerminalCommand = async (command: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "ERROR: UPLINK_OFFLINE // API_KEY_MISSING";
  }

  try {
    // Use a lightweight model for fast terminal responses
    const model = "gemini-2.5-flash"; 
    const systemInstruction = `
      You are the central "Strategy Core" of Revolt System, an elite competitive exam preparation platform.
      You speak in a clipped, industrial, system-admin tone, but your knowledge base is focused on:
      - UPSC Civil Services, SSC CGL, RRB, Banking Exams.
      - JEE Mains/Advanced, NEET, GATE.
      - General Knowledge, Quantitative Aptitude, Current Affairs.
      
      Use uppercase for emphasis. Avoid flowery language.
      If user asks about a specific exam, give dates or syllabus highlights concisely.
      If user asks a GK question, provide the answer as a "DATA_PACKET".
      Keep responses under 40 words.
      Prefix response with "SYSTEM_RESPONSE :: ".
    `;

    const response = await ai.models.generateContent({
      model,
      contents: command,
      config: {
        systemInstruction,
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });

    return response.text || "ERROR: NULL_RESPONSE_PACKET";
  } catch (error) {
    console.error("Terminal Uplink Failed:", error);
    return "ERROR: CONNECTION_RESET_BY_PEER";
  }
};