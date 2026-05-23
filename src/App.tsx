import { useState, useEffect } from 'react';
import type { ProgramDay, Skill } from './types';
import AppBar from './components/layout/AppBar';
import BottomNav from './components/layout/BottomNav';
import Dashboard from './components/dashboard/Dashboard';
import StudyScreen from './components/study/StudyScreen';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const [activeSkill, setActiveSkill] = useState<Skill>('spreken');
  const [selectedDay, setSelectedDay] = useState<ProgramDay | null>(null);
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

  if (selectedDay) {
    return (
      <StudyScreen
        day={selectedDay}
        skill={activeSkill}
        onBack={() => setSelectedDay(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <AppBar />
      <main className="flex-1 overflow-y-auto pb-20">
        <Dashboard
          activeSkill={activeSkill}
          onSkillChange={setActiveSkill}
          onDaySelect={setSelectedDay}
        />
      </main>
      <BottomNav activeSkill={activeSkill} onSkillChange={setActiveSkill} />
    </div>
  );
}
