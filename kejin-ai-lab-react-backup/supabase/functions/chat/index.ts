
import { SYSTEM_PROMPT_CN, SYSTEM_PROMPT_EN } from './prompts.ts';

// Use Deno's built-in serve API (no need for std library import in newer Deno versions on Supabase)
Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, model, language } = await req.json();
    const apiKey = Deno.env.get('DEEPSEEK_API_KEY');

    if (!apiKey) {
      console.error('Missing API Key');
      return new Response(
        JSON.stringify({ error: 'Server Config Error: Missing API Key' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select system prompt based on language
    const systemPromptContent = language === 'zh' ? SYSTEM_PROMPT_CN : SYSTEM_PROMPT_EN;

    // Filter out any existing system messages from client to prevent override/injection
    const userMessages = messages.filter((m) => m.role !== 'system');
    
    // Construct final messages array
    const apiMessages = [
      { role: 'system', content: systemPromptContent },
      ...userMessages
    ];

    console.log(`Forwarding request to DeepSeek... (Model: ${model || 'deepseek-chat'}, Lang: ${language})`);

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `DeepSeek API Error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No body in DeepSeek response');
    }

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
