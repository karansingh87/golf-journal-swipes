import { supabase } from "../integrations/supabase/client";

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');
  formData.append('model', 'whisper-1');

  try {
    const { data, error } = await supabase.functions.invoke('transcribe', {
      body: formData,
    });

    if (error) {
      console.error('Transcription error:', error);
      throw error;
    }

    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}