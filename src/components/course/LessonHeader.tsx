import React from 'react';
import { 
  ChevronLeft, 
  Menu, 
  SkipForward, 
  CheckCircle2, 
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LessonHeaderProps {
  courseTitle: string;
  lessonTitle: string;
  isWatched: boolean;
  onToggleWatched: () => void;
  onNext: () => void;
  hasNext: boolean;
  onToggleSidebar: () => void;
  courseId: string;
  isLightMode?: boolean;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  courseTitle,
  lessonTitle,
  isWatched,
  onToggleWatched,
  onNext,
  hasNext,
  onToggleSidebar,
  courseId,
  isLightMode = false
}) => {
  return (
    <header className={cn(
      "px-6 md:px-10 py-5 backdrop-blur-xl border-b flex items-center justify-between sticky top-0 z-40 transition-all",
      isLightMode 
        ? "bg-white/80 border-slate-200" 
        : "bg-slate-950/80 border-white/5"
    )}>
      <div className="flex items-center gap-6">
        <button 
          onClick={onToggleSidebar}
          className={cn(
            "p-3 border rounded-2xl transition-all flex items-center gap-2 group md:hidden",
            isLightMode 
              ? "bg-white border-slate-200 text-slate-900 hover:bg-slate-50" 
              : "bg-slate-900 border-white/10 text-white hover:bg-slate-800"
          )}
        >
          <Menu size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        </button>

        <div className="hidden md:flex items-center gap-4">
           <Link 
            to={`/cursos/${courseId}`} 
            className={cn(
              "group p-2.5 border rounded-xl transition-all",
              isLightMode
                ? "bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
           >
              <ChevronLeft size={20} />
           </Link>
           <div className={cn("h-10 w-[1px]", isLightMode ? "bg-slate-200" : "bg-white/5")} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] text-med-blue font-black uppercase tracking-[0.2em]">{courseTitle}</span>
             <ChevronRight size={10} className={isLightMode ? "text-slate-300" : "text-white/20"} />
             <span className={cn("text-[10px] font-bold", isLightMode ? "text-slate-400" : "text-white/40")}>Módulo em andamento</span>
          </div>
          <h1 className={cn(
            "text-lg md:text-xl font-black leading-none tracking-tight truncate max-w-[300px] lg:max-w-md",
            isLightMode ? "text-slate-900" : "text-white"
          )}>
            {lessonTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle Watched */}
        <button
          onClick={onToggleWatched}
          className={cn(
            "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[11px] transition-all active:scale-95 shadow-xl uppercase tracking-widest",
            isWatched
              ? (isLightMode ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20")
              : (isLightMode ? "bg-med-blue text-white hover:bg-med-blue-dark shadow-med-blue/10" : "bg-med-blue text-white hover:bg-med-blue-dark shadow-med-blue/20")
          )}
        >
          {isWatched ? (
            <><CheckCircle2 size={16} /> Aula Visto</>
          ) : (
            <><CheckCircle size={16} /> Marcar como Visto</>
          )}
        </button>

        {/* Next Button */}
        {hasNext && (
          <button 
            onClick={onNext}
            className={cn(
              "hidden sm:flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border group active:scale-95",
              isLightMode
                ? "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
                : "bg-slate-900 text-white border-white/5 hover:bg-slate-800"
            )}
          >
            Próxima Aula
            <SkipForward size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        <div className={cn("hidden lg:flex items-center gap-3 pl-4 border-l", isLightMode ? "border-slate-200" : "border-white/5")}>
           <div className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer group",
            isLightMode ? "bg-white border-slate-200 text-slate-400 hover:text-slate-900" : "bg-slate-900 border-white/5 text-slate-500 hover:text-white"
           )}>
              <Clock size={18} className="group-hover:scale-110 transition-transform" />
           </div>
           <div className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer group",
            isLightMode ? "bg-white border-slate-200 text-slate-400 hover:text-slate-900" : "bg-slate-900 border-white/5 text-slate-500 hover:text-white"
           )}>
              <ArrowUpRight size={18} className="group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>
    </header>
  );
};

const ChevronRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
