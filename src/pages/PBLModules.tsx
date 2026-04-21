import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { pblModules } from '../mockData';
import { useUser } from '../context/UserContext';
import { 
  CheckCircle2, 
  Play, 
  Stethoscope,
  BookCheck,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GraduationProgressBar } from '../components/GraduationProgressBar';

export const PBLModules = () => {
  const { user, toggleModuleCompletion } = useUser();
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const completedIds = user?.progress?.completedModules || [];

  useEffect(() => {
    // Scroll to the first module that is NOT completed
    const firstUncompletedId = pblModules.find(m => !completedIds.includes(m.id))?.id;
    if (firstUncompletedId && moduleRefs.current[firstUncompletedId]) {
      setTimeout(() => {
        moduleRefs.current[firstUncompletedId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, []);

  const cycles = [
    { title: 'Ciclo Básico', filter: 'Básico' },
    { title: 'Ciclo Clínico', filter: 'Clínico' }
  ];

  return (
    <div className="space-y-16 pb-32">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 text-med-blue font-bold mb-3">
          <Stethoscope size={18} className="md:w-5 md:h-5" />
          <span className="uppercase tracking-widest text-[10px] md:text-[11px]">Metodologia PBL</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-text-main tracking-tight mb-4">Minha Trilha Médica</h2>
        <p className="text-text-muted text-base md:text-lg font-medium leading-relaxed">
          Progresso estruturado seguindo as diretrizes curriculares nacionais. Complete os módulos para avançar em sua formação.
        </p>

        {/* Barra de Progresso PBL */}
        <div className="mt-10 p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-100/50">
           <GraduationProgressBar completedCount={completedIds.length} />
        </div>
      </header>

      <div className="space-y-12 md:space-y-20">
        {cycles.map((cycle) => (
          <section key={cycle.title} className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl md:text-2xl font-black text-text-main tracking-tight">{cycle.title}</h3>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {pblModules
                .filter(m => m.cycle === cycle.filter)
                .map((module) => {
                  const isCompleted = completedIds.includes(module.id);
                  
                  return (
                    <div 
                      key={module.id} 
                      ref={el => { moduleRefs.current[module.id] = el; }}
                      className={cn(
                        "pbl-card !p-0 overflow-hidden transition-all duration-500 border-2",
                        isCompleted ? "border-success/30 bg-emerald-50/30" : "border-border hover:border-med-blue/50"
                      )}
                    >
                      <div className="p-5 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center font-black text-lg md:text-xl transition-colors",
                            isCompleted ? "bg-success text-white" : "bg-bg-slate text-text-muted"
                          )}>
                            {module.id}
                          </div>
                          <div className="space-y-1 md:space-y-2">
                             <h4 className={cn(
                               "text-lg md:text-xl font-bold tracking-tight transition-colors line-clamp-2",
                               isCompleted ? "text-success" : "text-text-main"
                             )}>
                               {module.title}
                             </h4>
                             <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-muted">
                                <span>{isCompleted ? 'Concluído' : 'Disponível'}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">Estimativa: 2h Estudo</span>
                             </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <button 
                            onClick={() => toggleModuleCompletion(module.id)}
                            className={cn(
                              "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95",
                              isCompleted 
                                ? "bg-success/10 text-success border border-success/20 hover:bg-success/20" 
                                : "bg-white border border-border text-text-muted hover:border-med-blue hover:text-med-blue"
                            )}
                          >
                            {isCompleted ? <CheckCircle size={18} /> : <BookCheck size={18} />}
                            {isCompleted ? 'Módulo Concluído' : 'Marcar concluído'}
                          </button>

                          <Link 
                            to={`/pbl/caso/${module.id}`}
                            className={cn(
                              "w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg",
                              isCompleted
                                ? "bg-white text-success border border-success/10"
                                : "bg-med-blue text-white hover:bg-med-blue-dark shadow-med-blue/20"
                            )}
                          >
                            Acessar Conteúdo
                            <Play size={14} fill="currentColor" />
                          </Link>
                        </div>
                      </div>

                      {/* Progress strip */}
                      <div className={cn(
                        "h-1.5 w-full bg-border/30",
                        isCompleted ? "bg-success" : "bg-border/30"
                      )} />
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
