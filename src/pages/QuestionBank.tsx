import React, { useState } from 'react';
import { mockQuestions } from '../mockData';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  MessageCircle, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuestionBank = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState('Todas');
  const [answeredMap, setAnsweredMap] = useState<Record<string, string | null>>({});
  const [showComment, setShowComment] = useState<Record<string, boolean>>({});

  const disciplines = ['Todas', 'Clínica Médica', 'Cirurgia', 'Pediatria'];

  const filteredQuestions = selectedDiscipline === 'Todas' 
    ? mockQuestions 
    : mockQuestions.filter(q => q.discipline === selectedDiscipline);

  const handleAnswer = (questionId: string, optionId: string) => {
    if (answeredMap[questionId]) return;
    setAnsweredMap({ ...answeredMap, [questionId]: optionId });
    setShowComment({ ...showComment, [questionId]: true });
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-text-main tracking-tight mb-3">Banco de Questões</h2>
          <p className="text-text-muted text-lg">Pratique com milhares de questões comentadas pelos melhores especialistas do país.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-border shadow-sm overflow-x-auto no-scrollbar">
          {disciplines.map(d => (
            <button 
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={cn(
                "px-5 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap",
                selectedDiscipline === d ? "bg-med-blue text-white shadow-md" : "text-text-muted hover:text-text-main"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="pbl-card space-y-6 sticky top-28">
            <h4 className="font-bold text-text-main flex items-center gap-2">
              <Filter size={18} />
              Refinar Busca
            </h4>
            
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Dificuldade</label>
              {['Fácil', 'Médio', 'Difícil'].map(lvl => (
                <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-md border-2 border-border checked:bg-med-blue transition-all outline-none" />
                  <span className="text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{lvl}</span>
                </label>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <button 
                className="w-full py-3.5 bg-text-main text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {filteredQuestions.map((q, idx) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="pbl-card hover:shadow-lg transition-shadow"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="badge bg-med-blue-light text-med-blue">
                      {q.discipline}
                    </span>
                    <span className="text-xs text-text-muted font-bold tracking-tight uppercase opacity-60">
                       • {q.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-border hover:text-med-blue transition-colors"><Share2 size={18} /></button>
                    <HelpCircle size={18} className="text-border" />
                  </div>
                </div>

                <p className="text-xl font-bold text-text-main leading-relaxed">
                  {q.text}
                </p>

                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isSelected = answeredMap[q.id] === opt.id;
                    const isCorrect = q.correctOptionId === opt.id;
                    const showResults = !!answeredMap[q.id];

                    return (
                      <button
                        key={opt.id}
                        disabled={showResults}
                        onClick={() => handleAnswer(q.id, opt.id)}
                        className={cn(
                          "w-full p-5 rounded-xl border-2 transition-all text-left flex items-start gap-4",
                          showResults 
                            ? isCorrect 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-900" 
                                : isSelected 
                                  ? "bg-red-50 border-red-500 text-red-900 shadow-inner" 
                                  : "bg-bg-slate border-transparent text-text-muted opacity-40"
                            : "bg-white border-border hover:border-med-blue-light hover:bg-med-blue-light/20 text-text-main"
                        )}
                      >
                        <span className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                          showResults 
                            ? isCorrect ? "bg-success text-white" : isSelected ? "bg-red-500 text-white" : "bg-border text-text-muted"
                            : "bg-bg-slate text-text-muted"
                        )}>
                          {opt.id.toUpperCase()}
                        </span>
                        <p className="font-bold text-[15px] mt-1 pr-4">{opt.text}</p>
                        {showResults && isCorrect && <CheckCircle2 className="ml-auto text-success shrink-0" size={24} />}
                        {showResults && isSelected && !isCorrect && <XCircle className="ml-auto text-red-600 shrink-0" size={24} />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showComment[q.id] && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-8 border-t border-border space-y-4"
                    >
                      <div className="flex items-center gap-2 text-med-blue font-bold">
                        <MessageCircle size={20} />
                        <h4 className="text-[15px]">Comentário do Professor</h4>
                      </div>
                      <p className="text-text-muted leading-relaxed bg-bg-slate p-6 rounded-xl border border-border/50 text-sm font-medium">
                        {q.comment}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
