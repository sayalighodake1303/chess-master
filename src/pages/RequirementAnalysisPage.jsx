import React, { useState } from 'react';
import { 
  Users, 
  CheckSquare, 
  ShieldCheck, 
  Database
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const RequirementAnalysisPage = ({ currentProject }) => {
  const [activeTab, setActiveTab] = useState('fr'); // 'fr', 'nfr', 'actors'
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const frList = MOCK_ANALYSIS_DATA.functionalRequirements;
  const nfrList = MOCK_ANALYSIS_DATA.nonFunctionalRequirements;
  const actorsList = MOCK_ANALYSIS_DATA.actors;

  const filteredFr = frList.filter(fr => {
    const matchesSearch = fr.title.toLowerCase().includes(searchQuery.toLowerCase()) || fr.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || fr.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              AI GENERATED ARTIFACT
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Confidence: 94%</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Requirement Analysis Specification</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Structured functional and non-functional requirements extracted from natural language specification.
          </p>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Identified Actors</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-2">{currentProject?.stats?.actors || 4}</p>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Customer, Restaurant, Driver, Admin</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Functional Requirements</span>
            <CheckSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-2">{currentProject?.stats?.functionalRequirements || 18}</p>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">High, Medium & Low Priorities</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Non-Functional Req.</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-2">{currentProject?.stats?.nonFunctionalRequirements || 8}</p>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Performance, Security, SLA</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Entities & Schema</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-2">{currentProject?.stats?.entities || 9}</p>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Normalized Relational Tables</p>
        </div>
      </div>

      {/* Tabs & Filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('fr')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'fr' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Functional Requirements ({frList.length})
          </button>

          <button
            onClick={() => setActiveTab('nfr')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'nfr' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Non-Functional Requirements ({nfrList.length})
          </button>

          <button
            onClick={() => setActiveTab('actors')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'actors' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            System Actors ({actorsList.length})
          </button>
        </div>

        {activeTab === 'fr' && (
          <div className="flex items-center gap-2">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Functional Requirements List */}
      {activeTab === 'fr' && (
        <div className="space-y-3">
          {filteredFr.map((fr) => (
            <div
              key={fr.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs glass-card space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {fr.id}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900">{fr.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                    fr.priority === 'High' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {fr.priority} Priority
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {fr.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-1 font-medium">
                {fr.description}
              </p>

              <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-500 font-mono">
                <span className="font-bold">Actors:</span>
                {fr.actors?.map((act, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    {act}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Non-Functional Requirements */}
      {activeTab === 'nfr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nfrList.map((nfr) => (
            <div key={nfr.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {nfr.id}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                  {nfr.category}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">{nfr.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{nfr.description}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 font-medium">Target Metric:</span>
                <span className="text-indigo-700 font-extrabold">{nfr.metric}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Actors List */}
      {activeTab === 'actors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actorsList.map((act) => (
            <div key={act.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{act.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-indigo-600">{act.type}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{act.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
