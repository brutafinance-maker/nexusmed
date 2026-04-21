import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Stethoscope, 
  FileQuestion, 
  ClipboardList, 
  PlayCircle,
  User
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Stethoscope, label: 'PBL', path: '/pbl' },
  { icon: FileQuestion, label: 'Questões', path: '/questoes' },
  { icon: ClipboardList, label: 'Simulados', path: '/simulados' },
  { icon: PlayCircle, label: 'Cursos', path: '/cursos' },
  { icon: User, label: 'Perfil', path: '/perfil' },
];

export const BottomNav = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex items-center justify-around z-50 md:hidden px-2 shadow-2xl">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center gap-1 transition-all duration-200",
            isActive 
              ? "text-med-blue" 
              : "text-text-muted hover:text-text-main"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon size={20} className={cn(isActive && "fill-med-blue/10")} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
