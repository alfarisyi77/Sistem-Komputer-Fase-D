import React, { useState } from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  Users, 
  Award, 
  Save, 
  Sparkles,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { CURRICULUM_INFO, SCENARIO_CASES } from '../data/ipoContent';
import { LKPDAnswer } from '../types/ipo';
import { sound } from '../utils/sound';

export const TeacherDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'lkpd' | 'modul' | 'keys'>('lkpd');

  // LKPD Form state
  const [lkpdData, setLkpdData] = useState<LKPDAnswer>({
    studentName: '',
    studentClass: '7-A',
    groupName: 'Kelompok 1 (CPU Squad)',
    blenderAnalogyNotes: 'Buah segar adalah bahan mentah (Input), pisau dan motor blender mengolah buah (Proses), dan jus segar di gelas adalah hasil siap saji (Output).',
    scenarioAnalysis: 'Pada kasus mengetik makalah, jari mengetik keyboard (Input), CPU & RAM mengolah kode karakter huruf (Proses), file disimpan di SSD (Storage), dan printer mencetak ke lembaran kertas (Output).',
    differenceRamStorage: 'RAM menyimpan data sementara yang sedang aktif dipakai CPU (hilang jika mati listrik). Sedangkan SSD/Harddisk menyimpan file secara permanen walaupun komputer mati.',
    whyIsPrinterOutput: 'Karena printer menerima instruksi data dari komputer lalu mengeluarkannya dalam bentuk fisik kertas untuk dibaca manusia, bukan memasukkan instruksi ke komputer.',
    reflection: 'Kami belajar bahwa setiap perangkat komputasi di sekitar kita (smartphone, kasir minimarket, game) selalu bekerja dengan pola siklus Input-Proses-Output yang saling melengkapi.',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveLKPD = () => {
    sound.playSuccess();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Ruang Guru & Lembar Kerja Siswa (LKPD)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-fun">
              Panduan Modul Ajar & LKPD Interaktif
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Fasilitas pembelajaran kolaboratif berbasis Kurikulum Merdeka (Fase D). Guru dapat mengunduh 
              atau mencetak LKPD digital untuk dikerjakan siswa secara berkelompok.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Halaman Ini</span>
            </button>
          </div>
        </div>

        {/* Subtabs switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700">
          {[
            { id: 'lkpd' as const, label: 'Lembar Kerja Siswa (LKPD Digital)', icon: FileSpreadsheet },
            { id: 'modul' as const, label: 'Rencana Pelaksanaan (Modul Ajar 2 JP)', icon: Clock },
            { id: 'keys' as const, label: 'Kunci Jawaban & Rubrik Guru', icon: CheckCircle2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSubTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content 1: LKPD Interactive */}
      {activeSubTab === 'lkpd' && (
        <div className="bg-slate-850 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6 print:border-none print:shadow-none print:p-0 print:bg-white print:text-slate-900">
          {/* LKPD Header for print */}
          <div className="border-b-2 border-slate-700 print:border-slate-900 pb-4 text-center space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 print:text-indigo-900">
              LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white print:text-slate-900 font-fun">
              Analisis Alur Pemrosesan Data: Siklus Input - Proses - Storage - Output
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Mata Pelajaran: Informatika · Kelas VII / Fase D · Elemen Sistem Komputer
            </p>
          </div>

          {/* Student Identitas Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 text-xs">
            <div>
              <label className="text-slate-400 print:text-slate-700 font-bold block mb-1">
                Nama Anggota Kelompok:
              </label>
              <input
                type="text"
                placeholder="Rani, Budi, Siti, Doni"
                value={lkpdData.studentName}
                onChange={(e) => setLkpdData({ ...lkpdData, studentName: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-400 rounded-lg px-3 py-1.5 text-white print:text-slate-900"
              />
            </div>
            <div>
              <label className="text-slate-400 print:text-slate-700 font-bold block mb-1">
                Kelas:
              </label>
              <input
                type="text"
                value={lkpdData.studentClass}
                onChange={(e) => setLkpdData({ ...lkpdData, studentClass: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-400 rounded-lg px-3 py-1.5 text-white print:text-slate-900"
              />
            </div>
            <div>
              <label className="text-slate-400 print:text-slate-700 font-bold block mb-1">
                Nama Kelompok:
              </label>
              <input
                type="text"
                value={lkpdData.groupName}
                onChange={(e) => setLkpdData({ ...lkpdData, groupName: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-400 rounded-lg px-3 py-1.5 text-white print:text-slate-900"
              />
            </div>
          </div>

          {/* LKPD Questions */}
          <div className="space-y-5 text-xs sm:text-sm">
            {/* Task 1 */}
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-2">
              <div className="font-bold text-white print:text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">1</span>
                <span>Analisis Analogi Mesin Jus Buah (Apersepsi):</span>
              </div>
              <p className="text-slate-300 print:text-slate-700 text-xs leading-relaxed">
                Jelaskan korelasi antara bahan buah segar, pisau blender berputar, dan segelas jus dengan siklus Input-Proses-Output pada komputer!
              </p>
              <textarea
                rows={3}
                value={lkpdData.blenderAnalogyNotes}
                onChange={(e) => setLkpdData({ ...lkpdData, blenderAnalogyNotes: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 rounded-xl p-3 text-xs text-white print:text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Task 2 */}
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-2">
              <div className="font-bold text-white print:text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">2</span>
                <span>Analisis Studi Kasus Nyata (Pilih 1 Kasus dari Simulator):</span>
              </div>
              <p className="text-slate-300 print:text-slate-700 text-xs leading-relaxed">
                Tuliskan secara runut komponen apa saja yang bertindak sebagai Input, Proses, Storage, dan Output pada kasus yang kelompok kalian pilih!
              </p>
              <textarea
                rows={3}
                value={lkpdData.scenarioAnalysis}
                onChange={(e) => setLkpdData({ ...lkpdData, scenarioAnalysis: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 rounded-xl p-3 text-xs text-white print:text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Task 3 */}
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-2">
              <div className="font-bold text-white print:text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">3</span>
                <span>Mengapa Printer Termasuk Output dan Bukan Input?</span>
              </div>
              <p className="text-slate-300 print:text-slate-700 text-xs leading-relaxed">
                Jika ada teman sekelas yang berpendapat printer adalah input karena "kertas dimasukkan ke dalam printer", bagaimana argumen logis kelompok kalian untuk meluruskannya?
              </p>
              <textarea
                rows={3}
                value={lkpdData.whyIsPrinterOutput}
                onChange={(e) => setLkpdData({ ...lkpdData, whyIsPrinterOutput: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 rounded-xl p-3 text-xs text-white print:text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Task 4 */}
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-2">
              <div className="font-bold text-white print:text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">4</span>
                <span>Refleksi Pembelajaran Bermakna:</span>
              </div>
              <p className="text-slate-300 print:text-slate-700 text-xs leading-relaxed">
                Apa manfaat terpenting yang kalian pelajari tentang cara kerja komputer setelah mencoba KompuSim?
              </p>
              <textarea
                rows={3}
                value={lkpdData.reflection}
                onChange={(e) => setLkpdData({ ...lkpdData, reflection: e.target.value })}
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 rounded-xl p-3 text-xs text-white print:text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 print:hidden">
            <span className="text-xs text-slate-400">
              Jawaban otomatis tersimpan pada sesi peramban ini.
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveLKPD}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? '✓ Tersimpan!' : 'Simpan Draft LKPD'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs shadow-md transition"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Kerja</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Modul Ajar (2 JP) */}
      {activeSubTab === 'modul' && (
        <div className="bg-slate-850 rounded-2xl border border-slate-700 p-6 space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-white font-fun">
              Rancangan Pelaksanaan Pembelajaran (Modul Ajar 2 JP / 80 Menit)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Panduan integrasi media pembelajaran interaktif "KompuSim: Adventure in IPO Land" di dalam kelas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">
                1. Kegiatan Awal (15 Menit)
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Guru menyapa siswa dan membagi kelas menjadi kelompok berpasangan (*peer-work*).</li>
                <li>Guru mendemokan <strong>Tahap 1: Apersepsi Blender</strong> pada layar proyektor kelas.</li>
                <li>Pertanyaan pemantik: <em>"Pernahkah kalian berpikir bagaimana huruf yang kita ketik bisa muncul di layar HP?"</em></li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                2. Kegiatan Inti (50 Menit)
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Siswa membuka tautan <strong>KompuSim</strong> di Chromebook/Laptop/HP masing-masing.</li>
                <li>Menyelesaikan 4 studi kasus di <strong>Tahap 2: Simulasi Kasus</strong>.</li>
                <li>Mencatat temuan jika terjadi umpan balik salah posisi komponen.</li>
                <li>Membuka <strong>AI Scenario Studio</strong> untuk mencoba kasus teknologi bebas.</li>
                <li>Mengisi LKPD kelompok digital bersama teman sebangku.</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                3. Penutup & Asesmen (15 Menit)
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Siswa mengerjakan <strong>Tahap 4: Kuis Formatif</strong> secara mandiri.</li>
                <li>Siswa yang mencapai nilai &ge; 70 mengunduh sertifikat kelulusan.</li>
                <li>Guru dan perwakilan siswa merefleksikan prinsip dasar IPO.</li>
                <li>Guru memberikan apresiasi atas kolaborasi kritis seluruh murid.</li>
              </ul>
            </div>
          </div>

          {/* Profil Pelajar Pancasila Info */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Dimensi Profil Pelajar Pancasila yang Dibangun:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {CURRICULUM_INFO.pancasilaProfile.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-indigo-300">{item.title}</div>
                  <p className="text-slate-400 text-[11px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Kunci Jawaban & Rubrik */}
      {activeSubTab === 'keys' && (
        <div className="bg-slate-850 rounded-2xl border border-slate-700 p-6 space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-white font-fun">
              Kunci Jawaban & Rubrik Evaluasi Guru
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Panduan penilaian objektif untuk 4 studi kasus komputer di KompuSim.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {SCENARIO_CASES.map((sc, idx) => (
              <div key={sc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">
                    Kasus {idx + 1}: {sc.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Fase D · Sistem Komputer</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-indigo-900/40">
                    <span className="text-indigo-400 font-bold block">INPUT:</span>
                    {sc.stepExplainer.input}
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-amber-900/40">
                    <span className="text-amber-400 font-bold block">PROSES:</span>
                    {sc.stepExplainer.process}
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-cyan-900/40">
                    <span className="text-cyan-400 font-bold block">STORAGE:</span>
                    {sc.stepExplainer.storage}
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-emerald-900/40">
                    <span className="text-emerald-400 font-bold block">OUTPUT:</span>
                    {sc.stepExplainer.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
