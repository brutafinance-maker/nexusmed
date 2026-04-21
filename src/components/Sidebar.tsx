import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileQuestion, 
  ClipboardList, 
  PlayCircle, 
  Award, 
  User, 
  Settings,
  LogOut,
  Stethoscope
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Stethoscope, label: 'Trilha PBL', path: '/pbl' },
  { icon: FileQuestion, label: 'Questões', path: '/questoes' },
  { icon: ClipboardList, label: 'Simulados', path: '/simulados' },
  { icon: PlayCircle, label: 'Cursos', path: '/cursos' },
  { icon: BookOpen, label: 'Conteúdo Teórico', path: '/conteudo' },
];

export const Sidebar = () => {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-border hidden md:flex flex-col z-50">
      <div className="pt-8 pb-6 px-6 flex items-center gap-2">
        <div className="w-7 h-7 bg-med-blue rounded-md shrink-0" />
        <h1 className="text-2xl font-extrabold text-med-blue tracking-tighter">
          NEXUS<span className="font-light">MED</span>
        </h1>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-6 py-3 transition-all duration-200 font-medium text-[14px]",
              isActive 
                ? "bg-med-blue-light text-med-blue border-r-[3px] border-med-blue" 
                : "text-text-muted hover:bg-slate-50 hover:text-text-main"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-border">
        <div className="mb-3">
          <div className="text-[12px] text-text-muted mb-1 uppercase font-bold tracking-wider">NÍVEL {user.level}</div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-med-blue rounded-full" style={{ width: `${Math.min((user.xp / 1000) * 100, 100)}%` }} />
          </div>
          <div className="text-[11px] font-semibold mt-1 text-text-main">{user.xp}/1000 XP</div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 py-2 text-text-muted hover:text-red-600 transition-all font-medium mt-4"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
