import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { reproductiveHistologyData } from '../mockData';
import { TextPlayer } from '../components/course/TextPlayer';

export const ReproductiveReader = () => {
    const { subId } = useParams<{ subId: string }>();
    
    // Flatten all data to find the right item
    const allItems = [
      ...reproductiveHistologyData.feminino,
      ...reproductiveHistologyData.mamaria,
      ...reproductiveHistologyData.masculino,
      ...reproductiveHistologyData.correlacoes
    ];
    
    const system = allItems.find(s => s.id === subId);

    if (!system) return <div className="p-10 text-center">Tópico reprodutor não encontrado.</div>;

    return (
        <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4">
            <header className="pt-6">
                <Link 
                    to="/teoria/histologia/repro" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-med-blue font-bold text-sm transition-colors"
                >
                    <ArrowLeft size={16} />
                    Voltar para o Dashboard Reprodutor
                </Link>
            </header>

            <TextPlayer 
                title={system.title}
                content={system.content}
            />
        </div>
    );
};
