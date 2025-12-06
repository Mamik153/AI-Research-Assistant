import { Type, Modality } from "@google/genai";
import type { StructuredResearchData, GeminiResearchResult, ImageSize } from "../types/research";
import { getAiClient } from "../core/config/api";

/**
 * Step 1: Research with Google Search Grounding
 */
export const performResearch = async (topic: string): Promise<GeminiResearchResult> => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Research the following topic in depth: "${topic}". 
      Provide a comprehensive summary suitable for a research paper. 
      Include key facts, figures, and historical context if applicable.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No result generated.";
    const rawGroundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Map and filter grounding chunks to match our custom type
    // Only include chunks that have a web property with both uri and title
    const groundingChunks = rawGroundingChunks
      .map((chunk) => {
        const web = chunk.web;
        if (web?.uri && web?.title) {
          return {
            web: {
              uri: web.uri,
              title: web.title,
            },
          };
        }
        return null;
      })
      .filter((chunk): chunk is { web: { uri: string; title: string } } => chunk !== null);

    return {
      summary: text,
      groundingChunks: groundingChunks,
      rawText: text,
    };
  } catch (error) {
    console.error("Research failed:", error);
    throw error;
  }
};

/**
 * Step 2: Structure the research data into Mind Map and Flash Cards
 * We pass the previous research text as context to ensure consistency.
 */
export const structureResearchData = async (researchText: string): Promise<StructuredResearchData> => {
  const ai = getAiClient();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following research text, generate a JSON object containing data for a mind map and a set of 5-8 flashcards.
      
      Research Text:
      ${researchText}
      
      Requirements:
      1. Mind Map: Create nodes and links. The central node should be the main topic. Include a brief description for each node explaining the concept.
      2. Flash Cards: Create key question (front) and answer (back) pairs.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mindMap: {
              type: Type.OBJECT,
              properties: {
                nodes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      group: { type: Type.NUMBER },
                      description: { type: Type.STRING, description: "A concise 1-2 sentence explanation of this node's concept." }
                    },
                    required: ["id", "label", "group", "description"]
                  }
                },
                links: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: { type: Type.STRING },
                      target: { type: Type.STRING },
                      value: { type: Type.NUMBER }
                    },
                    required: ["source", "target", "value"]
                  }
                }
              },
              required: ["nodes", "links"]
            },
            flashCards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING },
                  back: { type: Type.STRING }
                },
                required: ["front", "back"]
              }
            }
          },
          required: ["mindMap", "flashCards"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as StructuredResearchData;
    }
    throw new Error("Failed to parse structured data");
  } catch (error) {
    console.error("Structuring failed:", error);
    throw error;
  }
};

/**
 * Get Search Suggestions
 * Uses a lightweight call to suggest research topics
 */
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide 5 concise, popular search queries or research topics that complete or relate to: "${query}". Return a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as string[];
    }
    return [];
  } catch (error) {
    console.warn("Suggestion fetch failed", error);
    // Return empty to not break UI
    return [];
  }
};

/**
 * Generate Speech (TTS)
 * Uses gemini-2.5-flash-preview-tts with 'Puck' voice for energetic output.
 */
export const generateSpeech = async (text: string): Promise<string> => {
  const ai = getAiClient();
  try {
    // We clean the text slightly to remove Markdown artifacts that might sound weird
    const cleanText = text.replace(/[#*`_]/g, '').slice(0, 4000); // Simple cap to prevent context overload

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: {
        parts: [{ text: cleanText }],
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' }, // 'Puck' is energetic
          },
        },
      },
    });

    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (audioData) {
      return audioData;
    }
    throw new Error("No audio generated");
  } catch (error) {
    console.error("Speech generation failed:", error);
    throw error;
  }
};

/**
 * Generate High-Quality Images (Nano Banana Pro)
 * Requires paid key (checked in UI)
 */
export const generateHighQualityImage = async (prompt: string, size: ImageSize): Promise<string> => {
  const ai = getAiClient();
  
  // Map size to config
  // 1K is default, others need specific config if supported by preview
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size, 
          aspectRatio: "1:1" // Defaulting to square for simplicity
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

/**
 * Edit Image (Nano Banana)
 */
export const editImage = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = getAiClient();
  
  // Ensure base64 string doesn't have the header
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png", // Assuming PNG or JPEG, converting usually handled by reader
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image generated");
  } catch (error) {
    console.error("Image editing failed:", error);
    throw error;
  }
};
