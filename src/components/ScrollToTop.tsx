import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We don't auto-scroll to top for the /pbl route because it has its own logic
    if (pathname !== '/pbl' && !pathname.startsWith('/pbl/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
