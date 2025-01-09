export function cleanAndValidateJSON(response: string): string {
  try {
    // First try to parse as is
    JSON.parse(response);
    return response;
  } catch (error) {
    console.log('Initial JSON parsing failed, attempting to clean response');
    
    // Remove any markdown code block syntax
    let cleanResponse = response.replace(/```json\n|\n```/g, '').trim();
    
    // Remove any leading/trailing whitespace and newlines
    cleanResponse = cleanResponse.trim();
    
    // Remove any potential text before or after the JSON object
    const jsonStart = cleanResponse.indexOf('{');
    const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
    
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      cleanResponse = cleanResponse.slice(jsonStart, jsonEnd);
    }
    
    try {
      JSON.parse(cleanResponse);
      return cleanResponse;
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', cleanResponse);
      throw new Error('AI response is not valid JSON even after cleanup');
    }
  }
}

export function prepareRecordingsData(recordings: any[]) {
  const recordingsData = recordings.map(r => {
    try {
      return {
        analysis: r.analysis ? JSON.parse(r.analysis) : null,
        date: r.created_at
      };
    } catch (error) {
      console.error('Error parsing recording analysis:', error);
      return null;
    }
  }).filter(r => r !== null && r.analysis !== null);

  if (recordingsData.length === 0) {
    throw new Error('No valid recordings found for analysis');
  }

  return recordingsData;
}