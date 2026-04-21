import React from 'react';
import { mockTheory } from '../mockData';
import { 
    BookOpen, 
    FileText, 
    Map as MapIcon, 
    Download, 
    ChevronRight,
    Star,
    Search,
    Dna,
    Microscope,
    Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Content = () => {
    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Base Teórica</h2>
                    <p className="text-slate-500 text-lg">Resumos estruturados, protocolos e mapas mentais focados nos temas mais recorrentes do PBL.</p>
                </div>
                <div className="relative group min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Buscar resumos..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all" />
                </div>
            </header>

            {/* Ciclo Básico Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AtlasEntryCard 
                    title="Atlas Anatomicum"
                    subtitle="Anatomia Humana Completa"
                    description="Explore todos os sistemas do corpo humano com foco em anatomia sistêmica e clínica."
                    icon={Dna}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                    link="/teoria/anatomia"
                />
                <AtlasEntryCard 
                    title="Nexus Mol Digital"
                    subtitle="Histologia e Citologia"
                    description="O guia definitivo de microscopia, cobrindo a histologia de todos os sistemas orgânicos."
                    icon={Microscope}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                    link="/teoria/histologia"
                />
            </div>

            <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Temas Clínicos e Resumos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockTheory.map((topic, i) => (
                    <motion.div 
                        key={topic.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-6 hover:shadow-2xl transition-all group border-b-4 border-b-blue-600"
                    >
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{topic.category}</span>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><Star size={16} /></button>
                                <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><Download size={16} /></button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">{topic.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium">{topic.summary}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-600 tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                                <FileText size={14} />
                                Resumo
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-600 tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                                <MapIcon size={14} />
                                Mapa Mental
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            </div>
            
            {/* CTA for more */}
            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white space-y-6 relative overflow-hidden">
                <h3 className="text-3xl font-black relative z-10">Não encontrou o que procurava?</h3>
                <p className="text-slate-400 max-w-xl mx-auto relative z-10">Toda semana adicionamos novos resumos baseados no feedback dos nossos alunos e nos últimos protocolos publicados.</p>
                <button className="px-10 py-5 bg-blue-600 rounded-2xl font-black relative z-10 hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">Sugerir Tema</button>
                <BookOpen size={200} className="absolute -top-10 -left-10 opacity-5 pointer-events-none" />
                <MapIcon size={150} className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none" />
            </div>
        </div>
    );
};

const AtlasEntryCard = ({ title, subtitle, description, icon: Icon, color, bgColor, link }: any) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all"
    >
        <div className={`w-16 h-16 ${bgColor} ${color} rounded-2x flex items-center justify-center rounded-3xl`}>
            <Icon size={32} />
        </div>
        <div className="space-y-2">
            <p className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{subtitle}</p>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
        </div>
        <Link 
            to={link}
            className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-2xl group/link hover:bg-slate-900 transition-all"
        >
            <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover/link:text-white transition-colors">Acessar Atlas</span>
            <ChevronRight size={18} className="text-slate-400 group-hover/link:text-white transition-all group-hover/link:translate-x-1" />
        </Link>
    </motion.div>
);
