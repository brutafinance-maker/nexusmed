import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  PenTool, 
  ScreenShare, 
  Microscope,
  Clock,
  ChevronRight,
  AlertCircle,
  FileText,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { pblModules } from '../mockData';
import { cn } from '../lib/utils';
import { histologyModule7Data, discursiveModule7Data } from '../data/simuladoModulo7';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Step = 'module-selection' | 'config' | 'simulation';

interface QuizItem {
    type: 'slide' | 'discursive';
    data: any;
    selectedQuestions?: any[];
}

export const HistologySimulations = () => {
    const [step, setStep] = useState<Step>('module-selection');
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [timerOption, setTimerOption] = useState<number>(45); // seconds
    const [responseMethod, setResponseMethod] = useState<'paper' | 'digital'>('digital');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timerOption);
    const [isFinished, setIsFinished] = useState(false);
    const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

    // Robust Simulation Control
    useEffect(() => {
        let interval: any;
        if (step === 'simulation' && !isFinished && quizItems.length > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) return prev - 1;
                    return 0;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, isFinished]);

    // Advancement Logic based on Time
    useEffect(() => {
        if (step === 'simulation' && !isFinished && timeLeft === 0) {
            setCurrentQuestionIndex(curr => {
                if (curr < quizItems.length - 1) {
                    return curr + 1;
                } else {
                    setIsFinished(true);
                    return curr;
                }
            });
        }
    }, [timeLeft, step, isFinished, quizItems.length]);

    // Reset Timer on Index Change (Manual or Auto)
    useEffect(() => {
        if (step === 'simulation' && !isFinished) {
            setTimeLeft(timerOption);
        }
    }, [currentQuestionIndex]);

    const generateQuiz = (modId: string) => {
        let items: QuizItem[] = [];
        if (modId === '7') {
            // Pick 10 random slides
            const shuffledSlides = [...histologyModule7Data].sort(() => 0.5 - Math.random());
            const selectedSlides = shuffledSlides.slice(0, 10);

            items = selectedSlides.map(slide => {
                const corte = slide.questions.find(q => q.label.toLowerCase().includes('corte') || q.label.toLowerCase().includes('órgão/tecido'));
                const tecido = slide.questions.find(q => q.label.toLowerCase().includes('tipo de tecido'));
                const others = slide.questions.filter(q => q !== corte && q !== tecido);
                const randomOther = others[Math.floor(Math.random() * others.length)];
                
                const selectedQuestions = [corte, tecido, randomOther].filter(Boolean);
                return { type: 'slide' as const, data: slide, selectedQuestions };
            });

            // Pick 2 random discursive
            const shuffledDiscursive = [...discursiveModule7Data].sort(() => 0.5 - Math.random());
            const selectedDiscursive: QuizItem[] = shuffledDiscursive.slice(0, 2).map(d => ({ 
                type: 'discursive' as const, 
                data: d 
            }));

            items = [...items, ...selectedDiscursive];
        } else {
            // Default generic empty simulation for other modules
            items = Array(12).fill(null).map((_, i) => ({ 
                type: 'slide' as const, 
                data: { id: `gen-${i}`, target: 'Estrutura Genérica' },
                selectedQuestions: [{ label: 'Identifique', answer: '...' }]
            }));
        }

        setQuizItems(items);
    };

    const handleModuleSelect = (mod: any) => {
        setSelectedModule(mod);
        generateQuiz(mod.id);
        setStep('config');
    };

    const startSimulation = () => {
        setStep('simulation');
        setIsFinished(false);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
    };

    const reset = () => {
        setStep('module-selection');
        setIsFinished(false);
        setCurrentQuestionIndex(0);
    };

    const downloadAnalysis = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text('Análise de Simulado de Histologia', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Módulo: ${selectedModule?.title}`, 20, 30);
        doc.text(`Tempo por estação: ${timerOption}s`, 20, 35);
        doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 40);

        const tableData = quizItems.map((item, index) => {
            if (item.type === 'slide') {
                const subQuestions = item.selectedQuestions?.map(q => `${q.label}: ${q.answer}`).join('\n') || '';
                return [index + 1, 'Lâmina', item.data.target, subQuestions];
            } else {
                return [index + 1, 'Dissertativa', item.data.question.substring(0, 30) + '...', item.data.answer];
            }
        });

        autoTable(doc, {
            startY: 50,
            head: [['#', 'Tipo', 'Identificação/Pergunta', 'Resposta Esperada']],
            body: tableData,
        });

        doc.save(`Analise_Simulado_Modulo_${selectedModule?.id}.pdf`);
    };

    const currentItem = quizItems[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-bg-slate pb-20">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                
                {/* Header dinâmico */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-med-blue/10 text-med-blue rounded-full text-[10px] font-black uppercase tracking-widest border border-med-blue/20">
                                Simulados Práticos
                            </span>
                            {step !== 'module-selection' && (
                                <button 
                                    onClick={() => setStep(step === 'config' ? 'module-selection' : 'config')}
                                    className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
                                >
                                    <ArrowLeft size={12} /> Voltar
                                </button>
                            )}
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            {step === 'simulation' ? 'Simulado de Rotação' : 'Histologia: Prova de Trocou'}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {step === 'module-selection' && 'Selecione um módulo para iniciar o treinamento prático de microscopia.'}
                            {step === 'config' && `Configurando simulado para o ${selectedModule?.title}`}
                            {step === 'simulation' && `Identifique a estrutura na lâmina histológica antes do tempo acabar.`}
                        </p>
                    </div>

                    {step === 'simulation' && (
                        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Estação</p>
                                <p className="text-2xl font-black text-slate-900 leading-none">{currentQuestionIndex + 1} / {quizItems.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-med-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-med-blue/20">
                                <Microscope size={24} />
                            </div>
                        </div>
                    )}
                </header>

                <AnimatePresence mode="wait">
                    {/* STEP 1: MODULE SELECTION */}
                    {step === 'module-selection' && (
                        <motion.div 
                            key="selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {pblModules.map((mod) => (
                                <button
                                    key={mod.id}
                                    onClick={() => handleModuleSelect(mod)}
                                    className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-med-blue/30 transition-all text-left group flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">PBL {mod.cycle}</p>
                                        <h3 className="text-lg font-black text-slate-800 group-hover:text-med-blue transition-colors line-clamp-1">{mod.title}</h3>
                                        {mod.id === '7' && <span className="text-[10px] text-emerald-600 font-black uppercase mt-2 block">Banco de Imagens Pronto</span>}
                                    </div>
                                    <ChevronRight size={20} className="text-slate-300 group-hover:text-med-blue group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* STEP 2: CONFIGURATION */}
                    {step === 'config' && (
                        <motion.div 
                            key="config"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-2xl space-y-12 max-w-3xl mx-auto"
                        >
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={16} className="text-med-blue" />
                                        Tempo por Estação
                                    </h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[30, 45, 60].map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setTimerOption(time)}
                                                className={cn(
                                                    "py-4 rounded-2xl font-black text-sm transition-all border-2",
                                                    timerOption === time ? "bg-med-blue text-white border-med-blue shadow-lg shadow-med-blue/20" : "bg-slate-50 text-slate-500 border-transparent hover:border-slate-200"
                                                )}
                                            >
                                                {time}s
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <PenTool size={16} className="text-med-blue" />
                                        Método de Resposta
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setResponseMethod('paper')}
                                            className={cn(
                                                "p-6 rounded-2xl flex items-center gap-4 border-2 transition-all text-left",
                                                responseMethod === 'paper' ? "bg-med-blue/5 border-med-blue text-med-blue" : "bg-slate-50 border-transparent hover:border-slate-200 text-slate-500"
                                            )}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                <PenTool size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold">Papel e Caneta</p>
                                                <p className="text-[10px] opacity-70">Escreva em uma folha física</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setResponseMethod('digital')}
                                            className={cn(
                                                "p-6 rounded-2xl flex items-center gap-4 border-2 transition-all text-left",
                                                responseMethod === 'digital' ? "bg-med-blue/5 border-med-blue text-med-blue" : "bg-slate-50 border-transparent hover:border-slate-200 text-slate-500"
                                            )}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                <ScreenShare size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold">Direto no Simulador</p>
                                                <p className="text-[10px] opacity-70">Digite as respostas na tela</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={startSimulation}
                                className="w-full py-6 bg-med-blue text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-med-blue/30 hover:-translate-y-1 hover:shadow-med-blue/40 transition-all flex items-center justify-center gap-3"
                            >
                                <Play size={24} fill="currentColor" />
                                Iniciar Prova de Trocou
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: SIMULATION PLAYER */}
                    {step === 'simulation' && (
                        <motion.div 
                            key="simulation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {!isFinished ? (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Esquerda: Lâmina */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="relative aspect-video bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
                                            {currentItem?.type === 'slide' ? (
                                                currentItem.data.image ? (
                                                    <img 
                                                        src={currentItem.data.image} 
                                                        alt="Lâmina Histológica"
                                                        className="w-full h-full object-cover"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner mb-4 animate-pulse">
                                                                <Microscope size={40} className="text-slate-200" />
                                                        </div>
                                                        <p className="font-black uppercase tracking-widest text-xs">Preparando Lâmina Histológica...</p>
                                                        <p className="text-[10px] font-bold text-slate-300 mt-2">Módulo: {selectedModule?.title}</p>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-100 p-12 text-center">
                                                    <div className="w-20 h-20 bg-med-blue/10 text-med-blue rounded-full flex items-center justify-center mb-6">
                                                        <FileText size={40} />
                                                    </div>
                                                    <h3 className="text-2xl font-black tracking-tight mb-4 uppercase">Questão Dissertativa</h3>
                                                    <p className="text-lg font-bold leading-relaxed">
                                                        {currentItem.data.question}
                                                    </p>
                                                    <div className="mt-8 px-6 py-2 bg-med-blue/5 border border-med-blue/20 rounded-full text-[10px] font-black uppercase tracking-widest text-med-blue">
                                                        Foco em características-chave
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Timer Overlay */}
                                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Tempo Restante</p>
                                                    <p className={cn(
                                                        "text-3xl font-black tabular-nums transition-colors",
                                                        timeLeft <= 5 ? "text-rose-600 animate-pulse" : "text-med-blue"
                                                    )}>
                                                        0:{timeLeft.toString().padStart(2, '0')}
                                                    </p>
                                                </div>
                                                <Timer className={timeLeft <= 5 ? "text-rose-600" : "text-med-blue"} />
                                            </div>

                                            {/* Estágio Visual (Animação de círculo) */}
                                            <div className="absolute bottom-8 left-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <Activity size={14} className="text-med-blue animate-pulse" />
                                                Ativo • Estação {currentQuestionIndex + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Direita: Interação */}
                                    <div className="space-y-6">
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                                            {currentItem.type === 'slide' && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Perguntas da Estação</h4>
                                                    <ul className="space-y-3">
                                                        {currentItem.selectedQuestions?.map((q, i) => (
                                                            <li key={i} className="flex gap-3">
                                                                <span className="w-5 h-5 rounded bg-med-blue/10 text-med-blue flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                                                                <p className="text-sm font-bold text-slate-700">{q.label}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {responseMethod === 'digital' ? (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sua Resposta</h4>
                                                    <textarea 
                                                        value={userAnswers[currentQuestionIndex] || ''}
                                                        onChange={(e) => setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: e.target.value }))}
                                                        placeholder={currentItem.type === 'slide' ? "1. Estrutura X\n2. Tecido Y\n3. Característica Z" : "Digite sua resposta detalhada..."}
                                                        className="w-full h-40 p-6 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-med-blue focus:bg-white transition-all text-sm font-medium resize-none shadow-inner"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-6 text-center">
                                                    <div className="w-16 h-16 bg-med-blue/5 text-med-blue rounded-2xl flex items-center justify-center mx-auto">
                                                        <PenTool size={32} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="text-lg font-black text-slate-900">Modo Papel Ativo</h4>
                                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                            Aproveite os {timerOption}s para analisar e anotar tudo em seu papel físico.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-8 border-t border-slate-100">
                                                 <div className="flex items-center justify-between mb-4">
                                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso Total</span>
                                                     <span className="text-[10px] font-black text-med-blue uppercase tracking-widest">{Math.round(((currentQuestionIndex + 1) / quizItems.length) * 100)}%</span>
                                                 </div>
                                                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                     <motion.div 
                                                         initial={{ width: 0 }}
                                                         animate={{ width: `${((currentQuestionIndex + 1) / quizItems.length) * 100}%` }}
                                                         className="h-full bg-med-blue rounded-full"
                                                     />
                                                 </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => {
                                                if (currentQuestionIndex < quizItems.length - 1) {
                                                    setCurrentQuestionIndex(prev => prev + 1);
                                                } else {
                                                    setIsFinished(true);
                                                }
                                            }}
                                            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg"
                                        >
                                            {currentQuestionIndex < quizItems.length - 1 ? 'Próxima Estação' : 'Finalizar Rotação'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {isFinished && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                                        >
                                            <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                                                onClick={() => {}} // Block clicks
                                            />
                                            
                                            <motion.div 
                                                initial={{ scale: 0.9, y: 20 }}
                                                animate={{ scale: 1, y: 0 }}
                                                className="relative w-full max-w-xl bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-white/20 space-y-8"
                                            >
                                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                                                    <CheckCircle2 size={48} />
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Rotação Finalizada!</h2>
                                                    <p className="text-lg text-slate-500 font-medium leading-relaxed px-4">
                                                        Você completou o simulado prático do <b>{selectedModule?.title}</b>. O que deseja fazer agora?
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 pt-4">
                                                    <button 
                                                        onClick={downloadAnalysis}
                                                        className="flex items-center justify-between p-6 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all group shadow-xl shadow-emerald-600/20"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-white/10 rounded-xl">
                                                                <Download size={24} />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="font-black">BAIXAR ANÁLISE</p>
                                                                <p className="text-[10px] opacity-70 font-bold capitalize">Análise estruturada (PDF)</p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>

                                                    <button 
                                                        onClick={() => {
                                                            setIsFinished(false);
                                                            setStep('config');
                                                        }}
                                                        className="flex items-center justify-between p-6 bg-slate-100 text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all group"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                                                <ArrowLeft size={24} />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="font-black">VOLTAR PARA CONFIGURAÇÃO</p>
                                                                <p className="text-[10px] text-slate-500 font-bold capitalize tracking-normal italic mt-1">Ajustar tempo ou método</p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>

                                                    <button 
                                                        onClick={reset}
                                                        className="flex items-center justify-center p-4 bg-transparent text-slate-400 rounded-3xl font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-all group"
                                                    >
                                                        Sair do Simulado
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Activity = ({ className, size }: { className?: string, size?: number }) => (
    <svg viewBox="0 0 24 24" width={size || "24"} height={size || "24"} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);
