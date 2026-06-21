import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Activity, Squad } from '../types';

interface AppState {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  squads: Squad[];
  mySquadId: string;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      name: "Drove 10 miles to work",
      category: "transport",
      co2_kg: 4.5,
      date: new Date().toISOString(),
      nudge: "That's roughly the same carbon as charging 500 smartphones."
    }
  ]);

  const [squads, setSquads] = useState<Squad[]>([
    { id: "s1", name: "Engineering Team", members: 12, totalScore: 1450 },
    { id: "s2", name: "Design Team", members: 6, totalScore: 1620 },
    { id: "s3", name: "Marketing", members: 8, totalScore: 980 }
  ]);

  const addActivity = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  };

  return (
    <AppContext.Provider value={{ activities, addActivity, squads, mySquadId: 's1' }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
