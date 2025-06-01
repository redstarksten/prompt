// File: api/generate.js (Vercel Serverless Function) export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

const { mode, inputs } = req.body;

const templates = { image: Buat prompt gambar dengan detail berikut:\nSubjek: ${inputs.subject}\nObjek: ${inputs.object}\nLatar: ${inputs.background}\nTone Warna: ${inputs.colorTone}\nEkspresi: ${inputs.expression}\nNuansa: ${inputs.mood}, video: Buat deskripsi adegan video sinematik:\nAksi Subjek: ${inputs.action}\nGerakan Objek: ${inputs.objectMovement}\nKamera: ${inputs.cameraMovement}\nDialog: ${inputs.dialog}\nSetting: ${inputs.sceneTimeLocation}, narrative: Tulis narasi pendek berdasarkan:\nTokoh: ${inputs.character}\nTema: ${inputs.theme}\nGaya Bahasa: ${inputs.style}\nSuasana: ${inputs.atmosphere} };

const prompt = templates[mode];

try { const response = await fetch('https://api.deepseek.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': Bearer ${process.env.DEEPSEEK_API_KEY} }, body: JSON.stringify({ model: 'deepseek-chat', messages: [ { role: 'system', content: 'You are a helpful creative assistant.' }, { role: 'user', content: prompt } ] }) });

const data = await response.json();
res.status(200).json({ result: data.choices?.[0]?.message?.content || 'No result.' });

} catch (error) { res.status(500).json({ error: 'Failed to fetch from DeepSeek API' }); } }

