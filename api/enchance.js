export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const API_KEY = process.env.DEEPSEEK_API_KEY;
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong." });
  }

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a prompt enhancer. Make the user's prompt more vivid, detailed, and descriptive."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok || !data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "Gagal memproses respons.", detail: data });
    }

    const enhanced = data.choices[0].message.content.trim();
    res.status(200).json({ enhanced_prompt: enhanced });

  } catch (error) {
    res.status(500).json({ error: "Gagal menghubungi DeepSeek.", detail: error.message });
  }
}
