import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { PBLModules } from './pages/PBLModules';
import { ClinicalCase } from './pages/ClinicalCase';
import { QuestionBank } from './pages/QuestionBank';
import { Simulations } from './pages/Simulations';
import { HistologySimulations } from './pages/HistologySimulations';
import { Courses } from './pages/Courses';
import { CourseOverview } from './pages/CourseOverview';
import { CourseDetail } from './pages/CourseDetail';
import { AtlasListing } from './pages/AtlasListing';
import { AtlasReader } from './pages/AtlasReader';
import { ReproductiveDashboard } from './pages/ReproductiveDashboard';
import { ReproductiveReader } from './pages/ReproductiveReader';
import { TubaUterinaDetailedReader } from './pages/repro/TubaUterinaDetailedReader';
import { UteroDetailedReader } from './pages/repro/UteroDetailedReader';
import { CervixDetailedReader } from './pages/repro/CervixDetailedReader';
import { Content } from './pages/Content';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { UserProvider, useUser } from './context/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

const AppRoutes = () => {
  const { user, loading, needsOnboarding } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-slate flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-med-blue-light border-t-med-blue rounded-full animate-spin" />
      </div>
    );
  }

  const showOnboardingOrLogin = !user || needsOnboarding;

  return (
    <Routes>
      {showOnboardingOrLogin ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pbl" element={<PBLModules />} />
          <Route path="pbl/caso/:id" element={<ClinicalCase />} />
          <Route path="questoes" element={<QuestionBank />} />
          <Route path="simulados" element={<Simulations />} />
          <Route path="simulados/histologia" element={<HistologySimulations />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="cursos/overview/:courseId" element={<CourseOverview />} />
          <Route path="cursos/:courseId" element={<CourseOverview />} />
          <Route path="play/:courseId/:lessonId" element={<CourseDetail />} />
          <Route path="conteudo" element={<Content />} />
          <Route path="teoria/:type" element={<AtlasListing />} />
          <Route path="teoria/histologia/repro" element={<ReproductiveDashboard />} />
          <Route path="teoria/leitura/histologia/repro/tuba" element={<TubaUterinaDetailedReader />} />
          <Route path="teoria/leitura/histologia/repro/utero" element={<UteroDetailedReader />} />
          <Route path="teoria/leitura/histologia/repro/colo" element={<CervixDetailedReader />} />
          <Route path="teoria/leitura/histologia/repro/:subId" element={<ReproductiveReader />} />
          <Route path="teoria/leitura/:type/:systemId" element={<AtlasReader />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}
