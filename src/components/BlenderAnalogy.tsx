import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Layers, Cpu, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface BlenderAnalogyProps {
  onCompletePhase: () => void;
  onNext: () => void;
}

type FruitType = 'apple' | 'orange' | 'strawberry';

export const BlenderAnalogy: React.FC<BlenderAnalogyProps> = ({ onCompletePhase, onNext }) => {
  const [selectedFruit, setSelectedFruit] = useState<FruitType | null>(null);
  const [blenderState, setBlenderState] = useState<'empty' | 'fruit_in' | 'blending' | 'blended' | 'poured'>('empty');
  const [activeTabMapping, setActiveTabMapping] = useState<'blender' | 'comparison'>('blender');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Fruit configurations
  const fruits = [
    { id: 'apple' as const, name: 'Apel Segar', color: '#ef4444', emoji: '🍎', juiceColor: 'bg-red-400' },
    { id: 'orange' as const, name: 'Jeruk Manis', color: '#f97316', emoji: '🍊', juiceColor: 'bg-orange-400' },
    { id: 'strawberry' as const, name: 'Stroberi Merah', color: '#f43f5e', emoji: '🍓', juiceColor: 'bg-rose-400' },
  ];

  const currentFruitObj = fruits.find(f => f.id === selectedFruit) || fruits[0];

  const handleAddFruit = (fruit: FruitType) => {
    sound.playClick();
    setSelectedFruit(fruit);
    setBlenderState('fruit_in');
  };

  const handleStartBlender = () => {
    if (blenderState !== 'fruit_in') return;
    sound.playBlender();
    setBlenderState('blending');

    setTimeout(() => {
      sound.playSuccess();
      setBlenderState('blended');
    }, 2000);
  };

  const handlePourJuice = () => {
    if (blenderState !== 'blended') return;
    sound.playClick();
    setBlenderState('poured');
    sound.playSuccess();
    onCompletePhase();
  };

  const handleReset = () => {
    sound.playClick();
    setBlenderState('empty');
    setSelectedFruit(null);
  };

  const handleAnswerQuiz = (index: number) => {
    sound.playClick();
    setQuizAnswer(index);
    setShowExplanation(true);
    if (index === 1) {
      sound.playSuccess();
      onCompletePhase();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Intro Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Tahap 1 · Apersepsi & Analogi Konseptual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-fun">
              Bagaimana Komputer Bekerja? Analogi Mesin Jus Buah
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl">
              Sebelum membedah komputer yang rumit, bayangkan sebuah blender di dapur! 
              Siklus kerja komputer sama persis dengan proses membuat jus buah: ada 
              <strong className="text-indigo-400"> Masukan (Input)</strong>, 
              <strong className="text-amber-400"> Pengolahan (Proses)</strong>, dan 
              <strong className="text-emerald-400"> Hasil Jadi (Output)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTabMapping(activeTabMapping === 'blender' ? 'comparison' : 'blender');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              <Layers className="w-4 h-4" />
              <span>{activeTabMapping === 'blender' ? 'Lihat Tabel Komparasi Komputer' : 'Kembali ke Simulasi Blender'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {activeTabMapping === 'blender' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Step guides & buttons */}
          <div className="lg:col-span-5 space-y-4">
            {/* Step 1: Input */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                blenderState === 'empty'
                  ? 'bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/20'
                  : 'bg-slate-800/60 border-slate-700/60 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 inline-flex items-center justify-center text-xs">1</span>
                  Langkah 1: INPUT (Bahan Masukan)
                </span>
                {blenderState !== 'empty' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h3 className="text-base font-bold text-white mb-1">Pilih Buah Segar</h3>
              <p className="text-xs text-slate-300 mb-3">
                Buah segar adalah <strong>bahan mentah</strong>. Klik buah di bawah untuk memasukkannya ke dalam corong blender:
              </p>

              <div className="grid grid-cols-3 gap-2">
                {fruits.map((fruit) => (
                  <button
                    key={fruit.id}
                    onClick={() => handleAddFruit(fruit.id)}
                    disabled={blenderState === 'blending'}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all text-xs font-medium ${
                      selectedFruit === fruit.id
                        ? 'bg-indigo-600/40 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-750/70 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{fruit.emoji}</span>
                    <span>{fruit.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Process */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                blenderState === 'fruit_in' || blenderState === 'blending'
                  ? 'bg-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/20'
                  : 'bg-slate-800/60 border-slate-700/60 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 inline-flex items-center justify-center text-xs">2</span>
                  Langkah 2: PROSES (Pengolahan)
                </span>
                {(blenderState === 'blended' || blenderState === 'poured') && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h3 className="text-base font-bold text-white mb-1">Nyalakan Mesin Pemutar</h3>
              <p className="text-xs text-slate-300 mb-3">
                Pisau blender berputar kencang memotong dan menghancurkan serat buah menjadi cairan halus.
              </p>

              <button
                onClick={handleStartBlender}
                disabled={blenderState !== 'fruit_in'}
                className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                  blenderState === 'fruit_in'
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 animate-pulse'
                    : blenderState === 'blending'
                    ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {blenderState === 'blending' ? 'Pisau Blender Berputar...' : 'Tekan Tombol Putar (Proses Data)'}
                </span>
              </button>
            </div>

            {/* Step 3: Output */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                blenderState === 'blended'
                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-2 ring-emerald-500/20'
                  : 'bg-slate-800/60 border-slate-700/60 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 inline-flex items-center justify-center text-xs">3</span>
                  Langkah 3: OUTPUT (Hasil Jadi)
                </span>
                {blenderState === 'poured' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h3 className="text-base font-bold text-white mb-1">Tuang Jus ke Gelas</h3>
              <p className="text-xs text-slate-300 mb-3">
                Jus segar kini siap diminum dan dinikmati oleh orang!
              </p>

              <button
                onClick={handlePourJuice}
                disabled={blenderState !== 'blended'}
                className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                  blenderState === 'blended'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : blenderState === 'poured'
                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{blenderState === 'poured' ? '✓ Jus Sudah Dituang ke Gelas!' : 'Tuang Jus Buah (Keluarkan Output)'}</span>
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang Analogi Blender</span>
            </button>
          </div>

          {/* Right: Visual Canvas & Machine graphics */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[440px] relative shadow-inner overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

            {/* Stage Badge indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status Mesin:</span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  blenderState === 'empty'
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : blenderState === 'fruit_in'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-700 animate-pulse'
                    : blenderState === 'blending'
                    ? 'bg-amber-950 text-amber-300 border-amber-700 animate-bounce'
                    : blenderState === 'blended'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                }`}
              >
                {blenderState === 'empty' && 'Menunggu Input Buah'}
                {blenderState === 'fruit_in' && 'Input Diterima · Siap Diproses'}
                {blenderState === 'blending' && 'Sedang Memproses Data (Blending)'}
                {blenderState === 'blended' && 'Proses Selesai · Siap Dikeluarkan'}
                {blenderState === 'poured' && 'Output Selesai Disajikan! 🎉'}
              </span>
            </div>

            {/* The Interactive Visual Representation */}
            <div className="relative w-full max-w-md h-80 flex items-center justify-around z-10">
              {/* Blender Unit */}
              <div className="flex flex-col items-center relative">
                {/* Blender Lid */}
                <div className="w-24 h-4 bg-slate-700 rounded-t-lg border-b-2 border-slate-600 shadow" />

                {/* Blender Glass Jar */}
                <div className="w-32 h-44 bg-cyan-950/30 border-2 border-cyan-500/40 rounded-b-xl relative flex flex-col justify-end p-2 overflow-hidden backdrop-blur-sm shadow-lg shadow-cyan-500/5">
                  {/* Measurement marks */}
                  <div className="absolute top-2 left-1.5 space-y-2 text-[9px] font-mono text-cyan-400/60 select-none">
                    <div>- 500ml</div>
                    <div>- 350ml</div>
                    <div>- 200ml</div>
                  </div>

                  {/* Inside: Fruits or Juice */}
                  {blenderState === 'fruit_in' && (
                    <div className="flex items-center justify-center animate-bounce mb-3">
                      <span className="text-5xl">{currentFruitObj.emoji}</span>
                    </div>
                  )}

                  {blenderState === 'blending' && (
                    <div className="w-full h-28 bg-gradient-to-t from-amber-500/80 to-orange-400/70 rounded-b-lg flex items-center justify-center animate-pulse relative overflow-hidden">
                      <div className="text-3xl animate-spin-slow">🌀</div>
                      <div className="absolute inset-0 bg-white/20 animate-ping opacity-25" />
                    </div>
                  )}

                  {blenderState === 'blended' && (
                    <div className={`w-full h-28 ${currentFruitObj.juiceColor} rounded-b-lg flex items-center justify-center shadow-inner`}>
                      <span className="text-xs font-bold text-slate-900 bg-white/70 px-2 py-0.5 rounded-full">
                        Jus Halus Siap Tuang
                      </span>
                    </div>
                  )}

                  {blenderState === 'poured' && (
                    <div className="w-full h-6 bg-slate-850/60 rounded-b-lg flex items-center justify-center">
                      <span className="text-[10px] text-slate-400">Blender Kosong</span>
                    </div>
                  )}

                  {/* Blades at bottom */}
                  <div className="w-full flex items-center justify-center pt-1 border-t border-cyan-800/40">
                    <div className={`w-12 h-3 bg-slate-400 rounded-full flex items-center justify-center ${blenderState === 'blending' ? 'animate-spin' : ''}`}>
                      <div className="w-2 h-2 bg-slate-700 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Blender Motor Base (CPU Analogy) */}
                <div className="w-36 h-20 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-2xl border border-slate-600 p-2 flex flex-col items-center justify-between shadow-xl">
                  <div className="w-full flex items-center justify-between px-2 text-[10px] font-mono text-slate-300">
                    <span>MOTOR BLENDER</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-red-600 border border-red-400 flex items-center justify-center shadow-inner">
                    <span className="text-[8px] font-bold text-white">ON</span>
                  </div>
                  <span className="text-[10px] text-amber-300 font-bold tracking-wider">
                    = PROSES (CPU)
                  </span>
                </div>
              </div>

              {/* Data Flow Arrow */}
              <div className="flex flex-col items-center gap-1 text-slate-500">
                <span className="text-[11px] font-semibold text-slate-400">Dituang</span>
                <ArrowRight className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>

              {/* Glass / Output Unit */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-36 border-2 border-emerald-500/50 rounded-b-2xl relative flex flex-col justify-end p-1.5 backdrop-blur-sm bg-slate-900/60 overflow-hidden shadow-lg shadow-emerald-500/10">
                  {blenderState === 'poured' ? (
                    <div className={`w-full h-24 ${currentFruitObj.juiceColor} rounded-b-xl flex flex-col items-center justify-center relative shadow-inner animate-in fade-in duration-500`}>
                      <span className="text-2xl">🥤</span>
                      <span className="text-[10px] font-bold text-slate-900 bg-white/80 px-1.5 py-0.5 rounded">
                        Segar & Manis!
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 text-center p-2">
                      <span className="text-xs">Gelas Kosong</span>
                      <span className="text-[9px] text-slate-500">Menunggu Output</span>
                    </div>
                  )}
                </div>
                <div className="w-28 h-3 bg-slate-800 rounded-full mt-1 border border-slate-700" />
                <span className="text-[10px] text-emerald-400 font-bold tracking-wider mt-1">
                  = OUTPUT (Keluaran)
                </span>
              </div>
            </div>

            {/* Bottom summary note */}
            <div className="mt-4 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-xs text-center text-slate-300 max-w-md">
              💡 <strong>Kunci Utama:</strong> Tanpa buah (Input), mesin blender tidak punya bahan untuk diproses. 
              Tanpa putaran motor (Proses), buah tidak akan pernah menjadi jus (Output)!
            </div>
          </div>
        </div>
      ) : (
        /* Side by Side Mapping Table */
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-white font-fun">
              Perbandingan: Mesin Pembuat Jus vs Sistem Komputer Modern
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Setiap tahapan pada mesin jus memiliki padanan langsung dalam komponen komputer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Input Card */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-indigo-500/40 relative">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wide">INPUT (Masukan)</h3>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-200">
                  <span className="font-semibold text-slate-400 block text-[10px]">PADA MESIN JUS:</span>
                  Buah Apel, Jeruk, Es Batu, Gula pasir
                </div>
                <div className="p-2 rounded-lg bg-indigo-950/50 border border-indigo-800/60 text-indigo-200">
                  <span className="font-semibold text-indigo-400 block text-[10px]">PADA KOMPUTER:</span>
                  Keyboard, Mouse, Sensor Kamera, Mikrofon suara
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Bertugas memasukkan data mentah dari luar ke dalam sistem.
                </p>
              </div>
            </div>

            {/* Process Card */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-amber-500/40 relative">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">PROSES (Pengolahan)</h3>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-200">
                  <span className="font-semibold text-slate-400 block text-[10px]">PADA MESIN JUS:</span>
                  Pisau stainless berputar kencang & dinamo motor listrik
                </div>
                <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-200">
                  <span className="font-semibold text-amber-400 block text-[10px]">PADA KOMPUTER:</span>
                  CPU (Processor) sebagai otak & RAM untuk meja kerja cepat
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Mengeksekusi perhitungan dan mengubah data mentah menjadi bentuk baru.
                </p>
              </div>
            </div>

            {/* Storage Card */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-cyan-500/40 relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-3">
                +
              </div>
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">STORAGE (Simpan)</h3>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-200">
                  <span className="font-semibold text-slate-400 block text-[10px]">PADA MESIN JUS:</span>
                  Kulkas pendingin & botol kedap udara agar jus awet
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-800/60 text-cyan-200">
                  <span className="font-semibold text-cyan-400 block text-[10px]">PADA KOMPUTER:</span>
                  SSD, Harddisk, Flashdisk (data tidak hilang saat mati listrik)
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Menyimpan file secara permanen untuk dibuka lagi di kemudian hari.
                </p>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-emerald-500/40 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">OUTPUT (Keluaran)</h3>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-200">
                  <span className="font-semibold text-slate-400 block text-[10px]">PADA MESIN JUS:</span>
                  Segelas jus buah segar manis siap diminum
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-200">
                  <span className="font-semibold text-emerald-400 block text-[10px]">PADA KOMPUTER:</span>
                  Layar Monitor, Kertas Cetakan Printer, Suara Speaker
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Menyajikan hasil akhir olahan data yang bermanfaat bagi manusia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Checkpoint Formative Card */}
      <div className="bg-slate-850 rounded-2xl border border-slate-700/80 p-6 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Uji Pemahaman Kilat Apersepsi</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          Jika kamu memasukkan lembaran wortel ke dalam blender, lalu keluar segelas jus wortel:
          apakah peran dari "Pisau Blender yang Berputar"?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { text: 'Perangkat Input (Pemberi data masukan)', isCorrect: false },
            { text: 'Proses (Pengolahan bahan mentah jadi cairan)', isCorrect: true },
            { text: 'Output (Hasil akhir yang siap diminum)', isCorrect: false },
          ].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerQuiz(idx)}
              className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                quizAnswer === idx
                  ? option.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-750'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div
            className={`mt-4 p-4 rounded-xl border text-xs flex items-start gap-3 ${
              quizAnswer === 1
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
            }`}
          >
            {quizAnswer === 1 ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm mb-1">
                {quizAnswer === 1 ? 'Hebat, Jawabanmu Tepat Sekali!' : 'Belum Tepat, Yuk Cek Logikanya!'}
              </p>
              <p>
                Pisau blender bertindak sebagai <strong>PROSES</strong> (seperti halnya CPU pada komputer). 
                Pisau tidak menghasilkan bahan baru sendiri, melainkan mengolah wortel yang dimasukkan (Input) 
                menjadi bentuk cairan siap konsumsi (Output).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next Step Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-850 to-indigo-950/60 border border-indigo-700/40 shadow-lg">
        <div>
          <h4 className="text-base font-bold text-white font-fun">
            Sudah paham konsep dasar Input - Proses - Output?
          </h4>
          <p className="text-xs text-slate-300">
            Lanjut ke Tahap 2 untuk mencoba 4 simulasi komputer pada kasus nyata di kehidupan sehari-hari!
          </p>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs shadow-lg shadow-indigo-500/20 transition whitespace-nowrap"
        >
          <span>Masuk ke Tahap 2: Simulasi Kasus</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
