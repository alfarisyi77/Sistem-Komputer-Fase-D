import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Keyboard, 
  Mouse, 
  Camera, 
  Mic, 
  ScanLine, 
  Gamepad2, 
  Cpu, 
  CircuitBoard, 
  MonitorPlay, 
  HardDrive, 
  Save, 
  Monitor, 
  Printer, 
  Volume2, 
  Tv, 
  Send, 
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { HARDWARE_CATALOG } from '../data/ipoContent';
import { HardwareItem, ComponentCategory } from '../types/ipo';
import { sound } from '../utils/sound';

interface HardwareLabProps {
  onNext: () => void;
}

export const HardwareLab: React.FC<HardwareLabProps> = ({ onNext }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ComponentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<HardwareItem>(HARDWARE_CATALOG[0]);

  // AI Scenario Generator state
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenario, setGeneratedScenario] = useState<{
    title: string;
    description: string;
    steps: {
      input: { name: string; detail: string };
      process: { name: string; detail: string };
      storage?: { name: string; detail: string };
      output: { name: string; detail: string };
    };
    story: string;
  } | null>(null);

  // Icon renderer helper
  const renderHardwareIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Keyboard': return <Keyboard className={className} />;
      case 'Mouse': return <Mouse className={className} />;
      case 'Camera': return <Camera className={className} />;
      case 'Mic': return <Mic className={className} />;
      case 'ScanLine': return <ScanLine className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'CircuitBoard': return <CircuitBoard className={className} />;
      case 'MonitorPlay': return <MonitorPlay className={className} />;
      case 'HardDrive': return <HardDrive className={className} />;
      case 'Save': return <Save className={className} />;
      case 'Monitor': return <Monitor className={className} />;
      case 'Printer': return <Printer className={className} />;
      case 'Volume2': return <Volume2 className={className} />;
      case 'Tv': return <Tv className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const filteredHardware = HARDWARE_CATALOG.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryBadgeClass = (category: ComponentCategory) => {
    switch (category) {
      case 'input': return 'bg-indigo-950/60 text-indigo-400 border-indigo-700/60';
      case 'process': return 'bg-amber-950/60 text-amber-400 border-amber-700/60';
      case 'storage': return 'bg-cyan-950/60 text-cyan-400 border-cyan-700/60';
      case 'output': return 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60';
    }
  };

  // Generate Custom AI Scenario
  const handleGenerateScenario = async (topic?: string) => {
    const query = topic || customPrompt;
    if (!query.trim()) return;

    sound.playClick();
    setIsGenerating(true);
    setGeneratedScenario(null);

    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query }),
      });
      const data = await response.json();
      if (data.scenario) {
        setGeneratedScenario(data.scenario);
        sound.playSuccess();
      }
    } catch {
      // Offline fallback
      setGeneratedScenario({
        title: `Alur Komputasi: ${query}`,
        description: `Skenario digital mandiri untuk aktivitas "${query}".`,
        steps: {
          input: { name: 'Sensor / Tombol Masukan', detail: 'Menerima pemicu atau instruksi awal dari pengguna/lingkungan fisik.' },
          process: { name: 'Prosesor Sistem (CPU/Microcontroller)', detail: 'Menganalisis logika keputusan dan mengubah sinyal masukan menjadi instruksi kerja.' },
          storage: { name: 'Memori Penyimpanan', detail: 'Merekam log histori aktivitas atau data pengaturan sistem.' },
          output: { name: 'Perangkat Keluaran (Layar/Aktuator/Suara)', detail: 'Menampilkan respon balik atau melakukan tindakan fisik yang diinginkan.' }
        },
        story: `Setiap sistem digital modern, termasuk "${query}", selalu mengandalkan siklus Masukan (Input), Pengolahan data logika (Proses), dan Hasil tindakan (Output).`
      });
      sound.playSuccess();
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleIdeas = [
    'Absensi Sidik Jari Siswa di Sekolah',
    'Smart Watch Penghitung Detak Jantung & Langkah',
    'Mesin Tiket Otomatis Kereta KRL',
    'Palang Pintu Tol Otomatis Tap Kartu E-Toll',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Intro Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Tahap 4 · Laboratorium Hardware & Generator Skenario AI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-fun">
              Eksplorasi Perangkat Keras & Bedah Alur Mandiri
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Kenali seluruh perangkat keras komputer, pelajari cara kerja konversi sinyal analog ke digital, 
              serta buat studi kasus baru apapun menggunakan kecerdasan artifisial!
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Left Hardware Catalog, Right Hardware Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Device Catalog */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls: Category Filter & Search */}
          <div className="bg-slate-850 p-4 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
              {[
                { id: 'all', label: 'Semua (15)' },
                { id: 'input', label: 'Input (Masukan)' },
                { id: 'process', label: 'Proses (CPU/RAM)' },
                { id: 'storage', label: 'Storage (Simpan)' },
                { id: 'output', label: 'Output (Keluaran)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFilter(tab.id as typeof selectedFilter);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari perangkat (misal: mouse, printer, cpu)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* List of hardware cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredHardware.map((item) => {
              const isSelected = selectedDevice.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDevice(item);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-400 ring-2 ring-indigo-400/30 shadow-md'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                      {renderHardwareIcon(item.iconName)}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(item.category)}`}>
                      {item.categoryLabel.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Device Inspector Card */}
        <div className="lg:col-span-5 bg-slate-850 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                {renderHardwareIcon(selectedDevice.iconName, 'w-6 h-6')}
              </div>
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(selectedDevice.category)}`}>
                  {selectedDevice.categoryLabel}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{selectedDevice.name}</h3>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fungsi & Peran Utama:
              </span>
              <p className="text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {selectedDevice.role}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Cara Kerja Konversi Data:
              </span>
              <div className="text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-slate-300">{selectedDevice.description}</p>
                <div className="flex items-center gap-1.5 text-indigo-300 font-mono text-[11px] pt-1 border-t border-slate-800">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedDevice.analogOrDigital}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Contoh Perangkat di Sekitar Kita:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDevice.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px]"
                  >
                    • {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Scenario Generator Studio */}
      <div className="bg-gradient-to-br from-slate-850 via-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-900/50 p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Scenario Studio (Kecerdasan Artifisial Generatif)</span>
            </div>
            <h2 className="text-xl font-bold text-white font-fun">
              Rancang Kasus IPO Baru: Uji Teknologi Apapun di Sekitarmu!
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Punya ide teknologi yang ingin dibedah alur IPO-nya? Ketik nama teknologi atau pilih inspirasi di bawah:
            </p>
          </div>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateScenario()}
            placeholder="Contoh: Lampu sensor gerak otomatis, Mesin ATM bank, Drone..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            onClick={() => handleGenerateScenario()}
            disabled={isGenerating || !customPrompt.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Menganalisis Alur...' : 'Bedah Alur IPO'}</span>
          </button>
        </div>

        {/* Sample chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400">Atau coba inspirasi skenario ini:</span>
          <div className="flex flex-wrap gap-2">
            {sampleIdeas.map((idea, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomPrompt(idea);
                  handleGenerateScenario(idea);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
              >
                💡 {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Result display */}
        {generatedScenario && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/50 shadow-inner space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                  Hasil Analisis Siklus IPO
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{generatedScenario.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{generatedScenario.description}</p>
              </div>
              <span className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Analisis Tuntas</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              {/* Input */}
              <div className="p-3 rounded-xl bg-slate-950 border border-indigo-700/50 space-y-1">
                <div className="flex items-center gap-1 text-indigo-400 font-bold text-xs uppercase">
                  <span>1. INPUT</span>
                </div>
                <div className="font-semibold text-white">{generatedScenario.steps.input.name}</div>
                <p className="text-slate-400 text-[11px]">{generatedScenario.steps.input.detail}</p>
              </div>

              {/* Process */}
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-700/50 space-y-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs uppercase">
                  <span>2. PROSES</span>
                </div>
                <div className="font-semibold text-white">{generatedScenario.steps.process.name}</div>
                <p className="text-slate-400 text-[11px]">{generatedScenario.steps.process.detail}</p>
              </div>

              {/* Storage */}
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-700/50 space-y-1">
                <div className="flex items-center gap-1 text-cyan-400 font-bold text-xs uppercase">
                  <span>STORAGE</span>
                </div>
                <div className="font-semibold text-white">
                  {generatedScenario.steps.storage?.name || 'Memori Data'}
                </div>
                <p className="text-slate-400 text-[11px]">
                  {generatedScenario.steps.storage?.detail || 'Menyimpan riwayat data aktivitas sistem.'}
                </p>
              </div>

              {/* Output */}
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-700/50 space-y-1">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs uppercase">
                  <span>3. OUTPUT</span>
                </div>
                <div className="font-semibold text-white">{generatedScenario.steps.output.name}</div>
                <p className="text-slate-400 text-[11px]">{generatedScenario.steps.output.detail}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Kesimpulan Alur:</strong> {generatedScenario.story}</span>
            </div>
          </div>
        )}
      </div>

      {/* Advance to next */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
        <div>
          <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Tahap Pembelajaran Terakhir</div>
          <p className="text-xs text-slate-300">
            Siap menguji pemahamanmu dan meraih Sertifikat Kelulusan Ahli Siklus IPO?
          </p>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition whitespace-nowrap"
        >
          <span>Masuk ke Tahap 4: Kuis Formatif & Sertifikat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
