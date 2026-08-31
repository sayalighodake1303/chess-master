import React, { useState } from 'react';
import { 
  Users, 
  UserCheck
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const UseCasesPage = () => {
  const actors = MOCK_ANALYSIS_DATA.actors;
  const useCases = MOCK_ANALYSIS_DATA.useCases;

  const [selectedActor, setSelectedActor] = useState('All');
  const [selectedUseCase, setSelectedUseCase] = useState(useCases[0]);

  const filteredUseCases = selectedActor === 'All' 
    ? useCases 
    : useCases.filter(uc => uc.actor === selectedActor);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              UML SPECIFICATION
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">12 Total Use Cases</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Use Case Specification & Diagrams</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Behavioral system requirements mapped to primary actors, preconditions, and success step scenarios.
          </p>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Actors Filter List (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">System Actors</h2>
            <span className="text-[10px] text-slate-500 font-mono font-medium">{actors.length} Actors</span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedActor('All')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                selectedActor === 'All'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>All Actors</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600">12</span>
            </button>

            {actors.map((act) => (
              <button
                key={act.id}
                onClick={() => setSelectedActor(act.name)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedActor === act.name
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="truncate">{act.name}</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600 shrink-0">
                  {useCases.filter(u => u.actor === act.name).length || 3}
                </span>
              </button>
            ))}
          </div>

          {/* Quick summary box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase block">ACTOR RESPONSIBILITY MATRIX</span>
            <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
              Customer triggers order creation & payment holds. Restaurant manages order acceptance. Delivery partner updates drop-off lifecycle.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: Use Cases Flow List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">Use Case Catalog</h2>
            <span className="text-[10px] text-slate-500 font-mono font-medium">Select to View Scenario</span>
          </div>

          <div className="space-y-2.5">
            {filteredUseCases.map((uc) => {
              const isSelected = selectedUseCase?.id === uc.id;

              return (
                <div
                  key={uc.id}
                  onClick={() => setSelectedUseCase(uc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-indigo-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {uc.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      👤 {uc.actor}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900">{uc.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">{uc.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Use Case Details Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedUseCase ? (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 glass-panel space-y-5 sticky top-20 shadow-md">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold text-indigo-600">{selectedUseCase.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{selectedUseCase.title}</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold">
                  {selectedUseCase.actor}
                </span>
              </div>

              {/* Preconditions */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">PRE-CONDITIONS</span>
                <p className="text-xs text-amber-900 font-medium bg-amber-50 p-3 rounded-xl border border-amber-200">
                  {selectedUseCase.preConditions}
                </p>
              </div>

              {/* Steps scenario */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">MAIN SUCCESS SCENARIO STEPS</span>
                <div className="space-y-2 text-xs">
                  {selectedUseCase.steps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 font-medium shadow-2xs">
                      <span className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-100 w-5 h-5 rounded-md flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Postconditions */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">POST-CONDITIONS</span>
                <p className="text-xs text-emerald-900 font-medium bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  {selectedUseCase.postConditions}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs font-medium">
              Select a use case to view scenario steps
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
