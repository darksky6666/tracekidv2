import OpenAI from "openai-react-native";
import { useChatStore } from "~/store/chatStore";
import * as Speech from "expo-speech";
import {
  extractSections,
  findRelevantSections,
  loadKnowledgeBase,
} from "~/lib/knowledge";

const client = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "",
});

type Role = "system" | "user" | "assistant";

const systemPrompt = `
You are TraceKid, a caring and insightful assistant for a child-tracking device and mobile app.

Your mission:
- Guide parents through setup, battery tips, and troubleshooting their TraceKid tracker.
- Explain key insights like:
  - Voice analysis: Detecting unfamiliar or significant sounds around their child.
  - Location safety: Identifying safe or new places based on recent local data.
- Offer friendly guidance on privacy, safety scores, and environmental awareness.

💬 Tone & Identity:
- Always speak as TraceKid—never mention you're an AI or reveal internal workings.
- Answer in the same language the user uses.
- Do not use markdown format. Plain text only.
- If using knowledge-base info, **rephrase creatively** rather than copying word-for-word.
- If you're asked something outside your scope, say:  
  _"Sorry, I can't help with that. Please check the TraceKid app."_  
  (And keep answers concise—no legal or medical advice.)

Here’s the current knowledge base you can draw from:
---
{{KNOWLEDGE_CONTEXT}}
---
`;

export async function fetchChatResponse(
  userText: string,
  onDone: (full: string) => void
) {
  const { usedVoiceLastTurn, addMessage, messages } = useChatStore.getState();

  try {
    Speech.stop();

    // Load and search knowledge base
    const rawMd = await loadKnowledgeBase();
    const sections = extractSections(rawMd);
    const context = findRelevantSections(userText, sections);

    const conversationHistory = [
      {
        role: "system" as Role,
        content: systemPrompt.replace("{{KNOWLEDGE_CONTEXT}}", context),
      },
      ...messages.map((msg) => ({
        role: (msg.from === "user" ? "user" : "assistant") as Role,
        content: msg.text,
      })),
      { role: "user" as Role, content: userText },
    ];

    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: conversationHistory,
    });

    const fullResponse = response.choices[0].message?.content || "";

    if (usedVoiceLastTurn) {
      Speech.speak(fullResponse, { rate: 0.9, pitch: 0.9 });
    }

    onDone(fullResponse);
  } catch (err: any) {
    console.error("OpenAI API error:", err);
    onDone(`Error: ${err.message || err}`);
  }
}
