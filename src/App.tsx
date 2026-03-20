/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Timer, Trophy, User } from 'lucide-react';

// --- Types ---
interface Player {
  name: string;
  unit: string;
  score: number;
  avatar: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
}

// --- Components ---

const Header = () => (
  <div className="absolute top-0 left-0 w-full h-[120px] flex justify-center items-start pt-6 z-10">
    <div className="relative w-[800px] h-[80px] flex items-center justify-center">
      {/* Futuristic Frame Background */}
      <div className="absolute inset-0 bg-[#002b5c] clip-path-header border-b-4 border-[#00a8ff] shadow-[0_10px_30px_rgba(0,168,255,0.4)]"></div>
      <div className="absolute inset-0 border-x-2 border-t-2 border-[#00a8ff]/30 clip-path-header"></div>
      
      <h1 className="relative text-4xl font-bold tracking-[0.2em] text-white text-glow italic">
        党章党规知识竞答
      </h1>
      
      {/* Decorative elements */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-[2px] bg-[#00a8ff]"></div>
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-[2px] bg-[#00a8ff]"></div>
    </div>
    
    {/* Back Button */}
    <motion.button 
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 168, 255, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      className="absolute left-10 top-10 flex items-center gap-2 px-6 py-2 bg-[#002b5c]/80 border border-[#00a8ff]/50 rounded-sm transition-all group hover:border-[#00a8ff] hover:shadow-[0_0_20px_rgba(0,168,255,0.4)]"
    >
      <ChevronLeft className="w-5 h-5 text-[#00a8ff] group-hover:text-white transition-colors" />
      <span className="text-xl font-medium tracking-wider group-hover:text-white transition-colors">返回</span>
      <div className="absolute -right-2 top-0 bottom-0 w-4 bg-[#00a8ff]/20 skew-x-[20deg] group-hover:bg-[#00a8ff]/40 transition-colors"></div>
    </motion.button>
  </div>
);

const PlayerCard = ({ player, side }: { player: Player; side: 'left' | 'right' }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
    animate={{ opacity: 1, x: 0 }}
    className={`absolute top-[300px] ${side === 'left' ? 'left-[150px]' : 'right-[150px]'} flex flex-col items-center gap-6`}
  >
    {/* Avatar Circle */}
    <div className="relative">
      <div className="w-32 h-32 rounded-full border-4 border-[#00a8ff] p-1 shadow-[0_0_20px_rgba(0,168,255,0.5)] overflow-hidden">
        <img 
          src={player.avatar} 
          alt={player.name} 
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Decorative ring */}
      <div className="absolute -inset-4 border border-[#00a8ff]/20 rounded-full animate-spin-slow"></div>
    </div>

    {/* Info */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold tracking-widest">{player.name}</h2>
      <p className="text-[#00a8ff]/70 text-lg tracking-tight">{player.unit}</p>
    </div>

    {/* Score Display */}
    <div className="relative mt-4 w-[240px] h-[60px] flex items-center justify-center">
      <div className={`absolute inset-0 bg-[#002b5c]/80 border-y-2 border-[#00a8ff] ${side === 'left' ? 'skew-x-[-20deg]' : 'skew-x-[20deg]'}`}></div>
      <div className="relative flex items-center gap-4">
        <span className="text-2xl font-bold tracking-widest text-[#00a8ff]">得分 :</span>
        <span className="text-4xl font-black italic text-white text-glow leading-none">
          {player.score}
        </span>
      </div>
    </div>
  </motion.div>
);

const QuizArea = ({ question }: { question: Question }) => {
  const [timeLeft, setTimeLeft] = useState(118); // 01:58 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[1000px] h-[750px] flex flex-col items-center">
      {/* Main Container */}
      <div className="relative w-full h-full glass-panel rounded-lg flex flex-col items-center p-12">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#00a8ff]"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#00a8ff]"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#00a8ff]"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#00a8ff]"></div>

        {/* Timer Badge - Optimized size and position */}
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[140px] h-[40px] bg-[#00a8ff] flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(0,168,255,0.5)] z-20">
          <span className="text-xl font-bold tracking-widest text-white">{formatTime(timeLeft)}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#00a8ff]"></div>
        </div>

        {/* Question Info */}
        <div className="mt-8 text-center space-y-6">
          <p className="text-[#00a8ff] text-xl font-medium tracking-widest opacity-80">
            第 {question.id} 题 / 共 10 题
          </p>
          <h3 className="text-3xl font-bold leading-relaxed max-w-[800px] tracking-wide">
            {question.text}
          </h3>
        </div>

        {/* Options Area */}
        <div className="mt-16 w-full max-w-[800px] space-y-6">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(0, 168, 255, 0.25)',
                boxShadow: '0 0 30px rgba(0, 168, 255, 0.4), inset 0 0 15px rgba(0, 168, 255, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 px-10 text-left text-xl font-medium tracking-wide bg-[#002b5c]/40 border border-[#00a8ff]/30 rounded-sm transition-all hover:border-[#00a8ff] relative group overflow-hidden"
            >
              {/* Corner Accents - appear on hover */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00a8ff] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00a8ff] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00a8ff] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00a8ff] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              {/* Hover Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00a8ff]/10 to-transparent -translate-x-full group-hover:animate-scanline"></div>
              
              {/* Button "Active" Indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00a8ff] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

              <span className="relative z-10 group-hover:text-white transition-colors tracking-widest pl-2">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Background Hexagon Pattern inside Quiz Area */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full futuristic-grid"></div>
      </div>
    </div>
  );
};

export default function App() {
  const [player1] = useState<Player>({
    name: '陈XX',
    unit: 'XXXXXXX单位',
    score: 10,
    avatar: 'https://picsum.photos/seed/player1/200/200'
  });

  const [player2] = useState<Player>({
    name: '张X',
    unit: 'XXXXXXX单位',
    score: 0,
    avatar: 'https://picsum.photos/seed/player2/200/200'
  });

  const [currentQuestion] = useState<Question>({
    id: 1,
    text: '通用人工智能(AGI)与专用人工智能的主要区别是什么（单选题）？',
    options: [
      'AGI能够在复杂动态环境中自主定义任务并执行',
      'AGI仅专注于完成特定领域的任务',
      'AGI依赖于大规模数据进行训练',
      'AGI无法处理多任务场景'
    ]
  });

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 1920x1080 Fixed Container */}
      <div className="screen-container relative overflow-hidden">
        {/* Tech Blue Background Image Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            filter: 'blur(8px)'
          }}
        ></div>

        {/* Background Grid Layer */}
        <div className="absolute inset-0 futuristic-grid opacity-20 z-1"></div>
        
        {/* Decorative Frame Border */}
        <div className="absolute inset-4 border-2 border-[#00a8ff]/20 pointer-events-none">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#00a8ff]/60"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#00a8ff]/60"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#00a8ff]/60"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#00a8ff]/60"></div>
          
          {/* Side decorative lines */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-40 bg-[#00a8ff]/40"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-40 bg-[#00a8ff]/40"></div>
        </div>

        {/* Content */}
        <Header />
        
        <PlayerCard player={player1} side="left" />
        <PlayerCard player={player2} side="right" />
        
        <QuizArea question={currentQuestion} />

        {/* Bottom Decorative Bar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[10px] bg-gradient-to-r from-transparent via-[#00a8ff] to-transparent opacity-50"></div>
      </div>

      <style>{`
        .clip-path-header {
          clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scanline {
          animation: scanline 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
