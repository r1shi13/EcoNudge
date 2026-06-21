import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from './AppContext';
import { Cloud, Sun, Trees, CloudRain, Factory, Leaf } from 'lucide-react';

export function LivingWorld() {
  const { activities } = useAppContext();

  // Calculate carbon score for the last 7 days (or all simply for this prototype)
  const totalCarbon = useMemo(() => {
    return activities.reduce((sum, act) => sum + act.co2_kg, 0);
  }, [activities]);

  // Define thresholds
  // < 15 kg: Thriving
  // 15 - 50 kg: Okay
  // > 50 kg: Degraded
  let state: 'thriving' | 'okay' | 'degraded' = 'thriving';
  if (totalCarbon > 50) state = 'degraded';
  else if (totalCarbon > 15) state = 'okay';

  const themeVars = {
    thriving: {
      sky: 'bg-blue-300',
      ground: 'bg-green-400',
      sun: 'text-yellow-400',
      clouds: 'text-white/80',
      elements: 'green',
      message: 'Your world is thriving. Keep it up!'
    },
    okay: {
      sky: 'bg-blue-200',
      ground: 'bg-green-300',
      sun: 'text-yellow-300',
      clouds: 'text-gray-200/80',
      elements: 'yellow',
      message: 'Your world is balanced. Small changes can help it grow.'
    },
    degraded: {
      sky: 'bg-gray-400',
      ground: 'bg-yellow-800',
      sun: 'text-orange-500/50',
      clouds: 'text-gray-600/80',
      elements: 'gray',
      message: 'Air quality dropping. Time to reflect on recent choices.'
    }
  };

  const currentTheme = themeVars[state];

  return (
    <section aria-label="Living World Visualization" className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative h-64 md:h-80">
      {/* Sky */}
      <motion.div 
        className={`absolute inset-0 transition-colors duration-1000 ${currentTheme.sky}`}
      >
        {/* Sun directly in sky container */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: state === 'degraded' ? 80 : 20, opacity: 1 }}
           className="absolute top-4 right-8 md:right-16"
        >
           <Sun aria-hidden="true" className={`w-16 h-16 ${currentTheme.sun} fill-current transition-colors duration-1000`} />
        </motion.div>

        {/* Clouds */}
        <motion.div
           animate={{ x: [0, 40, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
           className="absolute top-10 left-10"
        >
          {state === 'degraded' ? (
            <Factory aria-hidden="true" className={`w-12 h-12 ${currentTheme.clouds}`} />
          ) : (
             <Cloud aria-hidden="true" className={`w-16 h-16 ${currentTheme.clouds} fill-current`} />
          )}
        </motion.div>

         <motion.div
           animate={{ x: [0, -30, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
           className="absolute top-16 right-32"
        >
           {state === 'degraded' ? (
              <CloudRain aria-hidden="true" className={`w-20 h-20 ${currentTheme.clouds} fill-current`} />
           ) : (
              <Cloud aria-hidden="true" className={`w-24 h-24 ${currentTheme.clouds} fill-current`} />
           )}
        </motion.div>
      </motion.div>
      
      {/* Ground */}
      <motion.div 
        className={`absolute bottom-0 w-full h-1/3 transition-colors duration-1000 ${currentTheme.ground} rounded-t-[50%] scale-150 origin-bottom`}
      />

      {/* Trees/Environment Objects */}
      <div className="absolute w-full bottom-8 flex justify-center space-x-12 md:space-x-24 z-10">
        <motion.div
           animate={state === 'thriving' ? { rotate: [0, 2, -2, 0] } : {}}
           transition={{ duration: 4, repeat: Infinity }}
        >
           <Trees aria-hidden="true" className={`w-16 h-16 ${state === 'degraded' ? 'text-gray-800' : 'text-green-800'} transition-colors duration-1000`} />
        </motion.div>
        <motion.div
           animate={state === 'thriving' ? { rotate: [0, -2, 2, 0] } : {}}
           transition={{ duration: 5, repeat: Infinity }}
           className="transform scale-125 pb-4"
        >
           {state === 'degraded' ? (
             <Leaf aria-hidden="true" className="w-16 h-16 text-yellow-900 transition-colors duration-1000 opacity-60" />
           ) : (
             <Trees aria-hidden="true" className="w-16 h-16 text-emerald-800 transition-colors duration-1000" />
           )}
        </motion.div>
         <motion.div
           animate={state === 'thriving' ? { rotate: [0, 3, -3, 0] } : {}}
           transition={{ duration: 4.5, repeat: Infinity }}
        >
           <Trees aria-hidden="true" className={`w-12 h-12 ${state === 'degraded' ? 'text-gray-800' : 'text-green-700'} transition-colors duration-1000`} />
        </motion.div>
      </div>

      {/* Overlay Message */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none" aria-live="polite">
         <div className="bg-white/80 backdrop-blur pb-2 pt-2 px-4 rounded-full inline-block shadow-sm">
            <p className="text-sm font-medium text-slate-800">{currentTheme.message}</p>
         </div>
      </div>
      
    </section>
  );
}
