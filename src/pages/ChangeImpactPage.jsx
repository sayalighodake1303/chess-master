import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const ChangeImpactPage = ({ showToast }) => {
  const changeData = MOCK_ANALYSIS_DATA.changeImpact;
  const [analyzing, setAnalyzing] = useState(false);

  const handleRecalculate = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      showToast("Change Impact recalculated! High impact level confirmed across 7 artifacts.");
    }, 1000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-600" />
              MUTATION IMPACT ENGINE
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Automatic Ripple-Effect Graph</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Requirement Change Impact Analysis</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Detect how requirement modifications impact downstream UML diagrams, database schemas, APIs, and microservices.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleRecalculate}
          disabled={analyzing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          <span>Recalculate Impact</span>
        </button>
      </div>

      {/* Top Diff Comparison Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50 border border-amber-200 shadow-sm glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Requirement Change Detected
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Impact Score:</span>
            <span className="text-xs font-extrabold font-mono text-rose-700 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
              HIGH (85/100)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase block">OLD REQUIREMENT</span>
            <p className="text-slate-700 italic font-medium">"{changeData.oldRequirement}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 shadow-2xs">
            <span className="text-[10px] text-amber-800 font-extrabold uppercase block">NEW REQUIREMENT (MUTATED)</span>
            <p className="text-amber-950 font-extrabold">"{changeData.newRequirement}"</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
          <span className="font-extrabold text-amber-900">Summary: </span>
          {changeData.summary}
        </div>
      </div>

      {/* Visual Dependency Impact Graph */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
          Downstream Impact Propagation Graph
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 py-4">
          {changeData.graphNodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className={`p-3.5 rounded-2xl border text-xs font-mono font-bold flex items-center gap-2 shadow-2xs ${
                node.status === 'source' ? 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold' : 'bg-slate-50 text-indigo-900 border-slate-200'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>{node.name}</span>
              </div>
              {idx < changeData.graphNodes.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Affected Components Grid Checklist */}
      <div className="space-y-3">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
          Impacted Software Artifacts Checklist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {changeData.affectedComponents.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 glass-card flex items-start justify-between gap-3 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h3 className="text-xs font-extrabold text-slate-900">{comp.name}</h3>
                </div>
                <p className="text-[11px] text-slate-500 font-mono font-medium">{comp.count}</p>
              </div>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                {comp.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
