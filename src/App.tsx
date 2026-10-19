import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BlenderAnalogy } from './components/BlenderAnalogy';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { HardwareLab } from './components/HardwareLab';
import { QuizAssessment } from './components/QuizAssessment';
import { TeacherDashboard } from './components/TeacherDashboard';
import { RoboTutorModal } from './components/RoboTutorModal';
import { Sparkles, Bot, Heart, Layers, BookOpen, Compass } from 'lucide-react';
import { sound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analogy' | 'scenarios' | 'lab' | 'quiz' | 'teacher'>('analogy');
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Progress tracking
  const [isAnalogyCompleted, setIsAnalogyCompleted] = useState(false);
  const [completedCasesCount, setCompletedCasesCount] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Calculate overall mission progress
  const calculateProgress = () => {
    let progress = 0;
    if (isAnalogyCompleted) progress += 25;
    progress += Math.min(completedCasesCount * 10, 40); // up to 40%
    if (quizScore !== null) progress += 35; // up to 100%
    return Math.min(progress, 100);
  };

  const handleCaseComplete = (_caseId: string) => {
    setCompletedCasesCount(prev => prev + 1);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const progressPercent = calculateProgress();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRoboTutor={() => {
          sound.playClick();
          setIsTutorOpen(true);
        }}
        progressPercent={progressPercent}
      />

      {/* Main Container */}
      <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
        {activeTab === 'analogy' && (
          <BlenderAnalogy
            onCompletePhase={() => setIsAnalogyCompleted(true)}
            onNext={() => setActiveTab('scenarios')}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioSimulator
            onCompleteCase={handleCaseComplete}
            onNextPhase={() => setActiveTab('lab')}
          />
        )}

        {activeTab === 'lab' && (
          <HardwareLab
            onNext={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizAssessment
            onQuizCompleted={handleQuizComplete}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard />
        )}
      </main>

      {/* Floating Robo-IPO Tutor trigger button */}
      <button
        onClick={() => {
          sound.playClick();
          setIsTutorOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-2.5 font-fun text-xs font-bold border border-white/20 group print:hidden"
        title="Buka Asisten Belajar Robo-IPO"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </div>
        <span className="hidden sm:inline">Tanya Robo-IPO!</span>
      </button>

      {/* Robo-IPO Tutor Modal */}
      <RoboTutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        activeContext={activeTab}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 px-4 text-xs text-slate-400 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-fun">KompuSim: Adventure in IPO Land</span>
            <span>·</span>
            <span>Media Pembelajaran Interaktif (MPI) Informatika Kelas VII Fase D</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Kurikulum Merdeka</span>
            <span>·</span>
            <span>Siklus Input - Proses - Storage - Output</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-400">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk Pendidikan Indonesia
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
