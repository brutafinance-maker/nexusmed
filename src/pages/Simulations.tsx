import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  HelpCircle, 
  BarChart3, 
  ChevronRight, 
  ShieldCheck,
  Calendar,
  AlertCircle,
  Microscope,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export const Simulations = () => {
  const simulationList = [
    { title: 'Simulado Nacional Revalida 2026', questions: 100, time: '240 min', type: 'Oficial' },
    { title: 'Residência Médica USP-RP (Anterior)', questions: 80, time: '180 min', type: 'Histórico' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header className="max-w-2xl">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Área de Simulados</h2>
        <p className="text-slate-500 text-lg">Avalie seu desempenho com provas cronometradas que simulam o ambiente real dos principais concursos do país.</p>
      </header>

      {/* Destaque: Histologia / Prova de Trocou */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-med-blue/10 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 max-w-xl">
             <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-med-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest">Exclusivo Nexus</span>
                <span className="flex items-center gap-1.5 text-[10px] text-med-blue-light font-black uppercase tracking-widest">
                   <Zap size={14} className="fill-current" /> Modo Realista
                </span>
             </div>
             <div className="space-y-3">
                <h3 className="text-4xl font-black tracking-tight italic">Simulado de Microscopia (Prova de Trocou)</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Treine a identificação rápida de lâminas histológicas com o nosso sistema de rotação cronometrado. Configure o tempo por estação e simule a pressão da prova prática real.
                </p>
             </div>
             <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2">
                   <Microscope size={14} className="text-med-blue" />
                   Cortes Histológicos HD
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2">
                   <Timer size={14} className="text-med-blue" />
                   Cronômetro por Estação
                </div>
             </div>
          </div>
          <Link 
            to="/simulados/histologia"
            className="px-10 py-6 bg-med-blue text-white rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-white hover:text-med-blue transition-all shadow-xl shadow-med-blue/30 h-fit whitespace-nowrap"
          >
            Acessar Laboratório
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {simulationList.map((sim, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{sim.type}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-widest">
                       <Calendar size={12} /> Próxima abertura: 12/05
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{sim.title}</h3>
                  <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2"><HelpCircle size={16} /> {sim.questions} Questões</div>
                    <div className="flex items-center gap-2"><Timer size={16} /> {sim.time}</div>
                  </div>
                </div>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black group-hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                  Iniciar
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <BarChart3 className="text-blue-600" />
              Sua Performance
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Média Acertos</p>
                <p className="text-2xl font-black text-slate-900">76.4%</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                  <ShieldCheck size={14} />
                  Top 5% dos alunos
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tempo Médio/Questão</p>
                <p className="text-2xl font-black text-slate-900">1:45 min</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start gap-3">
                <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-orange-800 leading-relaxed font-medium">
                    Seu desempenho em <strong>Pediatria</strong> caiu 10% no último simulado. Recomendamos revisar a Trilha PBL de Neonatologia.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
