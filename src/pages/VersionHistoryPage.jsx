import React, { useState } from 'react';
import { 
  GitCompare, 
  CheckCircle2
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const VersionHistoryPage = ({ onOpenCompareModal }) => {
  const versions = MOCK_ANALYSIS_DATA.versionHistory;
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              GIT-LIKE REQUIREMENT GOVERNANCE
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">3 Saved Commit Snapshots</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Requirement Version Timeline</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Audit history tracking requirement evolutions, commit messages, authors, and design diffs.
          </p>
        </div>

        {/* Compare versions button */}
        <button
          onClick={onOpenCompareModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all"
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare Versions (v1.0 vs v2.1)</span>
        </button>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline list (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono px-1">
            Commit History Timeline
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {versions.map((ver, idx) => {
              const isSelected = selectedVersion?.version === ver.version;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedVersion(ver)}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-indigo-200 shadow-2xs'
                  }`}
                >
                  {/* Timeline node circle */}
                  <span className={`absolute -left-6 top-5 w-3 h-3 rounded-full border-2 ${
                    ver.isCurrent ? 'bg-indigo-600 border-white ring-4 ring-indigo-500/20' : 'bg-slate-300 border-white'
                  }`} />

                  <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                    <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {ver.version} {ver.isCurrent && '(CURRENT)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{ver.date}</span>
                  </div>

                  <h3 className="text-xs font-extrabold text-slate-900">{ver.commitMessage}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono font-medium">Author: {ver.author}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Version Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedVersion ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 glass-panel space-y-5 sticky top-20 shadow-sm">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-indigo-600 font-mono">{selectedVersion.version} Snapshot</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{selectedVersion.commitMessage}</h3>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold">
                  {selectedVersion.date}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                  CHANGES INTRODUCED IN THIS REVISION
                </span>
                <div className="space-y-2 text-xs">
                  {selectedVersion.changes?.map((chg, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{chg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs font-medium">
              Select a version snapshot to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
