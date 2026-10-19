import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, MessageSquare } from 'lucide-react';
import { sound } from '../utils/sound';

interface RoboTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const RoboTutorModal: React.FC<RoboTutorModalProps> = ({
  isOpen,
  onClose,
  activeContext,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo Sobat Pelajar! Aku **Robo-IPO**, asisten belajarmu di dunia komputer. Kamu bisa menanyakan apa saja tentang perangkat keras, siklus Input-Proses-Output, atau alur teknologi yang kamu temui sehari-hari. Mau tanya apa hari ini? 🚀',
      timestamp: 'Baru saja',
    },
  ]);

  if (!isOpen) return null;

  const quickQuestions = [
    'Apakah Flashdisk itu Input atau Storage?',
    'Mengapa Printer termasuk perangkat Output?',
    'Apa bedanya RAM dengan SSD?',
    'Bagaimana alur IPO saat kita kirim Voice Note WhatsApp?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    sound.playClick();
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Baru saja',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text.trim(),
          context: activeContext || 'Siklus Input-Proses-Output',
        }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: data.answer || 'Mohon maaf, Robo-IPO sedang memproses data. Coba tanyakan lagi ya!',
        timestamp: 'Baru saja',
      };
      setMessages(prev => [...prev, botMsg]);
      sound.playSuccess();
    } catch {
      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: `Pertanyaan yang bagus sekali! Ingat selalu prinsip dasarnya:\n• **INPUT**: Memasukkan data/perintah (Keyboard, Mouse, Mic, Kamera).\n• **PROSES**: Menghitung dan mengolah instruksi (CPU & RAM).\n• **STORAGE**: Mengarsipkan data secara permanen (SSD, Flashdisk).\n• **OUTPUT**: Mengeluarkan hasil yang dapat dinikmati manusia (Monitor, Printer, Speaker)!`,
        timestamp: 'Baru saja',
      };
      setMessages(prev => [...prev, botMsg]);
      sound.playSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-fun">Robo-IPO Tutor AI</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Teman Diskusi Konsep Komputer & Siklus IPO Kelas 7
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Robo-IPO sedang meracik penjelasan logis...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-slate-850/80 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[10px] text-slate-400 whitespace-nowrap font-semibold">Tanya Cepat:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-850 border-t border-slate-750 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pertanyaanmu seputar siklus IPO di sini..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
