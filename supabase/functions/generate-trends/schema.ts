export const schema = {
  name: "golf_trends_analysis",
  description: "Analysis of golf practice patterns and insights",
  strict: true,
  schema: {
    type: "object",
    properties: {
      patterns: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: [
                "hidden_strength",
                "mental_signature",
                "game_changing",
                "strategic_instinct",
                "growth_indicator"
              ]
            },
            primary_insight: {
              type: "string",
              description: "The hook - immediate, compelling revelation"
            },
            details: {
              type: "string",
              description: "A natural, flowing paragraph that tells the story behind this insight with specific examples and observations"
            },
            confidence_score: {
              type: "number",
              minimum: 1,
              maximum: 100,
              description: "Confidence score between 1-100"
            }
          },
          required: ["type", "primary_insight", "details", "confidence_score"],
          additionalProperties: false
        }
      }
    },
    required: ["patterns"],
    additionalProperties: false
  }
};