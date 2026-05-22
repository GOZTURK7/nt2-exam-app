import { useState } from 'react';
import type { ProgramDay, Skill } from './types';
import AppBar from './components/layout/AppBar';
import BottomNav from './components/layout/BottomNav';
import Dashboard from './components/dashboard/Dashboard';
import StudyScreen from './components/study/StudyScreen';

export default function App() {
  const [activeSkill, setActiveSkill] = useState<Skill>('spreken');
  const [selectedDay, setSelectedDay] = useState<ProgramDay | null>(null);

  if (selectedDay) {
    return (
      <StudyScreen
        day={selectedDay}
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
