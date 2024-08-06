// pages/api/chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log('Received message:', message);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": [
            {"role": "user", "content": message},
          ],
        })
      });

      const data = await response.json();
      console.log('OpenRouter response:', data);

      const assistantMessage = data.choices && data.choices.length > 0 ? data.choices[0].message.content : "Sorry, I didn't get that.";
      res.status(200).json({ response: assistantMessage });
    } catch (error) {
      console.error('OpenRouter API error:', error);
      res.status(500).json({ error: 'Error communicating with OpenRouter' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
