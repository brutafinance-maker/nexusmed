import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-bg-slate selection:bg-med-blue-light selection:text-med-blue">
      <Sidebar />
      <Topbar />
      <main className={cn(
        "md:pl-[220px] h-full min-h-screen pb-20 md:pb-0 transition-all duration-300",
        isHome ? "pt-16 md:pt-20" : "pt-0"
      )}>
        <div className="max-w-7xl mx-auto p-4 md:p-10">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
