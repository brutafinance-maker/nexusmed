import React from 'react';
import { motion } from 'motion/react';
import { Zap, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

interface GraduationProgressBarProps {
  completedCount: number;
  total?: number;
  className?: string;
  showDetails?: boolean;
}

export const GraduationProgressBar: React.FC<GraduationProgressBarProps> = ({ 
  completedCount, 
  total = 24,
  className,
  showDetails = true
}) => {
  const percentage = Math.min((completedCount / total) * 100, 100);

  const getMedInfo = (count: number) => {
    // 3 modules per MED
    const medNum = Math.min(Math.floor((count - 1) / 3) + 1, 8);
    
    let phrase = "Calouro(a) detectado! O primeiro passo para o CRM.";
    let stage = "MED 1";

    if (count === 0) {
      phrase = "Pronto para iniciar sua jornada na medicina?";
      stage = "Pré-MED";
    } else if (count <= 3) {
      phrase = "Calouro(a) detectado! O primeiro passo para o CRM.";
      stage = "MED 1";
    } else if (count <= 6) {
      phrase = "Sobrevivendo às primeiras lâminas de Histologia.";
      stage = "MED 2";
    } else if (count <= 9) {
      phrase = "Quase lá no Ciclo Clínico...";
      stage = "MED 3";
    } else if (count <= 11) {
      phrase = "O Básico está quase no fim. Respira.";
      stage = "MED 4";
    } else if (count === 12) {
      phrase = "CLINICOU! Bem-vindo ao Ciclo Clínico.";
      stage = "MED 4 (Fim do Básico)";
    } else if (count <= 15) {
      phrase = "Semiologia é o seu novo sobrenome.";
      stage = "MED 5";
    } else if (count <= 18) {
      phrase = "Oficialmente Meio Médico(a)! Metade do caminho.";
      stage = "MED 6 (Meio Médico)";
    } else if (count <= 21) {
      phrase = "A rotina do hospital está chamando.";
      stage = "MED 7";
    } else if (count <= 23) {
      phrase = "Prepare o carimbo: Quase Interno(a)!";
      stage = "MED 8";
    } else if (count >= 24) {
      phrase = "INTERNATO À VISTA! O Ciclo Clínico foi conquistado.";
      stage = "MED 8 (Fim do Clínico)";
    }

    return { phrase, stage, medNum };
  };

  const { phrase, stage } = getMedInfo(completedCount);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-med-blue/10 rounded-2xl flex items-center justify-center text-med-blue shadow-inner border border-med-blue/5">
            <GraduationCap size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              Jornada Médica
              <span className="px-2 py-0.5 bg-med-blue text-[8px] text-white rounded-full">
                {stage}
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 font-bold italic line-clamp-1">"{phrase}"</p>
          </div>
        </div>
        
        {showDetails && (
            <div className="flex items-end gap-1 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
               <span className="text-2xl font-black text-med-blue tracking-tighter leading-none">{completedCount}</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">/ {total} Módulos</span>
            </div>
        )}
      </div>

      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1.5, ease: "circOut" }}
           className="absolute top-0 left-0 h-full bg-gradient-to-r from-med-blue via-med-blue to-med-blue-light transition-all shadow-md"
        >
           <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:2rem_2rem] animate-[move-stripe_2s_linear_infinite]" />
        </motion.div>
      </div>

      {showDetails && (
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status:</span>
                <span className="text-[9px] font-black text-med-blue uppercase tracking-widest">
                  {completedCount < 12 ? 'Ciclo Básico' : completedCount < 24 ? 'Ciclo Clínico' : 'Internato'}
                </span>
             </div>
             <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                <Zap size={10} className="fill-current" />
                {Math.round(percentage)}% da Graduação
             </div>
          </div>
      )}
    </div>
  );
};
