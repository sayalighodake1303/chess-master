import React from 'react';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  GitBranch,
  Network,
  Database,
  Code2,
  Boxes,
  FolderTree,
  Zap,
  History,
  Settings,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setSidebarOpen, currentProject }) => {
  const navGroups = [
    {
      group: "MAIN NAVIGATION",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'workspace', label: 'Requirement Workspace', icon: FileText, badge: 'IDE' }
      ]
    },
    {
      group: "DESIGN ARTIFACTS",
      items: [
        { id: 'analysis', label: 'Requirement Analysis', icon: CheckSquare, badge: currentProject?.stats?.functionalRequirements || '18' },
        { id: 'use-cases', label: 'Use Cases', icon: GitBranch, badge: currentProject?.stats?.useCases || '12' },
        { id: 'uml', label: 'UML Diagrams', icon: Network, badge: '4 Charts' },
        { id: 'database', label: 'Database Design', icon: Database, badge: 'ERD' },
        { id: 'api', label: 'API Specification', icon: Code2, badge: 'REST' },
        { id: 'architecture', label: 'System Architecture', icon: Boxes, badge: 'Microservices' },
        { id: 'project-structure', label: 'Project Structure', icon: FolderTree, badge: 'Code' }
      ]
    },
    {
      group: "ANALYSIS & GOVERNANCE",
      items: [
        { id: 'change-impact', label: 'Change Impact Analysis', icon: Zap, badge: 'High Impact', highlight: true },
        { id: 'version-history', label: 'Version History', icon: History, badge: currentProject?.version || 'v2.1' },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null }
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 z-40
        flex flex-col justify-between transition-all duration-300 transform shadow-xs
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="overflow-y-auto px-3 py-4 space-y-6 flex-1">
          {/* Active project card widget */}
          {currentProject && (
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 glass-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-700 font-bold">
                  Active Project
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs font-extrabold text-slate-900 truncate mt-1">{currentProject.name}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-100 text-[10px] text-slate-500 font-medium">
                <span>{currentProject.domain}</span>
                <span className="font-mono text-indigo-700 font-bold">{currentProject.progress}% Done</span>
              </div>
            </div>
          )}

          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                {group.group}
              </h3>

              <div className="space-y-0.5 mt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all group
                        ${isActive 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' 
                          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
                        }
                        ${item.highlight && !isActive ? 'hover:border-amber-400 hover:bg-amber-50 text-amber-800' : ''}
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-400 group-hover:text-indigo-600'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`
                          text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 font-semibold
                          ${isActive 
                            ? 'bg-indigo-700 text-white' 
                            : item.highlight 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 text-xs">
          <div className="flex items-center gap-2 text-slate-600 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="text-[11px] leading-tight">
              <p className="font-bold text-slate-800">Final-Year B.Tech CSE</p>
              <p className="text-[10px] text-slate-500 font-medium">DevArchitect Engine v2.5</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
