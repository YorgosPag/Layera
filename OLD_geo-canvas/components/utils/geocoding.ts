import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export interface GeocodingResult {
    lat: number;
    lng: number;
    displayName: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Geocodes an address using the Gemini API.
 * @param address The address string to geocode.
 * @returns A promise that resolves with an array of geocoding results.
 */
export const geocodeAddress = async (address: string): Promise<GeocodingResult[]> => {
    if (!address || address.trim() === '') {
        return [];
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Find the geographic coordinates for the following address: "${address}". If there are multiple possible locations, provide the most likely ones.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    description: "A list of possible locations for the given address.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            lat: {
                                type: Type.NUMBER,
                                description: "The latitude of the location.",
                            },
                            lng: {
                                type: Type.NUMBER,
                                description: "The longitude of the location.",
                            },
                            displayName: {
                                type: Type.STRING,
                                description: "The full, formatted name of the address.",
                            },
                        },
                        required: ["lat", "lng", "displayName"],
                    },
                },
                systemInstruction: "You are a highly accurate geocoding service. Given an address, return a JSON array of possible locations. If no location is found, return an empty array.",
            },
        });

        const jsonStr = response.text.trim();
        if (!jsonStr) {
            return [];
        }

        const results = JSON.parse(jsonStr);
        
        if (Array.isArray(results)) {
            // Filter to ensure all items match the expected structure
            return results.filter(r =>
                typeof r.lat === 'number' &&
                typeof r.lng === 'number' &&
                typeof r.displayName === 'string'
            ) as GeocodingResult[];
        }
        
        console.warn("Geocoding response was not a JSON array:", results);
        return [];

    } catch (error) {
        console.error("Error geocoding address with Gemini:", error);
        return []; // Return empty array on error
    }
};
