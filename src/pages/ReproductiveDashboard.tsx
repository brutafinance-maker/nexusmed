import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Dna, 
  Zap,
  Activity,
  Microscope,
  Baby
} from 'lucide-react';
import { reproductiveHistologyData } from '../mockData';

// Custom icons using Lucide
const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" />
    <path d="M12 13v9" />
    <path d="M9 19h6" />
  </svg>
);

const MaleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="14" r="5" />
    <path d="M15 9l6-6" />
    <path d="M21 3h-6" />
    <path d="M21 3v6" />
  </svg>
);

export const ReproductiveDashboard = () => {
  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      <header className="space-y-6">
        <Link to="/teoria/histologia" className="inline-flex items-center gap-2 text-slate-500 hover:text-med-blue font-bold text-sm transition-colors">
          <ArrowLeft size={16} />
          Voltar para Nexus MOL
        </Link>
        <div className="space-y-4">
           <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100">
                 Módulo Especializado
              </span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
             Sistema Reprodutor
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-2xl">
             Explore a histologia detalhada dos sistemas reprodutores e glândulas mamárias.
           </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Section 1: Feminino */}
        <CategorySection 
          title="1. Sistema Reprodutor Feminino"
          icon={<FemaleIcon />}
          color="pink"
          items={reproductiveHistologyData.feminino}
        />

        {/* Section 2: Mamaria */}
        <CategorySection 
          title="2. Glândula Mamária"
          icon={<Baby size={24} />}
          color="rose"
          items={reproductiveHistologyData.mamaria}
        />

        {/* Section 3: Masculino */}
        <CategorySection 
          title="3. Sistema Reprodutor Masculino"
          icon={<MaleIcon />}
          color="blue"
          items={reproductiveHistologyData.masculino}
        />

        {/* Section 4: Correlacoes */}
        <CategorySection 
          title="4. Correlações Histológicas"
          icon={<Zap size={24} />}
          color="amber"
          items={reproductiveHistologyData.correlacoes}
        />
      </div>
    </div>
  );
};

const CategorySection = ({ title, icon, color, items }: any) => {
  const colorMap: any = {
    pink: 'bg-pink-50 text-pink-600 border-pink-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${colorMap[color]} flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item: any) => (
          <Link 
            key={item.id}
            to={
              item.id === 'tuba' ? '/teoria/leitura/histologia/repro/tuba' :
              item.id === 'utero' ? '/teoria/leitura/histologia/repro/utero' :
              item.id === 'colo' ? '/teoria/leitura/histologia/repro/colo' :
              `/teoria/leitura/histologia/repro/${item.id}`
            }
            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-900 group transition-all"
          >
            <span className="text-sm font-bold text-slate-600 group-hover:text-white transition-colors">{item.title}</span>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-white transition-all group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
