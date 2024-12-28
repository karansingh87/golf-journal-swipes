export const trendsSchema = {
  name: "golf_trends_analysis",
  description: "Structured analysis of golf practice trends",
  strict: true,
  schema: {
    type: "object",
    properties: {
      overview: {
        type: "object",
        properties: {
          summary: { type: "string" },
          period_analyzed: { type: "string" },
          total_sessions: { type: "integer" }
        },
        required: ["summary", "period_analyzed", "total_sessions"],
        additionalProperties: false
      },
      key_improvements: {
        type: "array",
        items: {
          type: "object",
          properties: {
            area: { type: "string" },
            description: { type: "string" },
            evidence: { type: "string" }
          },
          required: ["area", "description", "evidence"],
          additionalProperties: false
        }
      },
      technical_analysis: {
        type: "object",
        properties: {
          swing_patterns: {
            type: "array",
            items: {
              type: "object",
              properties: {
                pattern: { type: "string" },
                frequency: { type: "string" },
                impact: { type: "string" }
              },
              required: ["pattern", "frequency", "impact"],
              additionalProperties: false
            }
          },
          club_trends: {
            type: "array",
            items: {
              type: "object",
              properties: {
                club: { type: "string" },
                observations: { type: "array", items: { type: "string" } }
              },
              required: ["club", "observations"],
              additionalProperties: false
            }
          }
        },
        required: ["swing_patterns", "club_trends"],
        additionalProperties: false
      },
      mental_game: {
        type: "object",
        properties: {
          overall_trend: { type: "string" },
          strengths: { type: "array", items: { type: "string" } },
          areas_for_improvement: { type: "array", items: { type: "string" } }
        },
        required: ["overall_trend", "strengths", "areas_for_improvement"],
        additionalProperties: false
      },
      recommendations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            focus_area: { type: "string" },
            action_items: { type: "array", items: { type: "string" } },
            priority: { type: "string", enum: ["high", "medium", "low"] }
          },
          required: ["focus_area", "action_items", "priority"],
          additionalProperties: false
        }
      }
    },
    required: ["overview", "key_improvements", "technical_analysis", "mental_game", "recommendations"],
    additionalProperties: false
  }
};