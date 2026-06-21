export interface Activity {
  id: string;
  name: string;
  category: 'transport' | 'food' | 'energy' | 'goods';
  co2_kg: number;
  date: string;
  nudge?: string;
}

export interface Squad {
  id: string;
  name: string;
  members: number;
  totalScore: number; // Maybe points based on low-emission days
}
