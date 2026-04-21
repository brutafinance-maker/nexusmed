import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  Trophy, 
  Target, 
  Flame, 
  CheckCircle2,
  ChevronRight,
  Play,
  Stethoscope,
  Scissors,
  Baby,
  Users,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationProgressBar } from '../components/GraduationProgressBar';

const categories = [
  { id: 'cm', label: 'Clínica Médica', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
  { id: 'ci', label: 'Cirurgia', icon: Scissors, color: 'bg-red-100 text-red-600' },
  { id: 'pe', label: 'Pediatria', icon: Baby, color: 'bg-orange-100 text-orange-600' },
  { id: 'go', label: 'Ginecologia', icon: Users, color: 'bg-purple-100 text-purple-600' },
  { id: 'mp', label: 'Preventiva', icon: ShieldCheck, color: 'bg-emerald-100 text-emerald-600' },
];

export const Home = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero / Welcome */}
      <section className="relative overflow-hidden rounded-2xl bg-med-blue p-6 md:p-10 text-white shadow-sleek">
        <div className="relative z-10 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
          >
            Seja bem-vindo, Dr. {user.name.split(' ')[0]}
          </motion.h2>
          <p className="text-med-blue-light/80 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed font-medium">
            Seu desempenho está sendo acompanhado em tempo real. Pronto para o próximo caso clínico?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/pbl" className="px-6 py-3 bg-white text-med-blue rounded-lg font-bold hover:bg-med-blue-light transition-all shadow-sm text-center">
              Continuar Trilha
            </Link>
            <Link to="/simulados" className="px-6 py-3 bg-med-blue-dark text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-sm text-center">
              Ver Simulados
            </Link>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card p-6 bg-white rounded-2xl border border-border shadow-sleek relative group">
          <div className="text-[12px] text-text-muted mb-1 font-bold uppercase tracking-wider">ACERTO GLOBAL</div>
          <div className="text-[24px] font-bold text-text-main">{user.progress.successRate}%</div>
          <div className="text-[11px] text-success mt-1 font-semibold flex items-center gap-1">
            ↑ 0% <span className="text-text-muted font-normal">vs semana passada</span>
          </div>
        </div>
        
        <div className="stat-card p-6 bg-white rounded-2xl border border-border shadow-sleek relative group">
          <div className="text-[12px] text-text-muted mb-1 font-bold uppercase tracking-wider">QUESTÕES RESPONDIDAS</div>
          <div className="text-[24px] font-bold text-text-main">{user.progress.questionsAnswered}</div>
          <div className="h-2 bg-border rounded-full overflow-hidden mt-3">
             <div className="h-full bg-med-blue rounded-full" style={{ width: `${Math.min((user.progress.questionsAnswered/1000)*100, 100)}%` }} />
          </div>
        </div>

        <div className="stat-card p-6 bg-white rounded-2xl border border-border shadow-sleek relative group">
          <div className="text-[12px] text-text-muted mb-1 font-bold uppercase tracking-wider">OFENSIVA ATUAL</div>
          <div className="text-[24px] font-bold text-text-main">{user.progress.streak} dias</div>
          <div className="text-[11px] text-text-muted mt-1 font-medium">Top 5% dos estudantes</div>
        </div>
      </section>

      {/* Graduation Progress Section */}
      <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30">
          <GraduationProgressBar completedCount={user.progress.completedModules?.length || 0} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cases */}
        <div className="lg:col-span-2 space-y-6">
          <div className="pbl-card">
            <div className="flex justify-between items-start mb-6">
              <span className="badge bg-med-blue-light text-med-blue">Caso em Destaque</span>
              <span className="text-[13px] text-text-muted font-medium">Módulo: Clínica Médica</span>
            </div>
            <h2 className="text-[22px] font-bold text-text-main mb-3">Dispneia e Edema em MMII</h2>
            <p className="text-[15px] text-text-muted leading-relaxed mb-8">
              Paciente de 68 anos, hipertenso e tabagista, apresenta-se com dispneia progressiva há 3 meses, evoluindo para ortopneia e edema maleolar bilateral...
            </p>
            
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-med-blue rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-text-main">Situação-Problema</div>
                  <div className="text-[13px] text-text-muted">Análise de sinais vitais e anamnese concluída.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-border rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-text-muted">Definição de Hipóteses</div>
                  <div className="text-[13px] text-slate-300">Aguardando análise de exames complementares.</div>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full py-3.5 bg-med-blue text-white rounded-xl font-bold hover:bg-med-blue-dark transition-all shadow-md">
              CONTINUAR RACIOCÍNIO CLÍNICO
            </button>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-8">
          <div className="pbl-card space-y-6">
             <h3 className="text-[16px] font-bold text-text-main">Próximo Simulado</h3>
             <div className="bg-bg-slate p-6 rounded-xl text-center border border-border/50">
                <div className="text-[12px] text-text-muted font-bold uppercase tracking-wider">DATA MARCADA</div>
                <div className="text-[18px] font-extrabold text-text-main my-1">12 de Setembro</div>
                <div className="text-[13px] font-bold text-med-blue">Simulado Integral R1</div>
             </div>
             <button className="w-full py-3 bg-white border border-med-blue text-med-blue rounded-xl font-bold hover:bg-med-blue-light transition-all">
                VER CRONOGRAMA
             </button>
          </div>

          <div className="pbl-card space-y-6">
             <h3 className="text-[16px] font-bold text-text-main">Desempenho por Tema</h3>
             <div className="space-y-5">
                {Object.entries(user.progress.byCategory).map(([label, val]) => (
                  <div key={label} className="text-[13px]">
                    <div className="flex justify-between font-bold text-text-main mb-1.5">
                      <span>{label}</span>
                      <span>{val}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full bg-med-blue")} style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, subValue, color }: any) => {
  const colors: any = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500"
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className={cn("absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform", colors[color])}>
        <Icon size={120} />
      </div>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg", colors[color])}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h4>
        <p className="text-xs text-slate-500 mt-1">{subValue}</p>
      </div>
    </div>
  );
};

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
