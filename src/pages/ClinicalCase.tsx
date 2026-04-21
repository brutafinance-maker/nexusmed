import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockClinicalCases } from '../mockData';
import { useUser } from '../context/UserContext';
import { 
  ArrowLeft, 
  Lightbulb, 
  Target, 
  BookOpen, 
  ChevronRight, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ClinicalCase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUserProgress } = useUser();
  const caseItem = mockClinicalCases.find(c => c.id === id);
  const [step, setStep] = useState(1);
  const [hypotheses, setHypotheses] = useState<string[]>([]);
  const [inputHyp, setInputHyp] = useState('');

  if (!user) return null;
  if (!caseItem) return <div className="p-20 text-center font-bold">Caso não encontrado</div>;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const addHypothesis = () => {
    if (inputHyp && !hypotheses.includes(inputHyp)) {
      setHypotheses([...hypotheses, inputHyp]);
      setInputHyp('');
    }
  };

  const finishCase = async () => {
    await updateUserProgress({
       xp: (user.xp || 0) + 100,
       questionsAnswered: (user.progress?.questionsAnswered || 0) + 5
    } as any);
    navigate('/pbl');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32 pt-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/pbl')}
          className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} />
          VOLTAR PARA MÓDULOS
        </button>
        
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-med-blue" : s < step ? "bg-success" : "bg-border"
              )} 
            />
          ))}
        </div>
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pbl-card !p-0 overflow-hidden min-h-[500px]"
      >
        <div className="bg-text-main p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge bg-med-blue text-white">
              {caseItem.discipline}
            </span>
            <h1 className="text-3xl font-bold tracking-tight">{caseItem.title}</h1>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider text-[11px]">Sessão Ativa</span>
          </div>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-med-blue">
                  <MessageSquare size={24} />
                  <h2 className="text-2xl font-bold tracking-tight text-text-main">Situação-Problema</h2>
                </div>
                <div className="bg-bg-slate p-8 rounded-3xl border border-border italic text-lg leading-relaxed text-text-main">
                  "{caseItem.problem}"
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border border-border rounded-3xl bg-white shadow-sm">
                    <h4 className="font-bold text-text-main mb-4 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-med-blue" />
                      Dados Identificados
                    </h4>
                    <ul className="text-sm text-text-muted space-y-3 list-disc pl-5">
                      <li>Paciente idoso (65 anos)</li>
                      <li>Pós-operatório de Artroplastia (5 dias)</li>
                      <li>Início súbito de sintomas</li>
                    </ul>
                  </div>
                  <div className="p-8 border border-border rounded-3xl bg-white shadow-sm">
                    <h4 className="font-bold text-text-main mb-4 flex items-center gap-2">
                      <Target size={18} className="text-red-500" />
                      Sintomas Cardinais
                    </h4>
                    <ul className="text-sm text-text-muted space-y-3 list-disc pl-5">
                      <li>Dispneia Súbita</li>
                      <li>Dor Torácica Pleurítica</li>
                      <li>Taquicardia</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-med-blue">
                  <Lightbulb size={24} />
                  <h2 className="text-2xl font-bold tracking-tight text-text-main">Levantamento de Hipóteses</h2>
                </div>
                <p className="text-text-muted font-medium">Com base nos dados apresentados, quais seriam seus diagnósticos diferenciais iniciais? Liste pelo menos 3.</p>
                
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={inputHyp}
                    onChange={(e) => setInputHyp(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addHypothesis()}
                    placeholder="Digite uma hipótese diagnóstica..." 
                    className="flex-1 px-6 py-4 bg-bg-slate border border-border rounded-2xl focus:bg-white focus:ring-4 focus:ring-med-blue-light outline-none transition-all font-medium"
                  />
                  <button 
                    onClick={addHypothesis}
                    className="px-8 bg-med-blue text-white font-bold rounded-2xl hover:bg-med-blue-dark transition-colors shadow-md"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {hypotheses.map((h, i) => (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      key={i} 
                      className="px-5 py-2.5 bg-med-blue-light text-med-blue border border-med-blue-light rounded-xl font-bold text-sm flex items-center gap-2"
                    >
                      {h}
                      <button onClick={() => setHypotheses(hypotheses.filter((_, idx) => idx !== i))} className="hover:text-med-blue-dark ml-1">×</button>
                    </motion.span>
                  ))}
                  {hypotheses.length === 0 && <p className="text-text-muted italic text-sm">Nenhuma hipótese adicionada ainda...</p>}
                </div>

                {hypotheses.length >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-emerald-700 font-bold flex items-center gap-2">
                       <CheckCircle2 size={18} /> Excelente raciocínio! Clique em avançar para ver o gabarito.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-med-blue">
                  <Target size={24} />
                  <h2 className="text-2xl font-bold tracking-tight text-text-main">Objetivos de Estudos</h2>
                </div>
                <div className="space-y-4">
                  {caseItem.learningGoals.map((goal, i) => (
                    <div key={i} className="flex items-start gap-5 p-7 bg-bg-slate rounded-3xl border border-border transition-all hover:bg-white hover:border-med-blue-light group">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center font-bold text-text-main shrink-0 group-hover:bg-med-blue group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <p className="font-bold text-text-main mt-2 leading-relaxed">{goal}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-med-blue">
                  <BookOpen size={24} />
                  <h2 className="text-2xl font-bold tracking-tight text-text-main">Síntese Teórica</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-text-muted leading-relaxed mb-10 font-medium">{caseItem.theoryContent}</p>
                  <div className="bg-med-blue rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-med-blue/20">
                    <div className="relative z-10">
                      <h4 className="font-bold text-2xl mb-3">Quiz de Consolidação</h4>
                      <p className="text-med-blue-light/80 mb-8 font-medium text-lg">Resolva questões pautadas nos objetivos deste caso para pontuar na trilha.</p>
                      <button className="px-10 py-5 bg-white text-med-blue rounded-2xl font-black hover:bg-med-blue-light transition-all shadow-xl active:scale-95">
                        Começar Questões do Caso
                      </button>
                    </div>
                    <Target size={180} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-bg-slate border-t border-border flex justify-between items-center">
          <button 
            disabled={step === 1}
            onClick={prevStep}
            className="px-8 py-4 border border-border text-text-muted rounded-2xl font-bold hover:bg-white transition-all disabled:opacity-30 active:scale-95"
          >
            Anterior
          </button>
          
          <button 
            onClick={step === 4 ? finishCase : nextStep}
            className="px-12 py-4 bg-med-blue text-white rounded-2xl font-extrabold hover:bg-med-blue-dark transition-all flex items-center gap-3 shadow-lg hover:shadow-med-blue/20 active:scale-95"
          >
            {step === 4 ? 'Concluir Caso' : 'Próxima Etapa'}
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
