import { corsHeaders } from './cors.ts';

export const handleError = (error: Error) => {
  return new Response(
    JSON.stringify({
      error: error.message,
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};

export const handleSuccess = (data: unknown) => {
  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};