
// Vercel Serverless Function to proxy chat requests
// This allows hiding the API key from the client-side code.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, model } = req.body;
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API Key configuration' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorData}`);
    }

    // Set headers for SSE (Server-Sent Events)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    // Pipe the stream from DeepSeek directly to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    
    res.end();

  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Failed to fetch from DeepSeek API' });
  }
}
