import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Cpu, Award, FileSpreadsheet, PlayCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: 'analogy' | 'scenarios' | 'lab' | 'quiz' | 'teacher';
  setActiveTab: (tab: 'analogy' | 'scenarios' | 'lab' | 'quiz' | 'teacher') => void;
  onOpenRoboTutor: () => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRoboTutor,
  progressPercent,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  const navItems = [
    { id: 'analogy' as const, label: '1. Apersepsi Blender', icon: PlayCircle, subtitle: 'Analogi Dasar IPO' },
    { id: 'scenarios' as const, label: '2. Simulasi Kasus', icon: Cpu, subtitle: '4 Studi Kasus Nyata' },
    { id: 'lab' as const, label: '3. Lab Hardware', icon: Sparkles, subtitle: 'Katalog & AI Studio' },
    { id: 'quiz' as const, label: '4. Kuis & Sertifikat', icon: Award, subtitle: 'Asesmen Formatif' },
    { id: 'teacher' as const, label: '5. LKPD & Guru', icon: FileSpreadsheet, subtitle: 'Modul & Lembar Kerja' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top micro bar for Kurikulum info */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/30 px-4 py-1 text-xs text-indigo-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-medium">Informatika SMP Kelas 7 · Kurikulum Merdeka (Fase D)</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Topik: Sistem Komputer & Siklus IPO</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-[11px] text-slate-400">Progres Misi:</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-fun">
                Kompu<span className="text-indigo-400">Sim</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                IPO Land
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Petualangan Interaktif Siklus Input-Proses-Output
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions (Audio + AI Robo Tutor) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRoboTutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition shadow-sm hover:shadow-amber-500/10"
            title="Tanya Robo-IPO Asisten Belajar"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Tanya Robo-IPO</span>
          </button>

          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition ${
              isMuted
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50 hover:bg-indigo-900/40'
            }`}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Mobile nav pills row */}
      <div className="md:hidden flex items-center gap-1 px-3 py-2 overflow-x-auto bg-slate-900 border-t border-slate-800/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/60 text-slate-300 border border-slate-700/50'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label.split('. ')[1]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
