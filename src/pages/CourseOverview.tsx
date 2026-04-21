import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses } from '../mockData';
import { useUser } from '../context/UserContext';
import { 
  Play, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp,
  Clock,
  BookOpen,
  Trophy,
  Users,
  ShieldCheck,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CourseOverview = () => {
  const { courseId } = useParams();
  const { user } = useUser();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const course = mockCourses.find(c => c.id === courseId);
  const watchedLessons = user?.progress?.watchedLessons || [];

  if (!course) return <div className="p-10">Curso não encontrado.</div>;

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const watchedCount = course.modules.reduce((acc, m) => 
    acc + m.lessons.filter(l => watchedLessons.includes(l.id)).length, 0
  );
  const progressPercent = Math.round((watchedCount / totalLessons) * 100);

  return (
    <div className="space-y-10 pb-32 max-w-5xl mx-auto">
      {/* Navigation and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link to="/cursos" className="inline-flex items-center gap-2 text-text-muted hover:text-med-blue font-bold text-sm transition-colors">
            <ArrowLeft size={16} />
            Voltar para Academy
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-0.5 bg-med-blue-light text-med-blue rounded text-[10px] font-black uppercase tracking-widest">
                 Curso Professional
               </span>
               <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">• {course.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">{course.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {watchedCount > 0 && (
             <div className="hidden sm:block text-right">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Seu Progresso</p>
                <p className="text-sm font-bold text-med-blue">{progressPercent}% Concluído</p>
             </div>
           )}
           <Link 
             to={`/play/${course.id}/${course.modules[0]?.lessons[0]?.id}`}
             className="px-10 py-4 bg-med-blue text-white rounded-2xl font-black hover:bg-med-blue-dark transition-all shadow-xl shadow-med-blue/20 flex items-center gap-3 active:scale-95"
           >
              {watchedCount > 0 ? 'CONTINUAR ESTUDOS' : 'COMEÇAR CURSO'}
              <Play size={18} fill="currentColor" />
           </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Course Info */}
        <div className="lg:col-span-2 space-y-10">
          <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
             <img 
               src={course.thumbnail} 
               alt={course.title} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="space-y-6">
             <h3 className="text-2xl font-bold text-text-main">Sobre este curso</h3>
             <p className="text-lg text-text-muted leading-relaxed font-medium">
               {course.description}
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
                <InfoItem icon={Clock} label="Preparação Intensiva" />
                <InfoItem icon={BookOpen} label={`${totalLessons} Aulas em HD`} />
                <InfoItem icon={Users} label="Grupo Medcof" />
                <InfoItem icon={ShieldCheck} label="Suporte Premium" />
             </div>
          </div>

          {/* Module List (The "Hotmart" feel) */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-text-main">Módulos e Aulas</h3>
                <span className="text-sm font-bold text-text-muted">{course.modules.length} Módulos</span>
             </div>
             
             <div className="space-y-4">
                {course.modules.map((module) => {
                  const isExpanded = expandedModules.includes(module.id);
                  const moduleWatched = module.lessons.filter(l => watchedLessons.includes(l.id)).length;
                  
                  return (
                    <div key={module.id} className="bg-white rounded-2xl border border-border overflow-hidden transition-all hover:border-med-blue/30 shadow-sm">
                       <button 
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                       >
                          <div className="flex items-center gap-4">
                             <div className={cn(
                               "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                               moduleWatched === module.lessons.length ? "bg-success text-white" : "bg-bg-slate text-med-blue"
                             )}>
                                {moduleWatched === module.lessons.length ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
                             </div>
                             <div>
                                <h4 className="font-bold text-text-main text-lg">{module.title}</h4>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">
                                   {module.lessons.length} aulas • {moduleWatched} concluídas
                                </p>
                             </div>
                          </div>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                       </button>

                       <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-bg-slate/30"
                            >
                               <div className="p-4 space-y-2">
                                  {module.lessons.map((lesson) => {
                                    const isWatched = watchedLessons.includes(lesson.id);
                                    return (
                                      <Link 
                                        key={lesson.id}
                                        to={`/play/${course.id}/${lesson.id}`}
                                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-border/50 hover:border-med-blue transition-all group"
                                      >
                                         <div className="flex items-center gap-4">
                                            <PlayCircle size={18} className={cn(isWatched ? "text-success" : "text-slate-300 group-hover:text-med-blue")} />
                                            <span className={cn("text-sm font-bold", isWatched ? "text-text-muted" : "text-text-main")}>{lesson.title}</span>
                                         </div>
                                         {isWatched && <CheckCircle2 size={16} className="text-success" />}
                                      </Link>
                                    );
                                  })}
                               </div>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>

        {/* Sidebar - Quick Stats */}
        <div className="space-y-8">
           <div className="pbl-card !p-8 space-y-6">
              <div className="flex items-center gap-3 text-med-blue mb-4">
                 <Trophy size={24} />
                 <span className="font-black uppercase tracking-tight">O que você vai aprender</span>
              </div>
              <ul className="space-y-4">
                 <BenefitItem text="Check-lists reais de provas práticas" />
                 <BenefitItem text="Manejos atualizados baseados no Medcof" />
                 <BenefitItem text="Postura mediadora e comunicação clara" />
                 <BenefitItem text="Simulações de OSCE 100% gravadas" />
              </ul>
              <div className="pt-6 border-t border-border mt-6">
                 <div className="flex items-center gap-4">
                    <img 
                      src="https://picsum.photos/seed/medcof/100/100" 
                      alt="Instructor" 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md" 
                    />
                    <div>
                       <p className="text-xs font-black text-text-muted uppercase tracking-widest">Instrutor</p>
                       <p className="text-sm font-bold text-text-main">Equipe Grupo Medcof</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-bg-slate border border-border rounded-xl text-xs font-bold text-text-muted">
    <Icon size={14} className="text-med-blue" />
    {label}
  </div>
);

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm font-medium text-text-muted">
     <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
     {text}
  </li>
);

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
