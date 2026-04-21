import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, PlayCircle, BookOpen, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Course, CourseModule, Lesson } from '../../types';

interface LessonSidebarProps {
  course: Course;
  activeLessonId: string;
  watchedLessons: string[];
  progressPercent: number;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({ 
  course, 
  activeLessonId, 
  watchedLessons, 
  progressPercent 
}) => {
  return (
    <aside className="w-full md:w-[320px] lg:w-[380px] bg-slate-900 border-r border-white/5 flex flex-col h-full shadow-2xl relative z-20">
      {/* Header Info */}
      <div className="p-6 md:p-8 border-b border-white/5">
        <h2 className="text-xl font-black text-white leading-tight tracking-tight mb-2">{course.title}</h2>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
          Instrutor: <span className="text-med-blue">{course.instructor}</span>
        </p>

        <div className="mt-8 space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase text-med-blue tracking-tighter">
             <span>Seu Progresso de Estudo</span>
             <span>{progressPercent}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
             <div 
               className="h-full bg-med-blue shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-700" 
               style={{ width: `${progressPercent}%` }} 
             />
          </div>
        </div>
      </div>

      {/* Modules/Lessons List */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
         {course.modules.map((module, mIdx) => (
           <div key={module.id} className={cn(mIdx !== 0 && "border-t border-white/5")}>
             <div className="px-6 py-4 bg-slate-950/50 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-med-blue rounded-full" />
                  {module.title}
                </span>
                <span className="text-white/20 select-none">{mIdx + 1}</span>
             </div>
             <div className="divide-y divide-white/[0.02]">
                {module.lessons.map((lesson) => {
                  const isWatched = watchedLessons.includes(lesson.id);
                  const isActive = activeLessonId === lesson.id;
                  
                  return (
                    <Link
                      key={lesson.id}
                      to={`/play/${course.id}/${lesson.id}`}
                      className={cn(
                        "w-full flex items-start gap-4 px-6 py-5 transition-all text-left group relative",
                        isActive 
                          ? "bg-med-blue/10 border-l-4 border-med-blue shadow-inner" 
                          : "hover:bg-white/5 border-l-4 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 shrink-0 transition-all duration-300",
                        isWatched ? "text-emerald-400 scale-110" : isActive ? "text-med-blue" : "text-slate-700 group-hover:text-slate-400"
                      )}>
                        {isWatched ? <CheckCircle2 size={16} fill="currentColor" className="text-slate-900" /> : <PlayCircle size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className={cn(
                           "text-[13px] font-bold leading-snug transition-colors",
                           isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                         )}>
                           {lesson.title}
                         </p>
                         {isActive && (
                           <div className="flex items-center gap-2 mt-1.5 overflow-hidden h-4">
                              <span className="text-[9px] text-med-blue font-black uppercase tracking-widest whitespace-nowrap">Assistindo Agora</span>
                              <div className="flex gap-0.5 items-end h-full">
                                {[0, 1, 2].map(i => (
                                  <motion.div 
                                    key={i}
                                    animate={{ height: ['40%', '100%', '40%'] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                    className="w-0.5 bg-med-blue"
                                  />
                                ))}
                              </div>
                           </div>
                         )}
                      </div>
                    </Link>
                  );
                })}
             </div>
           </div>
         ))}
      </div>

      {/* Footer / Gamification */}
      <div className="p-6 border-t border-white/5 bg-slate-950 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
               <Award size={18} />
            </div>
            <div className="leading-none">
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Recompensa</p>
               <p className="text-xs font-bold text-white">Certificado em 80%</p>
            </div>
         </div>
         <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <BookOpen size={18} />
         </button>
      </div>
    </aside>
  );
};
