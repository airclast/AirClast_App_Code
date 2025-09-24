
import { GoogleGenAI, Type } from "@google/genai";
import type { AirQualityReport, HealthProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    location: { type: Type.STRING },
    currentAqi: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.INTEGER, description: "A number between 0 and 500." },
        category: { type: Type.STRING, description: "e.g., Good, Moderate, Unhealthy" },
        description: { type: Type.STRING, description: "A brief, 1-sentence description of the current air quality." },
      },
      required: ["value", "category", "description"],
    },
    pollutantBreakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "e.g., PM2.5, O₃, NO₂" },
          value: { type: Type.NUMBER, description: "The percentage contribution of this pollutant." },
        },
        required: ["name", "value"],
      },
    },
    forecast: {
      type: Type.ARRAY,
      description: "Provide a 24-hour forecast in 3-hour increments, for a total of 8 points.",
      items: {
        type: Type.OBJECT,
        properties: {
          hour: { type: Type.STRING, description: "The forecast hour, e.g., '3PM', '6PM', 'Now'" },
          aqi: { type: Type.INTEGER },
        },
        required: ["hour", "aqi"],
      },
    },
    healthAlert: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "A short, urgent-sounding title for the health alert." },
        recommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of 2-3 actionable health recommendations tailored to the user's profile."
        },
      },
      required: ["title", "recommendations"],
    },
  },
  required: ["location", "currentAqi", "pollutantBreakdown", "forecast", "healthAlert"],
};

export const fetchAirQualityReport = async (location: string, healthProfile: HealthProfile): Promise<AirQualityReport> => {
  const prompt = `
    Generate a realistic, simulated air quality report for ${location}.
    The user's health profile is: "${healthProfile}".
    Tailor the health recommendations specifically for this profile based on the generated AQI data.
    The pollutant breakdown percentages should add up to 100.
    The forecast should show some variability over the next 24 hours.
    Return the data strictly according to the provided JSON schema. Do not add any extra text or markdown formatting.
    Make the location name in the response match the requested location, but feel free to add a state or country for realism.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: reportSchema,
    },
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as AirQualityReport;
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", jsonText);
    throw new Error("Received an invalid format from the AI model.");
  }
};


export const generateImmersiveStory = async (topic: string) => {
    const prompt = `
        You are an environmental storyteller for the AirVision360 app.
        Create a short, immersive, and educational story (2-3 paragraphs) based on the following topic: "${topic}".
        Use vivid language to help the user visualize the atmospheric science and its impact on daily life.
        The tone should be informative yet engaging, like a mini-documentary script.
        Do not use markdown. Just return the text of the story.
    `;
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response;
};
