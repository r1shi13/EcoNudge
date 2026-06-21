/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './components/AppContext';
import { NudgeEngine } from './components/NudgeEngine';
import { LivingWorld } from './components/LivingWorld';
import { SquadLeaderboard } from './components/SquadLeaderboard';
import { Insights } from './components/Insights';
import { ActivityLog } from './components/ActivityLog';
import { Leaf } from 'lucide-react';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 p-1.5 rounded-lg">
                <Leaf aria-hidden="true" className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">EcoNudge</h1>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
               <span className="hidden md:inline-block">Awareness over tracking.</span>
               <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden mix-blend-multiply">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
               </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 mb-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              
              {/* Left Column: Input + Visualizer */}
              <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
                 <LivingWorld />
                 <NudgeEngine />
              </div>

              {/* Right Column: AI Insights + Social + Log */}
              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
                 <Insights />
                 <SquadLeaderboard />
                 <ActivityLog />
              </div>

           </div>
        </main>
      </div>
    </AppProvider>
  );
}

