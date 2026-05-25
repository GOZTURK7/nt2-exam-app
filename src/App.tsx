import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProgramDay, Skill } from './types';
import AppBar from './components/layout/AppBar';
import BottomNav from './components/layout/BottomNav';
import type { MainTab } from './components/layout/BottomNav';
import TodayScreen from './components/today/TodayScreen';
import Dashboard from './components/dashboard/Dashboard';
import ExamScreen from './components/exam/ExamScreen';
import StudyScreen from './components/study/StudyScreen';
import ReviewSession from './components/study/ReviewSession';
import ExamSimulation from './components/study/ExamSimulation';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const [activeTab,   setActiveTab]   = useState<MainTab>('today');
  const [activeSkill, setActiveSkill] = useState<Skill>('spreken');
  const [selectedDay, setSelectedDay] = useState<ProgramDay | null>(null);
  const [reviewOpen,  setReviewOpen]  = useState(false);
  const [simOpen,     setSimOpen]     = useState(false);
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#04080f' : '#f0f4f9');
    }
  }, [isDark]);

  const isOverlay = !!selectedDay || reviewOpen || simOpen;

  const handleDaySelectFromToday = (day: ProgramDay, skill: Skill) => {
    setActiveSkill(skill);
    setSelectedDay(day);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <AppBar />
      <main className="flex-1 overflow-y-auto pb-20">
        {selectedDay ? (
          <StudyScreen
            day={selectedDay}
            skill={activeSkill}
            onBack={() => setSelectedDay(null)}
          />
        ) : reviewOpen ? (
          <ReviewSession onClose={() => setReviewOpen(false)} />
        ) : simOpen ? (
          <ExamSimulation onClose={() => setSimOpen(false)} />
        ) : activeTab === 'today' ? (
          <TodayScreen
            onReviewOpen={() => setReviewOpen(true)}
            onDaySelect={handleDaySelectFromToday}
            onGoToExam={() => setActiveTab('exam')}
          />
        ) : activeTab === 'study' ? (
          <Dashboard
            activeSkill={activeSkill}
            onSkillChange={setActiveSkill}
            onDaySelect={setSelectedDay}
            onReviewOpen={() => setReviewOpen(true)}
            onSimOpen={() => setSimOpen(true)}
          />
        ) : (
          <ExamScreen onSimOpen={() => setSimOpen(true)} />
        )}
      </main>
      {!isOverlay && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} lang={lang} />
      )}
    </div>
  );
}
