import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Database, 
  Sliders, 
  Save, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage = ({ currentProject, showToast }) => {
  const [modelEngine, setModelEngine] = useState('gemini-pro');
  const [sqlDialect, setSqlDialect] = useState('postgresql');
  const [autoAnalysis, setAutoAnalysis] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("Settings and AI Model configurations saved!");
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
            PLATFORM CONFIGURATION
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">Project & AI Model Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure software engineering design parameters, AI inference model preferences, and SQL dialects.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* AI Model Configuration Card */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 glass-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-sm font-bold text-slate-100">AI Design Generation Engine</h2>
              <p className="text-xs text-slate-400">Select LLM provider for requirement parsing and UML synthesis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'gemini-pro', name: 'Gemini 1.5 Pro', desc: 'Google DeepMind • High Reasoning', badge: 'Recommended' },
              { id: 'gpt4o', name: 'GPT-4o', desc: 'OpenAI • Multimodal Architecture', badge: 'Fast' },
              { id: 'claude35', name: 'Claude 3.5 Sonnet', desc: 'Anthropic • Precise Schemas', badge: 'High Detail' }
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setModelEngine(m.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  modelEngine === m.id
                    ? 'bg-indigo-950/50 border-indigo-500/60 ring-1 ring-indigo-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold block w-fit mb-2">
                  {m.badge}
                </span>
                <p className="text-xs font-bold text-slate-100">{m.name}</p>
                <p className="text-[10px] text-slate-400 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Export Dialect */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 glass-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Database className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-sm font-bold text-slate-100">Database & DDL Export Settings</h2>
              <p className="text-xs text-slate-400">Target SQL dialect for relational schema generation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target SQL Engine</label>
              <select
                value={sqlDialect}
                onChange={(e) => setSqlDialect(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="postgresql">PostgreSQL 15+ (Recommended)</option>
                <option value="mysql">MySQL 8.0</option>
                <option value="sqlite">SQLite 3</option>
                <option value="mssql">Microsoft SQL Server</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Auto-Run Analysis</span>
                <span className="text-[10px] text-slate-400">Trigger AI extraction immediately on text save</span>
              </div>
              <input
                type="checkbox"
                checked={autoAnalysis}
                onChange={(e) => setAutoAnalysis(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-800 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
