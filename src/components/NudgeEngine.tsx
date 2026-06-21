import React, { useState } from 'react';
import { Leaf, Navigation, Utensils, Zap, ShoppingBag, Loader2, Info } from 'lucide-react';
import { useAppContext } from './AppContext';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'transport', label: 'Transport', icon: Navigation },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'energy', label: 'Energy', icon: Zap },
  { id: 'goods', label: 'Goods', icon: ShoppingBag }
] as const;

export function NudgeEngine() {
  const { addActivity } = useAppContext();
  const [activityInput, setActivityInput] = useState('');
  const [costInput, setCostInput] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]['id']>('transport');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [nudgeResult, setNudgeResult] = useState<{ nudge: string, co2_kg: number } | null>(null);

  const handleGenerateNudge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityInput || !costInput) return;

    setIsGenerating(true);
    setNudgeResult(null);

    try {
      const parsedCost = parseFloat(costInput) || 1;
      
      const res = await fetch('/api/nudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity: activityInput, co2_kg: parsedCost })
      });

      if (!res.ok) throw new Error('Failed to fetch nudge');
      
      const data = await res.json();
      setNudgeResult({ nudge: data.nudge, co2_kg: parsedCost });
    } catch (err) {
      console.error(err);
      // Fallback
      setNudgeResult({ nudge: `This costs ${costInput}kg of CO2. Consider sustainable alternatives.`, co2_kg: parseFloat(costInput) || 1 });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmLog = () => {
    if (!nudgeResult) return;
    
    addActivity({
      id: Math.random().toString(36).substring(7),
      name: activityInput,
      category,
      co2_kg: nudgeResult.co2_kg,
      date: new Date().toISOString(),
      nudge: nudgeResult.nudge
    });

    setActivityInput('');
    setCostInput('');
    setNudgeResult(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" /> Log Activity
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Estimate your CO2 cost and we'll translate it into real-world impact before you commit.
        </p>
      </div>

      <form onSubmit={handleGenerateNudge} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-4 gap-2">
           {CATEGORIES.map(cat => {
             const Icon = cat.icon;
             return (
               <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                     category === cat.id 
                     ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                     : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700'
                  }`}
               >
                 <Icon className="w-5 h-5 mb-1" />
                 <span className="text-xs font-medium">{cat.label}</span>
               </button>
             )
           })}
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
           <div className="flex-1">
             <label className="text-xs font-medium text-slate-500 mb-1.5 block">What did you do?</label>
             <input 
               type="text" 
               required
               value={activityInput}
               onChange={(e) => setActivityInput(e.target.value)}
               placeholder="e.g. Flight to Mumbai, Ordered a steak" 
               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-400 text-sm"
             />
           </div>
           
           <div className="md:w-32">
             <label className="text-xs font-medium text-slate-500 mb-1.5 block">Est. CO2 (kg)</label>
             <input 
               type="number" 
               required
               step="0.1"
               value={costInput}
               onChange={(e) => setCostInput(e.target.value)}
               placeholder="e.g. 4.5" 
               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-400 text-sm"
             />
           </div>
        </div>

        {!nudgeResult && (
          <button 
            type="submit" 
            disabled={isGenerating || !activityInput || !costInput}
            className="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Evaluate Impact'}
          </button>
        )}
      </form>

      <AnimatePresence>
        {nudgeResult && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 overflow-hidden"
          >
            <div className="flex gap-3">
              <div className="mt-0.5"><Info className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-900">Real-World Impact</h4>
                <p className="text-sm text-emerald-800 mt-1 leading-relaxed">{nudgeResult.nudge}</p>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setNudgeResult(null)}
                    className="flex-1 py-2 px-4 rounded-lg bg-white border border-emerald-200 text-emerald-700 font-medium text-sm hover:bg-emerald-50 transition-colors active:scale-[0.98]"
                  >
                     Cancel
                  </button>
                  <button 
                    onClick={handleConfirmLog}
                    className="flex-1 py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors active:scale-[0.98]"
                  >
                     Commit & Log
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
