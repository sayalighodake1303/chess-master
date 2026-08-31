import React, { useState } from 'react';
import { 
  FolderPlus, 
  Layers, 
  FileText, 
  Network, 
  Zap, 
  ArrowRight, 
  Search, 
  Clock, 
  TrendingUp
} from 'lucide-react';

export const DashboardPage = ({ projects = [], onSelectProject, onOpenCreateProject, setActiveView }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: "Total Projects", value: projects.length, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50", change: "+2 this month" },
    { title: "Requirements Analyzed", value: "56", icon: FileText, color: "text-cyan-600", bg: "bg-cyan-50", change: "94% Accuracy" },
    { title: "Diagrams Generated", value: "24", icon: Network, color: "text-emerald-600", bg: "bg-emerald-50", change: "UML + ERD" },
    { title: "Changes Tracked", value: "12", icon: Zap, color: "text-amber-600", bg: "bg-amber-50", change: "Auto-impact" }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm glass-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Good morning 👋</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200 font-bold">
              System Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Let's turn your natural language requirements into complete software engineering architecture designs.
          </p>
        </div>

        <button
          onClick={onOpenCreateProject}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all shrink-0"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs glass-card">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{st.title}</span>
                <div className={`p-2.5 rounded-xl ${st.bg}`}>
                  <Icon className={`w-4 h-4 ${st.color}`} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 font-mono mt-2">{st.value}</p>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono font-medium">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                {st.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Recent Architecture Projects</h2>
            <p className="text-xs text-slate-500 font-medium">Select a project to inspect requirements, UML diagrams, database schema & APIs</p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Projects Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all glass-card-hover group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                    {proj.domain}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    {proj.lastUpdated}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed font-medium">
                    {proj.description}
                  </p>
                </div>

                {/* Artifact metrics breakdown */}
                <div className="grid grid-cols-4 gap-1 py-2.5 border-y border-slate-100 text-center text-[10px] bg-slate-50/50 rounded-xl">
                  <div>
                    <span className="text-slate-400 block font-medium">Actors</span>
                    <span className="font-extrabold text-slate-800 font-mono text-xs">{proj.stats?.actors || 4}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">FRs</span>
                    <span className="font-extrabold text-slate-800 font-mono text-xs">{proj.stats?.functionalRequirements || 18}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Use Cases</span>
                    <span className="font-extrabold text-slate-800 font-mono text-xs">{proj.stats?.useCases || 12}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Entities</span>
                    <span className="font-extrabold text-slate-800 font-mono text-xs">{proj.stats?.entities || 9}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-slate-500 font-medium">Design Progress</span>
                    <span className="text-indigo-600 font-extrabold">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                  {proj.techStack?.split('/')[0] || 'Node.js'}
                </span>

                <button
                  onClick={() => {
                    onSelectProject(proj);
                    setActiveView('workspace');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all"
                >
                  <span>Open Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
