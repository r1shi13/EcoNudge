import React from 'react';
import { History, Navigation, Utensils, Zap, ShoppingBag } from 'lucide-react';
import { useAppContext } from './AppContext';
import { motion } from 'motion/react';

const CATEGORY_MAP = {
  transport: { icon: Navigation, bg: 'bg-blue-100', text: 'text-blue-700' },
  food: { icon: Utensils, bg: 'bg-orange-100', text: 'text-orange-700' },
  energy: { icon: Zap, bg: 'bg-yellow-100', text: 'text-yellow-700' },
  goods: { icon: ShoppingBag, bg: 'bg-purple-100', text: 'text-purple-700' }
};

export function ActivityLog() {
  const { activities } = useAppContext();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
         <div>
           <h2 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
             <History className="w-5 h-5 text-slate-500" /> Recent Actions
           </h2>
         </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-sm text-slate-500 text-center py-6">No activities logged yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((act, idx) => {
             const styling = CATEGORY_MAP[act.category as keyof typeof CATEGORY_MAP] || CATEGORY_MAP.goods;
             const Icon = styling.icon;
             
             return (
               <motion.div 
                 key={act.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="flex gap-4 items-start"
               >
                 <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${styling.bg} ${styling.text}`}>
                    <Icon className="w-5 h-5" />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <h4 className="font-semibold text-sm text-slate-900 break-words">{act.name}</h4>
                       <span className="font-mono text-xs font-bold text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded-full">
                          {act.co2_kg} kg
                       </span>
                    </div>
                    {act.nudge && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {act.nudge}
                      </p>
                    )}
                 </div>
               </motion.div>
             );
          })}
        </div>
      )}
    </div>
  );
}
