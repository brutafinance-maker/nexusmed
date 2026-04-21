import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCourses } from '../mockData';
import { useUser } from '../context/UserContext';
import { VideoPlayer } from '../components/course/VideoPlayer';
import { TextPlayer } from '../components/course/TextPlayer';
import { LessonSidebar } from '../components/course/LessonSidebar';
import { LessonHeader } from '../components/course/LessonHeader';
import { LessonTabs } from '../components/course/LessonTabs';
import { AnimatePresence, motion } from 'motion/react';

export const CourseDetail: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, toggleLessonWatched } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const course = mockCourses.find(c => c.id === courseId);
  const watchedLessons = user?.progress?.watchedLessons || [];

  const allLessons = course?.modules.flatMap(m => m.lessons) || [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const nextLesson = allLessons[currentLessonIndex + 1];

  useEffect(() => {
    // Auto-mark as watched when opening (if user desires automation as per previous context)
    // In this premium version, let's keep it syncable
    if (lessonId && !watchedLessons.includes(lessonId)) {
      // Logic from previous turn could be maintained but we are refactoring.
      // For now, let's just make sure we are focused on the UX.
    }
    
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [lessonId]);

  if (!course) return <div className="p-10 text-center text-white">Curso não encontrado.</div>;

  const progressPercent = Math.round((watchedLessons.filter(id => allLessons.some(l => l.id === id)).length / allLessons.length) * 100);

  return (
    <div className={cn(
      "fixed inset-0 z-[60] flex overflow-hidden",
      currentLesson.content ? "bg-slate-50" : "bg-[#0B1120]"
    )}>
      {/* Sidebar - Integrated Component */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            className="hidden md:block h-full shrink-0"
          >
            <LessonSidebar 
              course={course}
              activeLessonId={currentLesson.id}
              watchedLessons={watchedLessons}
              progressPercent={progressPercent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="md:hidden fixed left-0 top-0 bottom-0 w-[300px] z-[80] shadow-2xl"
          >
            <LessonSidebar 
              course={course}
              activeLessonId={currentLesson.id}
              watchedLessons={watchedLessons}
              progressPercent={progressPercent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative translate-z-0">
        <LessonHeader 
          courseTitle={course.title}
          lessonTitle={currentLesson.title}
          isWatched={watchedLessons.includes(currentLesson.id)}
          onToggleWatched={() => toggleLessonWatched(currentLesson.id)}
          onNext={() => nextLesson && navigate(`/play/${course.id}/${nextLesson.id}`)}
          hasNext={!!nextLesson}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          courseId={course.id}
          isLightMode={!!currentLesson.content}
        />

        <main className="flex-1 w-full p-4 md:p-8 lg:p-12 space-y-12">
          {/* Player Section */}
          <div className="max-w-[1260px] mx-auto w-full">
            {currentLesson.content ? (
              <TextPlayer 
                title={currentLesson.title}
                content={currentLesson.content}
              />
            ) : (
              <VideoPlayer 
                videoUrl={currentLesson.videoUrl || ''}
                title={currentLesson.title}
                onEnded={() => nextLesson && navigate(`/play/${course.id}/${nextLesson.id}`)}
              />
            )}
          </div>

          {/* Details & Tabs Section - Only for Video Lessons maybe? Or keep for both */}
          {!currentLesson.content && (
            <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <span className="px-2.5 py-1 bg-med-blue-light text-med-blue rounded-lg text-[10px] font-black uppercase tracking-widest">Contéudo Principal</span>
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Atualizado recentemente</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
                     {currentLesson.title}
                  </h2>
                  <div className="flex items-center gap-6 pt-2">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5" />
                        <span className="text-xs font-bold text-slate-400">{course.instructor}</span>
                     </div>
                     <div className="w-[1px] h-4 bg-white/5" />
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nexus Academy Professional</span>
                  </div>
               </div>

               <LessonTabs />
            </div>
          )}
        </main>

        <footer className="footer-premium border-t border-white/5 p-8 bg-slate-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-med-blue rounded-full flex items-center justify-center font-black text-white text-xs shadow-lg shadow-med-blue/20">
                 N
              </div>
              <div className="leading-tight">
                 <p className="text-sm font-black text-white">NEXUS MED</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">A melhor experiência em educação médica</p>
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
             Estudando: {progressPercent}% do curso concluído
           </p>
        </footer>
      </div>
    </div>
  );
};

const PlayerFeature = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</p>
    <div className="flex items-center gap-2 text-slate-300">
       <Icon size={14} className="text-med-blue" />
       <span className="text-xs font-bold tracking-tight">{value}</span>
    </div>
  </div>
);

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
