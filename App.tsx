
import React, { useState, useEffect } from 'react';
import SkillCard from './components/SkillCard';
import { SKILLS } from './constants';

const App: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  // Particle Generation
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));
    setParticles(newParticles);
  }, []);

  const handleCardClick = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white selection:bg-orange-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 bg-[#0a0e27] -z-20" />
      <div className="fixed inset-0 bg-animation -z-10">
        <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bottom-0 w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${p.left}%`,
              animation: `float-up ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(10vh); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl relative z-10">
        <header className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-block">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 custom-glow">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Shreeshesh Regmi
              </span>
            </h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              DEVOPS ENGINEER
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/80 font-medium text-lg">
            <a 
              href="mailto:shreeshesh.regmi@gmail.com" 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group"
            >
              <span className="text-orange-400 group-hover:scale-110 transition-transform">📧</span>
              shreeshesh.regmi@gmail.com
            </a>
            <a 
              href="tel:+9779704556365" 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <span className="text-indigo-400 group-hover:scale-110 transition-transform">📱</span>
              +977 9704556365
            </a>
          </div>
          
          {/* Decorative separator */}
          <div className="mt-12 w-1/2 mx-auto h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </header>

        {/* 3x3 Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
          {SKILLS.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isExpanded={expandedId === skill.id}
              onClick={() => handleCardClick(skill.id)}
            />
          ))}
        </div>

        <footer className="mt-24 text-center text-white/40 text-sm font-medium">
          <p>© {new Date().getFullYear()} Shreeshesh Regmi • Built for Modern DevOps Landscapes</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
