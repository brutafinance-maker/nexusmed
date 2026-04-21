import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cervixData } from '../../data/cervixData';
import { TextPlayer } from '../../components/course/TextPlayer';

export const CervixDetailedReader = () => {
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
                title="Colo do Útero — Histologia e Zona de Transformação"
                content={cervixData}
            />
        </div>
    );
};
