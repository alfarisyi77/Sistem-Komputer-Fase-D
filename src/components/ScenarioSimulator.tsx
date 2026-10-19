import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  FileText, 
  Camera, 
  Headphones, 
  Gamepad2, 
  Keyboard, 
  Mouse, 
  Mic, 
  ScanLine, 
  Cpu, 
  CircuitBoard, 
  MonitorPlay, 
  HardDrive, 
  Save, 
  Monitor, 
  Printer, 
  Volume2, 
  Tv, 
  Users,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCENARIO_CASES } from '../data/ipoContent';
import { HardwareItem, ComponentCategory } from '../types/ipo';
import { sound } from '../utils/sound';

interface ScenarioSimulatorProps {
  onCompleteCase: (caseId: string) => void;
  onNextPhase: () => void;
}

// Icon mapper helper
const renderHardwareIcon = (iconName: string, className = "w-4 h-4") => {
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

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  onCompleteCase,
  onNextPhase,
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const currentCase = SCENARIO_CASES[selectedCaseIndex];

  // Slots state: which hardware items are assigned to which category
  const [slots, setSlots] = useState<{
    input: HardwareItem[];
    process: HardwareItem[];
    storage: HardwareItem[];
    output: HardwareItem[];
  }>({
    input: [],
    process: [],
    storage: [],
    output: [],
  });

  const [activeItem, setActiveItem] = useState<HardwareItem | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    detail?: string;
  } | null>(null);

  const [isSimulatingFlow, setIsSimulatingFlow] = useState(false);
  const [simulationStep, setSimulationStep] = useState<ComponentCategory | null>(null);
  const [completedCases, setCompletedCases] = useState<Record<string, boolean>>({});

  // Reset slots when changing case
  const handleSelectCase = (index: number) => {
    sound.playClick();
    setSelectedCaseIndex(index);
    setSlots({ input: [], process: [], storage: [], output: [] });
    setActiveItem(null);
    setFeedback(null);
    setIsSimulatingFlow(false);
    setSimulationStep(null);
  };

  // Check if item is already in any slot
  const isItemAssigned = (itemId: string) => {
    return (
      slots.input.some(i => i.id === itemId) ||
      slots.process.some(i => i.id === itemId) ||
      slots.storage.some(i => i.id === itemId) ||
      slots.output.some(i => i.id === itemId)
    );
  };

  // Assign item to a category slot with immediate pedagogical diagnostics
  const handleAssignToCategory = (targetCategory: ComponentCategory) => {
    if (!activeItem) return;

    sound.playClick();
    const item = activeItem;

    // Is this item's natural category matching the target slot?
    if (item.category !== targetCategory) {
      sound.playError();
      let errorReason = '';
      if (item.category === 'output' && targetCategory === 'input') {
        errorReason = `Kurang tepat! ${item.name} bertugas mengeluarkan/menyajikan hasil data olahan dari komputer, bukan memasukkan instruksi baru. Jadi ${item.name} termasuk perangkat OUTPUT (Keluaran). Coba lagi ya!`;
      } else if (item.category === 'input' && targetCategory === 'output') {
        errorReason = `Kurang tepat! ${item.name} digunakan oleh manusia untuk memasukkan sinyal/perintah data ke dalam komputer, bukan menampilkan hasil jadi. Jadi ${item.name} adalah perangkat INPUT (Masukan)!`;
      } else if (item.category === 'process') {
        errorReason = `Kurang tepat! ${item.name} adalah unit pemroses kalkulasi/data di dalam mesin (PROSES), bukan perangkat masukan ataupun keluaran.`;
      } else if (item.category === 'storage') {
        errorReason = `Kurang tepat! ${item.name} berfungsi mengarsipkan file secara permanen (STORAGE / Penyimpanan Sekunder).`;
      } else {
        errorReason = `Kurang tepat! ${item.name} sebenarnya termasuk dalam kategori ${item.categoryLabel}. Perhatikan kembali arah aliran datanya!`;
      }

      setFeedback({
        type: 'error',
        message: 'Posisi Belum Tepat!',
        detail: errorReason,
      });
      return;
    }

    // Is it relevant to this scenario?
    const validInScenario =
      currentCase.expectedSolution[targetCategory]?.includes(item.id);

    if (!validInScenario) {
      sound.playError();
      setFeedback({
        type: 'info',
        message: `${item.name} memang benar perangkat ${item.categoryLabel}, namun tidak diperlukan dalam skenario "${currentCase.title}". Coba cari perangkat lain yang lebih relevan!`,
      });
      return;
    }

    // Correct placement!
    sound.playSuccess();
    setSlots(prev => ({
      ...prev,
      [targetCategory]: [...prev[targetCategory], item],
    }));

    setFeedback({
      type: 'success',
      message: 'Penempatan Tepat Sekali! 🎉',
      detail: `${item.name} berhasil ditempatkan di slot ${item.categoryLabel.toUpperCase()}. ${item.role}`,
    });

    setActiveItem(null);
  };

  const handleRemoveFromSlot = (category: ComponentCategory, itemId: string) => {
    sound.playClick();
    setSlots(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i.id !== itemId),
    }));
    setFeedback(null);
  };

  // Verify all slots for full case completion
  const checkCaseCompleteness = () => {
    const hasInput = slots.input.length > 0;
    const hasProcess = slots.process.length > 0;
    const hasOutput = slots.output.length > 0;
    return hasInput && hasProcess && hasOutput;
  };

  const isCaseCompleted = checkCaseCompleteness();

  // Run the animated pipeline simulation
  const handleRunSimulation = () => {
    if (!isCaseCompleted) return;
    sound.playProcessPulse();
    setIsSimulatingFlow(true);
    setSimulationStep('input');

    setTimeout(() => {
      sound.playProcessPulse();
      setSimulationStep('process');
    }, 1200);

    setTimeout(() => {
      sound.playProcessPulse();
      setSimulationStep('storage');
    }, 2400);

    setTimeout(() => {
      sound.playSuccess();
      setSimulationStep('output');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      setCompletedCases(prev => ({ ...prev, [currentCase.id]: true }));
      onCompleteCase(currentCase.id);
    }, 3600);
  };

  const handleResetSlots = () => {
    sound.playClick();
    setSlots({ input: [], process: [], storage: [], output: [] });
    setActiveItem(null);
    setFeedback(null);
    setIsSimulatingFlow(false);
    setSimulationStep(null);
  };

  const scenarioIcons = [
    { id: 'case-typing-doc', icon: FileText },
    { id: 'case-photo-filter', icon: Camera },
    { id: 'case-music-stream', icon: Headphones },
    { id: 'case-game-controller', icon: Gamepad2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Tahap 2 & 3 · Simulasi Alur Kerja Komputer & Umpan Balik Logika</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-fun">
              Studi Kasus Digital: Pasang Komponen Sesuai Siklus IPO
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Pilih satu skenario nyata, lalu bantu sistem merakit alur komputasi dengan memasukkan 
              perangkat keras ke kotak <strong className="text-indigo-400">INPUT</strong>, 
              <strong className="text-amber-400"> PROSES</strong>, 
              <strong className="text-cyan-400"> STORAGE</strong>, dan 
              <strong className="text-emerald-400"> OUTPUT</strong>!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-700/40 p-2.5 rounded-xl text-xs text-indigo-200">
            <Users className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Mode Kolaboratif: Diskusikan bersama teman sebangkumu (*peer-work*)!</span>
          </div>
        </div>

        {/* Case Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-slate-700/80">
          {SCENARIO_CASES.map((item, idx) => {
            const Icon = scenarioIcons[idx]?.icon || FileText;
            const isSelected = selectedCaseIndex === idx;
            const isDone = completedCases[item.id];
            return (
              <button
                key={item.id}
                onClick={() => handleSelectCase(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg ring-1 ring-indigo-400'
                    : 'bg-slate-850 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                {isDone && (
                  <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Kasus {idx + 1}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate text-white">
                  {item.title.split(': ')[1] || item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Context Callout */}
      <div className="bg-slate-850 rounded-xl p-4 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              📖 Skenario Kasus:
            </span>
            <span className="text-xs text-slate-400 font-mono">({currentCase.realLifeContext})</span>
          </div>
          <p className="text-sm text-slate-200 font-medium">"{currentCase.story}"</p>
        </div>

        <button
          onClick={handleResetSlots}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Kotak</span>
        </button>
      </div>

      {/* The 4 Slot Containers (Input, Process, Storage, Output) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Slot 1: Input */}
        <div
          onClick={() => activeItem && handleAssignToCategory('input')}
          className={`p-4 rounded-2xl border transition-all flex flex-col min-h-[200px] cursor-pointer ${
            simulationStep === 'input'
              ? 'ring-4 ring-indigo-400 bg-indigo-950/60 shadow-xl'
              : activeItem
              ? 'hover:border-indigo-400 hover:bg-indigo-950/20 bg-slate-900 border-indigo-500/50'
              : 'bg-slate-900 border-indigo-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold text-indigo-400 tracking-wider">INPUT</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Masukan Data</span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Perangkat yang memasukkan sinyal/perintah awal dari Rani/pengguna.
          </p>

          {/* Placed Items */}
          <div className="space-y-2 flex-1">
            {slots.input.map(item => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-xs text-indigo-200 flex items-center justify-between shadow-sm animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  {renderHardwareIcon(item.iconName, 'w-4 h-4 text-indigo-300')}
                  <span className="font-semibold">{item.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromSlot('input', item.id);
                  }}
                  className="p-1 hover:text-white text-slate-400 rounded"
                  title="Hapus"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {slots.input.length === 0 && (
              <div className="h-24 border-2 border-dashed border-indigo-800/40 rounded-xl flex flex-col items-center justify-center text-center p-3 text-slate-500 text-xs">
                {activeItem ? (
                  <span className="text-indigo-300 font-semibold animate-pulse">
                    Klik di sini untuk menaruh "{activeItem.name}"
                  </span>
                ) : (
                  <span>Pilih perangkat masukan di bawah</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Slot 2: Process */}
        <div
          onClick={() => activeItem && handleAssignToCategory('process')}
          className={`p-4 rounded-2xl border transition-all flex flex-col min-h-[200px] cursor-pointer ${
            simulationStep === 'process'
              ? 'ring-4 ring-amber-400 bg-amber-950/60 shadow-xl'
              : activeItem
              ? 'hover:border-amber-400 hover:bg-amber-950/20 bg-slate-900 border-amber-500/50'
              : 'bg-slate-900 border-amber-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold text-amber-400 tracking-wider">PROSES</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Otak / CPU / RAM</span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Komponen yang mengolah data biner & instruksi matematika/logika.
          </p>

          <div className="space-y-2 flex-1">
            {slots.process.map(item => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-amber-950/80 border border-amber-700/60 text-xs text-amber-200 flex items-center justify-between shadow-sm animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  {renderHardwareIcon(item.iconName, 'w-4 h-4 text-amber-300')}
                  <span className="font-semibold">{item.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromSlot('process', item.id);
                  }}
                  className="p-1 hover:text-white text-slate-400 rounded"
                  title="Hapus"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {slots.process.length === 0 && (
              <div className="h-24 border-2 border-dashed border-amber-800/40 rounded-xl flex flex-col items-center justify-center text-center p-3 text-slate-500 text-xs">
                {activeItem ? (
                  <span className="text-amber-300 font-semibold animate-pulse">
                    Klik di sini untuk menaruh "{activeItem.name}"
                  </span>
                ) : (
                  <span>Pilih komponen pengolah di bawah</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Slot 3: Storage */}
        <div
          onClick={() => activeItem && handleAssignToCategory('storage')}
          className={`p-4 rounded-2xl border transition-all flex flex-col min-h-[200px] cursor-pointer ${
            simulationStep === 'storage'
              ? 'ring-4 ring-cyan-400 bg-cyan-950/60 shadow-xl'
              : activeItem
              ? 'hover:border-cyan-400 hover:bg-cyan-950/20 bg-slate-900 border-cyan-500/50'
              : 'bg-slate-900 border-cyan-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                +
              </span>
              <span className="text-xs font-bold text-cyan-400 tracking-wider">STORAGE</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Penyimpanan Sekunder</span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Menyimpan file secara permanen agar tidak hilang saat komputer mati.
          </p>

          <div className="space-y-2 flex-1">
            {slots.storage.map(item => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-xs text-cyan-200 flex items-center justify-between shadow-sm animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  {renderHardwareIcon(item.iconName, 'w-4 h-4 text-cyan-300')}
                  <span className="font-semibold">{item.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromSlot('storage', item.id);
                  }}
                  className="p-1 hover:text-white text-slate-400 rounded"
                  title="Hapus"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {slots.storage.length === 0 && (
              <div className="h-24 border-2 border-dashed border-cyan-800/40 rounded-xl flex flex-col items-center justify-center text-center p-3 text-slate-500 text-xs">
                {activeItem ? (
                  <span className="text-cyan-300 font-semibold animate-pulse">
                    Klik di sini untuk menaruh "{activeItem.name}"
                  </span>
                ) : (
                  <span>Pilih media simpan permanen (Opsional/Pendukung)</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Slot 4: Output */}
        <div
          onClick={() => activeItem && handleAssignToCategory('output')}
          className={`p-4 rounded-2xl border transition-all flex flex-col min-h-[200px] cursor-pointer ${
            simulationStep === 'output'
              ? 'ring-4 ring-emerald-400 bg-emerald-950/60 shadow-xl'
              : activeItem
              ? 'hover:border-emerald-400 hover:bg-emerald-950/20 bg-slate-900 border-emerald-500/50'
              : 'bg-slate-900 border-emerald-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-bold text-emerald-400 tracking-wider">OUTPUT</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Hasil Keluaran</span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Menyajikan tampilan visual, cetakan fisik, atau audio bagi pengguna.
          </p>

          <div className="space-y-2 flex-1">
            {slots.output.map(item => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200 flex items-center justify-between shadow-sm animate-in fade-in"
              >
                <div className="flex items-center gap-2">
                  {renderHardwareIcon(item.iconName, 'w-4 h-4 text-emerald-300')}
                  <span className="font-semibold">{item.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromSlot('output', item.id);
                  }}
                  className="p-1 hover:text-white text-slate-400 rounded"
                  title="Hapus"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {slots.output.length === 0 && (
              <div className="h-24 border-2 border-dashed border-emerald-800/40 rounded-xl flex flex-col items-center justify-center text-center p-3 text-slate-500 text-xs">
                {activeItem ? (
                  <span className="text-emerald-300 font-semibold animate-pulse">
                    Klik di sini untuk menaruh "{activeItem.name}"
                  </span>
                ) : (
                  <span>Pilih perangkat hasil akhir di bawah</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Available Items Deck */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Daftar Perangkat yang Tersedia:</span>
            </h3>
            <p className="text-xs text-slate-300">
              Klik salah satu perangkat di bawah, lalu klik kotak (Input / Proses / Storage / Output) di atas untuk menempatkannya:
            </p>
          </div>
          {activeItem && (
            <div className="flex items-center gap-2 bg-indigo-900/60 border border-indigo-500/50 px-3 py-1.5 rounded-xl text-xs text-indigo-200 animate-pulse">
              <span>Perangkat Terpilih: <strong>{activeItem.name}</strong></span>
              <button
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-white ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {currentCase.availableItems.map((item) => {
            const isAssigned = isItemAssigned(item.id);
            const isSelected = activeItem?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveItem(isSelected ? null : item);
                }}
                disabled={isAssigned}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  isAssigned
                    ? 'bg-slate-900/40 border-slate-800 opacity-40 cursor-not-allowed'
                    : isSelected
                    ? 'bg-indigo-600/40 border-indigo-400 ring-2 ring-indigo-400 text-white shadow-md'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {renderHardwareIcon(item.iconName, 'w-4 h-4 text-indigo-300')}
                  </div>
                  {isAssigned && (
                    <span className="text-[10px] font-bold text-emerald-400">✓ Terpasang</span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white leading-tight">
                  {item.name}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">
                  {item.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Pedagogical Feedback Box (Tahap 3) */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs animate-in slide-in-from-top-2 duration-300 flex items-start gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
              : feedback.type === 'error'
              ? 'bg-rose-950/70 border-rose-500 text-rose-200'
              : 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200'
          }`}
        >
          {feedback.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {feedback.type === 'error' && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {feedback.type === 'info' && <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}
          <div className="space-y-1">
            <div className="font-bold text-sm">{feedback.message}</div>
            {feedback.detail && <p className="leading-relaxed">{feedback.detail}</p>}
          </div>
        </div>
      )}

      {/* Simulation Trigger & Pipeline Visualizer */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-fun">
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Simulasi Aliran Bus Data Komputer (IPO Pipeline)</span>
            </h3>
            <p className="text-xs text-slate-400">
              {isCaseCompleted
                ? 'Semua komponen penting sudah terpasang! Klik tombol uji simulasi untuk melihat jalannya data biner.'
                : 'Lengkapi minimal 1 perangkat di Input, Proses, dan Output untuk menjalankan simulasi aliran data.'}
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={!isCaseCompleted || isSimulatingFlow}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
              isCaseCompleted && !isSimulatingFlow
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 animate-bounce'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulatingFlow ? 'Data Sedang Mengalir...' : 'Uji Jalannya Data (Run IPO)'}</span>
          </button>
        </div>

        {/* Visual Pipeline Animation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden">
          {/* Animated data bus beam */}
          {isSimulatingFlow && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-flow-packet pointer-events-none" />
          )}

          {/* Node 1 */}
          <div className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
            simulationStep === 'input'
              ? 'bg-indigo-900/80 border-indigo-400 text-white ring-2 ring-indigo-400 scale-105'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <span className="text-xs font-mono font-bold text-indigo-400">1. INPUT</span>
            <span className="text-xs">Sinyal Masuk</span>
          </div>

          <span className="text-slate-600 font-bold hidden md:inline">➔</span>

          {/* Node 2 */}
          <div className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
            simulationStep === 'process'
              ? 'bg-amber-900/80 border-amber-400 text-white ring-2 ring-amber-400 scale-105'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <span className="text-xs font-mono font-bold text-amber-400">2. CPU PROSES</span>
            <span className="text-xs">Decode & Hitung</span>
          </div>

          <span className="text-slate-600 font-bold hidden md:inline">➔</span>

          {/* Node 3 */}
          <div className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
            simulationStep === 'storage'
              ? 'bg-cyan-900/80 border-cyan-400 text-white ring-2 ring-cyan-400 scale-105'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <span className="text-xs font-mono font-bold text-cyan-400">STORAGE</span>
            <span className="text-xs">Simpan File</span>
          </div>

          <span className="text-slate-600 font-bold hidden md:inline">➔</span>

          {/* Node 4 */}
          <div className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
            simulationStep === 'output'
              ? 'bg-emerald-900/80 border-emerald-400 text-white ring-2 ring-emerald-400 scale-105'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <span className="text-xs font-mono font-bold text-emerald-400">3. OUTPUT</span>
            <span className="text-xs">Sajian Manusia</span>
          </div>
        </div>

        {/* Narrative result after pipeline */}
        {completedCases[currentCase.id] && (
          <div className="p-4 rounded-xl bg-slate-850 border border-emerald-500/40 text-xs text-slate-200 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Analisis Lengkap Alur Komputasi "{currentCase.title}" Berhasil Dipelajari!</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded bg-slate-900">
                <strong className="text-indigo-400">Input:</strong> {currentCase.stepExplainer.input}
              </div>
              <div className="p-2 rounded bg-slate-900">
                <strong className="text-amber-400">Proses:</strong> {currentCase.stepExplainer.process}
              </div>
              <div className="p-2 rounded bg-slate-900">
                <strong className="text-cyan-400">Storage:</strong> {currentCase.stepExplainer.storage}
              </div>
              <div className="p-2 rounded bg-slate-900">
                <strong className="text-emerald-400">Output:</strong> {currentCase.stepExplainer.output}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advance to next phase */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
        <div>
          <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Langkah Berikutnya</div>
          <p className="text-xs text-slate-300">
            Ingin mengeksplorasi seluruh komponen perangkat keras di Lab Sandbox & membuat skenario custom?
          </p>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onNextPhase();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition whitespace-nowrap"
        >
          <span>Buka Tahap 3: Lab Hardware & AI Sandbox</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
