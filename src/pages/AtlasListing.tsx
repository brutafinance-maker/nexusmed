import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Dna, 
  Microscope, 
  ChevronRight, 
  Search,
  Activity,
  Wind,
  Droplets,
  Zap,
  Layers,
  Shield,
  Heart
} from 'lucide-react';
import { anatomyAtlas, histologyAtlas } from '../mockData';

const getIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('cardio') || t.includes('coração')) return Heart;
  if (t.includes('resp') || t.includes('pulmão')) return Wind;
  if (t.includes('diges')) return Activity;
  if (t.includes('uriná')) return Droplets;
  if (t.includes('nervos')) return Zap;
  if (t.includes('endo') || t.includes('hormô')) return Shield;
  if (t.includes('tegumen') || t.includes('pele')) return Layers;
  return Activity;
};

export const AtlasListing = () => {
  const { type } = useParams<{ type: string }>();
  const isAnatomy = type === 'anatomia';
  const data = isAnatomy ? anatomyAtlas : histologyAtlas;
  const title = isAnatomy ? 'Atlas Anatomicum' : 'Nexus Mol Digital';
  const Icon = isAnatomy ? Dna : Microscope;

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      <header className="space-y-6">
        <Link to="/conteudo" className="inline-flex items-center gap-2 text-slate-500 hover:text-med-blue font-bold text-sm transition-colors">
          <ArrowLeft size={16} />
          Voltar para Base Teórica
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className={`px-3 py-1 ${isAnatomy ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'} rounded-full text-[10px] font-black uppercase tracking-widest border border-current/10`}>
                    Módulo de Fundamentos
                 </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                {title}
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl">
                Base teórica completa dividida por sistemas do corpo humano. Selecione um sistema para iniciar sua revisão técnica.
              </p>
           </div>
           
           <div className="relative group min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar sistema..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
              />
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((system, i) => {
          const SystemIcon = getIcon(system.title);
          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={system.id === 'his-repro' ? '/teoria/histologia/repro' : `/teoria/leitura/${type}/${system.id}`}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:shadow-xl hover:border-med-blue/30 transition-all group"
              >
                <div className="flex items-center gap-5">
                   <div className={`p-4 ${isAnatomy ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'} rounded-2xl group-hover:scale-110 transition-transform`}>
                      <SystemIcon size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-med-blue transition-colors">
                        {system.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Conceitos & Estruturas</p>
                   </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-med-blue group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
