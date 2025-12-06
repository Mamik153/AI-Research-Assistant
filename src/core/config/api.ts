import { GoogleGenAI } from "@google/genai";

/**
 * Centralized API client initialization
 * Re-instantiate to capture updated API keys if needed
 */
export const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });
