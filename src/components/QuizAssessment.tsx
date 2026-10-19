import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  HelpCircle, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  Share2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/ipoContent';
import { sound } from '../utils/sound';

interface QuizAssessmentProps {
  onQuizCompleted: (score: number) => void;
}

export const QuizAssessment: React.FC<QuizAssessmentProps> = ({ onQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Certificate custom fields
  const [studentName, setStudentName] = useState('Pelajar Informatika Hebat');
  const [schoolClass, setSchoolClass] = useState('Kelas 7 / Fase D');
  const [isEditingCertificate, setIsEditingCertificate] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const handleSubmitQuiz = () => {
    sound.playClick();
    setIsSubmitted(true);
    const finalScore = calculateScore();
    onQuizCompleted(finalScore);

    if (finalScore >= 70) {
      sound.playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sound.playError();
    }
  };

  const handleRetakeQuiz = () => {
    sound.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  const score = calculateScore();
  const isPassed = score >= 70;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Quiz Top Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Tahap 5 · Asesmen Formatif & Sertifikat Digital</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-fun">
              Uji Kemampuan Siklus Komputasi (IPO Quiz)
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Jawab 8 pertanyaan studi kasus di bawah ini untuk menguji pemahamanmu dan raih Sertifikat Kelulusan!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs">
            <span className="text-slate-400">Terjawab:</span>
            <span className="font-bold text-indigo-400">{answeredCount} dari {totalQuestions} Soal</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-5 border border-slate-700">
          <div
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {!isSubmitted ? (
        /* Question Card */
        <div className="bg-slate-850 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6 print:hidden">
          {/* Question Indicator */}
          <div className="flex items-center justify-between border-b border-slate-750 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs">
                {currentQuestionIndex + 1}
              </span>
              Soal {currentQuestionIndex + 1} dari {totalQuestions}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Kategori: {currentQuestion.categoryTarget.toUpperCase()}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
            {currentQuestion.scenarioContext && (
              <p className="text-xs text-slate-400 italic">
                {currentQuestion.scenarioContext}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQuestion.id, idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/40 text-white shadow-md'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-750">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={answeredCount < totalQuestions}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition ${
                  answeredCount === totalQuestions
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 animate-pulse'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kirim Jawaban & Lihat Hasil</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Review */
        <div className="space-y-8">
          {/* Result Score Banner */}
          <div className="bg-slate-850 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-xl text-center space-y-4 print:hidden">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hasil Asesmen Formatif
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-fun">
                Skor Kamu: <span className={isPassed ? 'text-emerald-400' : 'text-amber-400'}>{score}</span> / 100
              </h2>
              <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
                {isPassed
                  ? 'Selamat! Kamu telah melampaui Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) Informatika Fase D.'
                  : 'Tetap semangat! Kamu bisa meninjau pembahasan jawaban di bawah atau mengulang kuis untuk meraih nilai sempurna.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetakeQuiz}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>

              {isPassed && (
                <button
                  onClick={handlePrintCertificate}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Unduh Sertifikat</span>
                </button>
              )}
            </div>
          </div>

          {/* Certificate View (Styled for both UI & Print) */}
          {isPassed && (
            <div className="space-y-4">
              <div className="flex items-center justify-between print:hidden">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Pratinjau Sertifikat Kelulusan Petualang IPO</span>
                </h3>
                <button
                  onClick={() => setIsEditingCertificate(!isEditingCertificate)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  {isEditingCertificate ? 'Selesai Ubah Nama' : 'Ubah Nama & Kelas Siswa'}
                </button>
              </div>

              {isEditingCertificate && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 print:hidden">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nama Siswa / Kelompok:</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Kelas / Sekolah:</label>
                    <input
                      type="text"
                      value={schoolClass}
                      onChange={(e) => setSchoolClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* The Printable Certificate */}
              <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 text-slate-900 rounded-2xl border-8 border-double border-amber-600/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden print:p-6 print:border-4 print:shadow-none print:m-0">
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

                <div className="text-center space-y-4">
                  <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-widest uppercase">
                    Sertifikat Kelulusan Asesmen
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-fun">
                    KOMPUSIM: ADVENTURE IN IPO LAND
                  </h1>

                  <p className="text-xs text-slate-600 max-w-md mx-auto uppercase tracking-wider font-semibold">
                    Diberikan kepada peserta didik berprestasi:
                  </p>

                  <div className="border-b-2 border-slate-900/60 pb-2 max-w-lg mx-auto">
                    <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 font-fun">
                      {studentName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed">
                    Telah menyelesaikan seluruh rangkaian simulasi interaktif, analisis kasus, dan asesmen pemahaman materi
                    <strong className="text-slate-900"> Sistem Komputer: Siklus Input - Proses - Output (IPO)</strong> pada mata pelajaran 
                    Informatika Kelas VII / Fase D dengan perolehan nilai:
                  </p>

                  <div className="inline-flex items-center gap-3 bg-amber-100/80 px-6 py-2 rounded-xl border border-amber-300">
                    <span className="text-xs font-bold text-amber-900 uppercase">Nilai Akhir:</span>
                    <span className="text-2xl font-extrabold text-amber-700">{score} / 100</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">TUNTAS</span>
                  </div>

                  {/* Signatures & Verification */}
                  <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
                    <div>
                      <div className="h-10 flex items-center justify-center font-fun text-slate-400 italic">
                        {schoolClass}
                      </div>
                      <div className="border-t border-slate-400 pt-1 font-semibold">
                        Kelas / Satuan Pendidikan
                      </div>
                    </div>

                    <div>
                      <div className="h-10 flex items-center justify-center font-fun text-indigo-700 font-bold">
                        Robo-IPO Simulator
                      </div>
                      <div className="border-t border-slate-400 pt-1 font-semibold">
                        Guru / Pembimbing Informatika
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="bg-slate-850 rounded-2xl border border-slate-700 p-6 space-y-6 print:hidden">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Review Pembahasan Jawaban (8 Soal)</span>
            </h3>

            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'bg-slate-900/80 border-emerald-500/40'
                        : 'bg-slate-900/80 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> Benar
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-semibold shrink-0">
                          <XCircle className="w-4 h-4" /> Salah
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded bg-slate-950 text-slate-300">
                        <span className="font-semibold text-slate-400 block">Jawaban Kamu:</span>
                        {userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                      </div>
                      <div className="p-2 rounded bg-indigo-950/40 text-indigo-200 border border-indigo-800/40">
                        <span className="font-semibold text-indigo-400 block">Jawaban Tepat:</span>
                        {q.options[q.correctIndex]}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                      💡 <strong>Penjelasan Logis:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
