import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Layers, 
  Menu, 
  Cpu, 
  FolderPlus,
  CheckCircle2
} from 'lucide-react';

export const Navbar = ({ 
  currentProject, 
  projects = [], 
  onSelectProject, 
  onOpenCreateProject, 
  activeView, 
  setActiveView, 
  toggleSidebar, 
  showToast 
}) => {
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockNotifications = [
    { id: 1, text: "AI Analysis completed for Online Food Delivery System", time: "10m ago" },
    { id: 2, text: "UML Class Diagram updated to v2.1", time: "1h ago" },
    { id: 3, text: "Change Impact Analysis detected 3 high impact APIs", time: "2h ago" }
  ];

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 shadow-xs">
      {/* Left section: Hamburger, Brand logo & Project selector */}
      <div className="flex items-center gap-3 lg:gap-5">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand logo */}
        <div 
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-orange-400 to-violet-500 flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-all ring-1 ring-white/20">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 8.5c0-1.8 1.4-3.2 3.2-3.2h3.6c1.8 0 3.2 1.4 3.2 3.2v2.8c0 2.1-1.7 3.8-3.8 3.8h-2.4c-2.1 0-3.8-1.7-3.8-3.8V8.5Z"/>
              <path d="M9 15.5V18M15 15.5V18M12 7v2.5M8.5 11.5h7"/>
              <path d="M8 5.5 5.5 8l2.5 2.5M16 5.5 18.5 8l-2.5 2.5"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                SoftCraft AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block -mt-1 font-medium tracking-wide">
              From Requirements to Software Architecture
            </p>
          </div>
        </div>

        {/* Project Selector Dropdown (Shown when not on landing page) */}
        {activeView !== 'landing' && currentProject && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-semibold hover:border-indigo-300 hover:bg-white transition-all text-slate-800"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[160px] truncate">{currentProject.name}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-50 text-indigo-700 font-mono border border-indigo-100">
                {currentProject.version || 'v1.0'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProjectDropdown && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 py-2 glass-panel">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Projects</span>
                  <button
                    onClick={() => {
                      setShowProjectDropdown(false);
                      onOpenCreateProject();
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-bold"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    New
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto py-1">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        onSelectProject(proj);
                        setShowProjectDropdown(false);
                        showToast(`Switched to ${proj.name}`);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                        currentProject.id === proj.id ? 'bg-indigo-50/80 text-indigo-900 border-l-3 border-indigo-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="font-bold truncate">{proj.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{proj.domain}</p>
                      </div>
                      {currentProject.id === proj.id && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search requirements, use cases, APIs, tables..."
            className="w-full bg-slate-100/70 border border-slate-200 rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-400 rounded border border-slate-200 shadow-2xs">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right section: New Project CTA, Notifications, Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCreateProject}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Create Project</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 p-3 glass-panel">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800">System Activity</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-mono border border-indigo-100">3 New</span>
              </div>
              <div className="space-y-2">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs border border-slate-100">
                    <p className="text-slate-800 leading-snug font-medium">{n.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-xs text-indigo-700 shadow-xs">
            SG
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Sayali Ghodake</p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">Lead Architect</p>
          </div>
        </div>
      </div>
    </header>
  );
};
