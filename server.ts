import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper for Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// API: Ask Robo-IPO Tutor
app.post('/api/tutor', async (req, res) => {
  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Fallback responses if API key is missing or offline
  const fallback = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('mouse') || q.includes('keyboard') || q.includes('kamera') || q.includes('scanner') || q.includes('mikrofon')) {
      return `Perangkat tersebut bertugas menangkap sinyal fisik dari dunia nyata (ketikan, gerakan, suara, cahaya) dan mengubahnya menjadi sinyal digital bit (0 dan 1). Oleh karena itu, perangkat ini masuk ke dalam kategori **INPUT** (Masukan)! Data mentah ini selanjutnya akan dikirim ke CPU/RAM untuk diproses.`;
    }
    if (q.includes('cpu') || q.includes('prosesor') || q.includes('ram') || q.includes('alu') || q.includes('otak')) {
      return `Komponen ini adalah pusat pengolahan data komputer. **CPU** (Central Processing Unit) berfungsi mengeksekusi instruksi aritmatika & logika, sedangkan **RAM** menyimpan data sementara yang sedang aktif diproses. Keduanya berada dalam tahap **PROSES**!`;
    }
    if (q.includes('printer') || q.includes('monitor') || q.includes('speaker') || q.includes('proyektor') || q.includes('layar')) {
      return `Perangkat ini menerima data digital biner yang telah selesai diproses oleh CPU/GPU dan menyajikannya dalam format yang dapat dipahami indra manusia (gambar/video visual, teks kertas, atau gelombang suara). Karenanya komponen ini adalah **OUTPUT** (Keluaran)!`;
    }
    if (q.includes('ssd') || q.includes('harddisk') || q.includes('flashdisk') || q.includes('memori simpan')) {
      return `Perangkat ini adalah **STORAGE** (Penyimpanan Sekunder). Berbeda dengan RAM yang bersifat sementara (volatile), Storage menyimpan file dan program secara permanen (non-volatile) meskipun komputer dimatikan!`;
    }
    return `Dalam siklus kerja komputer (IPO):\n1. **Input**: Data dimasukkan lewat perangkat input (misal: tombol keyboard).\n2. **Proses**: CPU & RAM mengolah sinyal kode biner tersebut menjadi karakter.\n3. **Storage**: Data disimpan ke harddisk/SSD jika kamu menekan Save.\n4. **Output**: Hasil akhir ditampilkan di layar monitor atau dicetak ke kertas!`;
  };

  if (!aiClient) {
    return res.json({ answer: fallback(question), source: 'local_expert' });
  }

  try {
    const prompt = `Anda adalah "Robo-IPO", maskot asisten guru Informatika yang ramah, seru, dan edukatif untuk murid SMP Kelas 7 (Fase D).
Materi pembahasan: Sistem Komputer & Siklus Input-Proses-Output (IPO) + Storage.
Pertanyaan murid: "${question}"
Konteks aktivitas saat ini: "${context || 'Belajar Siklus IPO'}"

Tolong jawab dengan:
1. Bahasa Indonesia yang ramah, menyemangati, dan mudah dipahami anak SMP (jangan terlalu berbelit teknis, gunakan analogi jika perlu).
2. Tegaskan alurnya: apakah termasuk Input, Proses, Storage, atau Output, serta alasan logisnya.
3. Berikan apresiasi singkat atas keingintahuannya.
Maksimal 3-4 paragraf pendek yang terstruktur rapi.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text || fallback(question);
    return res.json({ answer: reply, source: 'gemini' });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.json({ answer: fallback(question), source: 'fallback_offline' });
  }
});

// API: Generate Custom Case Scenario
app.post('/api/generate-scenario', async (req, res) => {
  const { topic } = req.body;
  const userTopic = topic || 'Aktivitas sehari-hari anak SMP';

  const defaultCases = [
    {
      id: 'custom_default',
      title: 'Scan Barcode Belanja di Kasir Minimarket',
      description: 'Saat kamu belanja makanan ringan di minimarket, kasir mengarahkan scanner ke bungkus snack.',
      steps: {
        input: { name: 'Barcode Scanner Laser', detail: 'Membaca garis hitam putih kode batang UPC/EAN' },
        process: { name: 'Sistem Komputer Kasir (CPU)', detail: 'Mencocokkan nomor kode dengan database harga toko' },
        output: { name: 'Layar Kasir & Struk Belanja', detail: 'Menampilkan nama snack, harga Rp10.000, dan mencetak struk' },
        storage: { name: 'Server Database Minimarket', detail: 'Mengurangi stok barang sebanyak 1 pcs di gudang' }
      },
      story: 'Sinar merah scanner menangkap pola cahaya (Input), CPU mencari kecocokan harga di database (Proses), dan struk tercetak keluar (Output)!'
    }
  ];

  if (!aiClient) {
    return res.json({ scenario: defaultCases[0], source: 'preset' });
  }

  try {
    const prompt = `Buatkan 1 studi kasus skenario nyata siklus Input-Proses-Output (IPO) komputer untuk murid SMP Kelas 7 seputar tema: "${userTopic}".
Kembalikan HANYA format JSON valid tanpa tanda kutip markdown, dengan struktur:
{
  "id": "scenario_id",
  "title": "Judul Kasus Menarik",
  "description": "Deskripsi singkat 1-2 kalimat skenario yang dialami murid",
  "steps": {
    "input": { "name": "Nama Perangkat / Data Masukan", "detail": "Apa yang dilakukan" },
    "process": { "name": "Komponen Proses (CPU/GPU/RAM)", "detail": "Apa kalkulasi atau instruksi yang dijalankan" },
    "output": { "name": "Perangkat Keluaran", "detail": "Apa hasil akhir yang dilihat/didengar/diterima" },
    "storage": { "name": "Perangkat Penyimpanan", "detail": "Bagaimana data disimpan secara permanen" }
  },
  "story": "Penjelasan ringkas alur IPO dalam 2 kalimat."
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    // Clean potential markdown wrap
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return res.json({ scenario: parsed, source: 'gemini' });
  } catch (error) {
    console.error('Error generating scenario:', error);
    return res.json({ scenario: defaultCases[0], source: 'preset_fallback' });
  }
});

// Mount Vite or static build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 KompuSim Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
