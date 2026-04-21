import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TextPlayerProps {
  title: string;
  content: string;
}

export const TextPlayer: React.FC<TextPlayerProps> = ({ title, content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
    >
      {/* Header do Reader */}
      <div className="bg-slate-50 border-b border-slate-200 p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-med-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-med-blue/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Leitura Técnica Premium • Atlas Nexus</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
           <FileText size={14} className="text-med-blue" />
           Formatado para Estudo
        </div>
      </div>

      {/* Área do Conteúdo */}
      <div className="p-10 md:p-16 lg:p-20">
        <div className="space-y-8">
           <div className="flex items-center gap-3 text-med-blue mb-8">
             <div className="h-[2px] w-12 bg-med-blue" />
             <span className="font-black uppercase tracking-[0.2em] text-xs">Unidade Teórica de Fundamentos</span>
           </div>
           
           <div className="prose prose-slate max-w-none 
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
              prose-img:rounded-3xl prose-img:shadow-xl prose-img:mx-auto prose-img:my-10
              prose-strong:text-slate-900 prose-strong:font-black
              prose-pre:bg-slate-900 prose-pre:rounded-2xl
              prose-blockquote:border-l-4 prose-blockquote:border-med-blue prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl
           ">
              <ReactMarkdown 
                components={{
                  h3: ({node, children, ...props}) => {
                    const colors = [
                      'text-indigo-600',
                      'text-emerald-600',
                      'text-rose-600',
                      'text-amber-600',
                      'text-purple-600',
                      'text-teal-600',
                      'text-blue-600'
                    ];
                    // Deterministic color based on text content
                    const text = String(children);
                    const charSum = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const colorIndex = charSum % colors.length;
                    
                    return (
                      <h3 {...props} className={`text-3xl font-black mt-16 mb-8 border-l-8 pl-6 transition-all hover:translate-x-2 ${colors[colorIndex]} border-current shadow-sm py-2 rounded-r-lg bg-slate-50/50`}>
                        {children}
                      </h3>
                    );
                  },
                  img: ({node, ...props}) => (
                    <span className="block my-12 text-center group">
                      <img 
                        {...props} 
                        className="rounded-[2rem] shadow-2xl border border-slate-100 max-h-[600px] mx-auto transition-transform group-hover:scale-[1.02]" 
                        referrerPolicy="no-referrer"
                      />
                      {props.alt && <span className="block mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fig. — {props.alt}</span>}
                    </span>
                  )
                }}
              >
                {content}
              </ReactMarkdown>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                 <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Ponto Chave 01</h4>
                 <p className="text-slate-600 text-sm leading-relaxed">
                   A anatomia clínica exige não apenas a memorização, mas a correlação funcional entre os sistemas.
                 </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                 <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Dica Nexus</h4>
                 <p className="text-slate-600 text-sm leading-relaxed">
                   Sempre correlacione as lâminas de histologia com o estado fisiológico do tecido em questão.
                 </p>
              </div>
           </div>

           <div className="p-10 bg-med-blue/5 rounded-[2rem] border border-med-blue/10 flex flex-col items-center text-center space-y-4">
              <CheckCircle2 size={40} className="text-med-blue" />
              <h4 className="text-2xl font-black text-slate-900">Leitura Concluída?</h4>
              <p className="text-slate-500 max-w-md">Ao finalizar a leitura, o progresso desta unidade será salvo automaticamente. Continue para o próximo sistema.</p>
              <button className="px-8 py-3 bg-med-blue text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-med-blue/20 hover:-translate-y-1 transition-all">
                Próxima Unidade
              </button>
           </div>
        </div>
      </div>

      {/* Footer do Reader */}
      <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
           © Nexus Academy • Conteúdo Autoral Exclusivo
        </div>
        <div className="flex items-center gap-6">
           <button className="text-[10px] text-slate-900 font-black uppercase tracking-widest hover:text-med-blue transition-colors">Anotar Insight</button>
           <button className="text-[10px] text-slate-900 font-black uppercase tracking-widest hover:text-med-blue transition-colors">Baixar PDF</button>
        </div>
      </div>
    </motion.div>
  );
};
