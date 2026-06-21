import React from 'react';
import { Users, Trophy, TrendingUp } from 'lucide-react';
import { useAppContext } from './AppContext';
import { motion } from 'motion/react';

export function SquadLeaderboard() {
  const { squads, mySquadId } = useAppContext();

  // Sort squads by score descending
  const sortedSquads = [...squads].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <section aria-labelledby="squad-title" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
         <div>
           <h2 id="squad-title" className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
             <Trophy aria-hidden="true" className="w-5 h-5 text-yellow-500" /> Squad Standings
           </h2>
           <p className="text-sm text-slate-500 mt-1">Collective accountability.</p>
         </div>
      </div>

      <div className="flex flex-col gap-3">
        {sortedSquads.map((squad, idx) => {
          const isMe = squad.id === mySquadId;
          return (
            <motion.div 
               key={squad.id}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={`flex items-center gap-4 p-3 rounded-xl border ${
                  isMe ? 'border-indigo-200 bg-indigo-50 shadow-sm' : 'border-slate-100 bg-slate-50'
               }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                 idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                 idx === 1 ? 'bg-slate-200 text-slate-700' :
                 idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
              }`}>
                #{idx + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                 <h4 className={`font-semibold truncate text-sm ${isMe ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {squad.name} {isMe && <span className="text-xs font-normal text-indigo-500 ml-1">(You)</span>}
                 </h4>
                 <div className="flex items-center gap-2 mt-0.5">
                    <Users aria-hidden="true" className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{squad.members} members</span>
                 </div>
              </div>

              <div className="text-right">
                 <div className={`font-mono font-semibold text-sm ${isMe ? 'text-indigo-700' : 'text-slate-700'}`}>
                    {squad.totalScore.toLocaleString()}
                 </div>
                 <div className="text-[10px] uppercase tracking-wide text-slate-400 font-medium mt-0.5">Points</div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="mt-auto pt-4 flex gap-3 text-xs text-slate-500 items-start border-t border-slate-100">
         <TrendingUp aria-hidden="true" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
         <p>Your squad gains points for consecutive low-emission days and group transport logging.</p>
      </div>
    </section>
  );
}
