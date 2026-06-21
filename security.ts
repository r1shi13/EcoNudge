import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAppContext } from './AppContext';
import { motion } from 'motion/react';

export function Insights() {
  const { activities } = useAppContext();
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // We only want to generate insights if we have activities
    // In a real app we'd debounce or trigger this specifically.
    if (activities.length === 0) return;

    let isMounted = true;

    async function fetchInsights() {
      setLoading(true);
      try {
        const res = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activities: activities.slice(0, 10) }) // just send recent ones
        });
        
        if (!res.ok) throw new Error('Failed to fetch insights');
        
        const data = await res.json();
        if (isMounted) {
           setInsights(data.insights || []);
        }
      } catch(err) {
        console.error(err);
      } finally {
        if (isMounted) {
           setLoading(false);
        }
      }
    }

    // Give a slight delay before fetching so it doesn't spam on fast edits
    const timer = setTimeout(() => {
       fetchInsights();
    }, 1000);

    return () => {
       isMounted = false;
       clearTimeout(timer);
    };
  }, [activities]);

  return (
    <section aria-labelledby="insights-title" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col gap-5 text-slate-900">
       <div className="flex items-center gap-2">
         <Sparkles aria-hidden="true" className="w-5 h-5 text-purple-600" />
         <h2 id="insights-title" className="text-xl font-semibold text-slate-900 tracking-tight">AI Insights</h2>
       </div>

       {loading ? (
          <div aria-live="polite" className="flex items-center gap-3 py-6 justify-center text-slate-500">
             <Loader2 aria-hidden="true" className="w-5 h-5 animate-spin" />
             <span className="text-sm font-medium">Analyzing your footprint...</span>
          </div>
       ) : insights.length > 0 ? (
           <div className="flex flex-col gap-3">
             {insights.map((insight, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.15 }}
                   className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"
                >
                   <div aria-hidden="true" className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-xs font-bold font-mono mt-0.5">
                      {idx + 1}
                   </div>
                   <p className="text-sm leading-relaxed text-slate-700">
                      {insight}
                   </p>
                </motion.div>
             ))}
          </div>
       ) : (
          <div aria-live="polite" className="py-6 text-center text-slate-500 text-sm">
             Log more activities to generate personalized insights.
          </div>
       )}
    </section>
  );
}
