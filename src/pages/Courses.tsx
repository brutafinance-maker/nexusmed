import React from 'react';
import { mockCourses } from '../mockData';
import { Play, Clock, BookOpen, Star, Trophy, Users, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Courses = () => {
  const osceCourse = mockCourses.find(c => c.id === 'medcof-osce');

  return (
    <div className="space-y-12 pb-32">
      <header className="max-w-2xl">
        <h2 className="text-4xl font-black text-text-main tracking-tight mb-4">Nexus Academy</h2>
        <p className="text-text-muted text-lg font-medium">Aprenda com os melhores nomes da medicina. Cursos focados em alto rendimento e prática clínica.</p>
      </header>

      {/* Featured Course */}
      {osceCourse && (
        <section className="bg-slate-900 rounded-[2.5rem] p-4 text-white overflow-hidden relative shadow-2xl group">
          <div className="flex flex-col lg:flex-row items-stretch gap-10 p-6 md:p-10 relative z-10">
            <div className="lg:w-1/2 aspect-video overflow-hidden rounded-3xl relative">
              <img 
                src={osceCourse.thumbnail} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Curso de Destaque"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Link to={`/cursos/${osceCourse.id}`} className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 scale-90 group-hover:scale-100 transition-all">
                  <Play fill="white" size={32} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-med-blue font-bold uppercase tracking-widest text-xs">
                <Trophy size={16} />
                Curso em Destaque
              </div>
              <div>
                <h3 className="text-4xl font-black leading-tight tracking-tight mb-2">{osceCourse.title}</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{osceCourse.instructor}</p>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">{osceCourse.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2"><Clock size={16} className="text-med-blue" /> Preparação Intensiva</div>
                  <div className="flex items-center gap-2"><BookOpen size={16} className="text-med-blue" /> {osceCourse.modules[0]?.lessons.length || 0} Aulas de GO</div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">OSCE Masterclass</div>
              </div>
              <Link to={`/cursos/${osceCourse.id}`} className="w-full sm:w-fit px-12 py-4 bg-med-blue text-white rounded-2xl font-black hover:bg-med-blue-dark transition-all shadow-xl shadow-med-blue/20 text-center">
                ACESSAR AGORA
              </Link>
            </div>
          </div>
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-med-blue/20 rounded-full blur-[100px] -mr-40 -mt-40" />
        </section>
      )}

      {/* Course Grid */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-black text-text-main tracking-tight">Outras Certificações</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['Todos', 'Prática', 'Internato', 'Residência'].map(t => (
                    <button key={t} className="whitespace-nowrap px-4 py-2 border border-border rounded-xl text-sm font-bold bg-white hover:bg-med-blue-light hover:text-med-blue transition-all">{t}</button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCourses.filter(c => c.id !== 'medcof-osce').map((course, i) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] border border-border overflow-hidden group hover:shadow-2xl transition-all hover:border-med-blue/30"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2">
                   <span className="px-3 py-1 bg-med-blue-light text-med-blue rounded-full text-[9px] font-black uppercase tracking-widest">
                     {course.category}
                   </span>
                </div>
                <h4 className="text-xl font-bold text-text-main group-hover:text-med-blue transition-colors tracking-tight line-clamp-2">
                  {course.title}
                </h4>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                   <div className="flex items-center gap-2 text-text-muted">
                      <Users size={14} />
                      <span className="text-xs font-bold">Nexus Student</span>
                   </div>
                   <Link to={`/cursos/${course.id}`} className="p-2 bg-bg-slate rounded-lg text-text-muted hover:bg-med-blue hover:text-white transition-all">
                      <ChevronRight size={18} />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
