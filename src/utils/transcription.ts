
import { supabase } from "../integrations/supabase/client";

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    console.log('Starting transcription process...');
    
    // Create a proper FormData object
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('model', 'whisper-1');
    
    console.log('Sending request to transcribe function...');
    const { data, error } = await supabase.functions.invoke('transcribe', {
      body: formData,
    });

    if (error) {
      console.error('Transcription error:', error);
      throw error;
    }

    console.log('Transcription completed successfully:', { 
      hasText: !!data?.text,
      textLength: data?.text?.length 
    });

    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}
