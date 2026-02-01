import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  isExpanded: boolean;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, isExpanded, onClick }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer 
        ${isExpanded 
          ? 'col-span-full row-span-2 md:col-span-2 md:row-span-2 shadow-2xl scale-100 z-10' 
          : 'hover:scale-105 hover:shadow-xl z-0'
        }
        bg-white/5 border border-white/10 backdrop-blur-md group
      `}
      onClick={onClick}
    >
      {/* Top Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} opacity-80`} />

      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg bg-gradient-to-br ${skill.color} 
            transition-all duration-500 
            ${isExpanded ? 'animate-icon-active ring-4 ring-white/20' : 'group-hover:rotate-12 group-hover:scale-110'}
          `}>
            {skill.icon}
          </div>
          <div className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-bold tracking-wider text-white mb-2 group-hover:text-orange-400 transition-colors">
          {skill.title}
        </h3>
        
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* Content Section */}
        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6">
            {skill.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 group/item">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                <span className="text-sm md:text-base text-white/80 font-light leading-relaxed group-hover/item:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Glow Background for expanded state */}
        {isExpanded && (
          <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${skill.color} opacity-10 blur-3xl pointer-events-none`} />
        )}
      </div>
    </div>
  );
};

export default SkillCard;
