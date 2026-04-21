import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { anatomyAtlas, histologyAtlas } from '../mockData';
import { TextPlayer } from '../components/course/TextPlayer';

export const AtlasReader = () => {
    const { type, systemId } = useParams<{ type: string, systemId: string }>();
    const isAnatomy = type === 'anatomia';
    const data = isAnatomy ? anatomyAtlas : histologyAtlas;
    const system = data.find(s => s.id === systemId);

    if (!system) return <div className="p-10 text-center">Sistema não encontrado.</div>;

    return (
        <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4">
            <header className="pt-6">
                <Link 
                    to={`/teoria/${type}`} 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-med-blue font-bold text-sm transition-colors"
                >
                    <ArrowLeft size={16} />
                    Voltar para o Atlas
                </Link>
            </header>

            <TextPlayer 
                title={system.title}
                content={system.content}
            />
        </div>
    );
};
