import React, { useState } from 'react';
import { 
  BookOpen, 
  Files, 
  PencilLine, 
  MessageSquare, 
  CheckCircle2, 
  Download,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const TABS = [
  { id: 'aula', label: 'Sobre a Aula', icon: BookOpen },
  { id: 'materiais', label: 'Materiais', icon: Files },
  { id: 'anotacoes', label: 'Anotações', icon: PencilLine },
  { id: 'discussao', label: 'Discussão', icon: MessageSquare },
];

export const LessonTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('aula');

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">
      <div className="flex border-b border-white/5 px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 py-6 px-6 text-xs font-black uppercase tracking-widest relative transition-colors",
              activeTab === tab.id ? "text-med-blue" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-med-blue shadow-[0_-5px_15px_rgba(59,130,246,0.5)]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'aula' && (
            <motion.div 
              key="aula"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-white tracking-tight">O que você aprenderá nesta aula</h3>
                 <p className="text-slate-400 leading-relaxed font-medium">
                   Nesta masterclass, mergulhamos nos fundamentos críticos e nas manobras avançadas do OSCE. 
                   Abordamos desde a postura ética até os check-lists mais cobrados nas principais instituições de Ginecologia e Obstetrícia.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FeatureItem text="Check-list completo em PDF" />
                 <FeatureItem text="Casos clínicos resolvidos" />
                 <FeatureItem text="Fluxogramas de conduta" />
                 <FeatureItem text="Dicas de prova do Medcof" />
              </div>

              <div className="p-6 bg-med-blue/5 rounded-2xl border border-med-blue/10 flex items-center gap-4">
                 <div className="w-12 h-12 bg-med-blue rounded-xl flex items-center justify-center">
                    <BookOpen className="text-white" />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white mb-1">Guia de Estudos Master</h4>
                    <p className="text-xs text-slate-500">Este conteúdo faz parte da trilha de alto desempenho da Nexus.</p>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'materiais' && (
            <motion.div 
              key="materiais"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <MaterialCard title="Aula - Anticoncepção OSCE.pdf" type="PDF" size="4.2 MB" />
              <MaterialCard title="Mapa Mental - Manejo SUA.png" type="IMG" size="1.8 MB" />
              <MaterialCard title="Checklist Oficial Medcof.docx" type="DOC" size="850 KB" />
            </motion.div>
          )}

          {activeTab === 'anotacoes' && (
            <motion.div 
              key="anotacoes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                 <h3 className="text-lg font-bold text-white">Minhas Anotações</h3>
                 <button className="flex items-center gap-2 px-4 py-2 bg-med-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-med-blue-dark transition-all">
                    <Plus size={14} />
                    Nova Nota
                 </button>
              </div>
              <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center gap-4">
                 <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                    <PencilLine size={32} />
                 </div>
                 <p className="text-sm text-slate-400 font-medium max-w-[250px]">Você ainda não tem anotações para esta aula. Comece agora!</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'discussao' && (
            <motion.div 
              key="discussao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
               <div className="flex gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0" />
                  <div className="flex-1 space-y-3">
                     <textarea 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-slate-600 focus:border-med-blue outline-none transition-all resize-none min-h-[100px]"
                        placeholder="Dúvida sobre o manejo clínico? Pergunte aqui..."
                     />
                     <div className="flex justify-end">
                        <button className="px-6 py-2.5 bg-med-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-med-blue-dark transition-all">
                           Enviar Pergunta
                        </button>
                     </div>
                  </div>
               </div>
               <p className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest">Nenhuma discussão encontrada nesta aula.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-slate-950 rounded-xl border border-white/5 text-sm font-medium text-slate-300">
     <CheckCircle2 size={16} className="text-emerald-500" />
     {text}
  </div>
);

const MaterialCard = ({ title, type, size }: { title: string, type: string, size: string }) => (
  <div className="p-5 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-between hover:border-med-blue/30 transition-all group">
     <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center font-black text-[10px]",
          type === 'PDF' ? "bg-red-500/10 text-red-500" : type === 'IMG' ? "bg-purple-500/10 text-purple-500" : "bg-blue-500/10 text-blue-500"
        )}>
          {type}
        </div>
        <div>
           <p className="text-sm font-bold text-white group-hover:text-med-blue transition-colors line-clamp-1">{title}</p>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{size}</p>
        </div>
     </div>
     <button className="p-2 text-slate-600 hover:text-white transition-colors">
        <Download size={18} />
     </button>
  </div>
);
