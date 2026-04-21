import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  Settings, 
  ChevronRight, 
  Award, 
  History, 
  PieChart, 
  Map,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';

export const Profile = () => {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="relative group">
                    <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] border-4 border-white shadow-2xl object-cover" 
                        referrerPolicy="no-referrer"
                    />
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-med-blue text-white rounded-lg md:rounded-xl border-4 border-white flex items-center justify-center hover:bg-med-blue-dark transition-colors shadow-lg">
                        <Edit3 size={16} className="md:w-4.5 md:h-4.5" />
                    </button>
                </div>
                <div className="text-center md:text-left space-y-3 md:space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-4xl font-bold text-text-main tracking-tight">{user.name}</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2">
                           <span className="text-med-blue font-bold text-sm md:text-base">@{user.nickname}</span>
                           <span className="hidden sm:block w-1 h-1 bg-border rounded-full" />
                           <p className="text-text-muted font-bold uppercase text-[10px] md:text-[11px] tracking-widest">Estudante de Medicina</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <span className="badge bg-text-main text-white">Nível {user.level}</span>
                        <span className="badge bg-med-blue-light text-med-blue">{user.xp} XP acumulado</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ProfileCard icon={History} label="Histórico de Acesso" value="Ativo hoje" sub="Consistência Exemplar" />
                    <ProfileCard icon={Award} label="Conquistas" value="12 Badges" sub="3 novos esse mês" />
                    <div className="pbl-card col-span-full">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight">
                            <PieChart className="text-med-blue" />
                            Distribuição de Conhecimento
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {Object.entries(user.progress.byCategory).map(([cat, val]) => (
                                <div key={cat} className="flex flex-col items-center gap-3 p-4 bg-bg-slate rounded-2xl border border-border">
                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                       <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="#0A55D1" strokeWidth="4" strokeDasharray={175.92} strokeDashoffset={175.92 - (175.92 * (val as number)) / 100} strokeLinecap="round" />
                                       </svg>
                                       <span className="absolute text-[10px] font-black">{val}%</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-text-muted uppercase text-center leading-tight tracking-tight">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="pbl-card space-y-6">
                        <h4 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                            <Settings className="text-text-muted" />
                            Configurações
                        </h4>
                        <div className="space-y-2">
                             {[
                                { icon: Map, label: 'Preferências de Trilha' },
                                { icon: Award, label: 'Verificados e Certificados' },
                                { icon: ShieldCheck, label: 'Privacidade e Segurança' }
                             ].map((opt, i) => (
                                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-bg-slate rounded-2xl transition-colors group">
                                    <div className="flex items-center gap-3 text-sm font-bold text-text-muted">
                                        <opt.icon size={18} className="text-text-muted" />
                                        {opt.label}
                                    </div>
                                    <ChevronRight size={16} className="text-border group-hover:text-med-blue group-hover:translate-x-1 transition-all" />
                                </button>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileCard = ({ icon: Icon, label, value, sub }: any) => (
    <div className="pbl-card !p-8 flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-bg-slate flex items-center justify-center text-med-blue">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</p>
            <h4 className="text-xl font-bold text-text-main tracking-tight">{value}</h4>
            <p className="text-xs text-med-blue font-bold mt-1 uppercase tracking-widest">{sub}</p>
        </div>
    </div>
);

const ShieldCheck = ({ size, className }: any) => <Award size={size || 18} className={className} />;
