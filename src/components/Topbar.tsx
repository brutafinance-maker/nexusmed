import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

export const Topbar = () => {
  const { user } = useUser();
  const location = useLocation();

  if (location.pathname !== '/') return null;

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[220px] h-16 md:h-20 bg-white border-b border-border z-40 px-4 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
           <div className="w-6 h-6 bg-med-blue rounded-md" />
           <span className="font-extrabold text-med-blue tracking-tighter text-lg">NEXUS</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base md:text-[20px] font-bold text-text-main line-clamp-1">Olá, {user.name}</h1>
          <p className="hidden md:block text-[13px] text-text-muted">Você tem 2 casos PBL pendentes para hoje.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="bg-med-blue-light px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-[14px] font-semibold text-med-blue whitespace-nowrap">
          🔥 {user.progress.streak} dias
        </div>
        
        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-border">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
