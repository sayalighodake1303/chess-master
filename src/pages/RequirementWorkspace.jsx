import React, { useState } from 'react';
import { 
  Save, 
  Sparkles, 
  Download, 
  History, 
  Zap, 
  CheckCircle2, 
  Users, 
  Cpu, 
  FileText, 
  Loader2,
  ArrowRight,
  Code2,
  Database,
  Network
} from 'lucide-react';

export const RequirementWorkspace = ({ 
  currentProject, 
  onUpdateRequirement, 
  setActiveView, 
  onOpenExport, 
  showToast 
}) => {
  const [requirementText, setRequirementText] = useState(
    currentProject?.rawRequirement || 
    "I want to build an online food delivery system where customers can browse restaurants, view menus, place orders, make payments and track deliveries. Restaurants should manage menus and orders. Delivery partners should receive delivery assignments and update delivery status."
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  // Live word & character count
  const charCount = requirementText.length;
  const wordCount = requirementText.trim() ? requirementText.trim().split(/\s+/).length : 0;
  const completeness = Math.min(100, Math.round((wordCount / 40) * 100));

  const handleSave = () => {
    onUpdateRequirement(requirementText);
    showToast("Requirement document saved to version draft!");
  };

  const handleTriggerAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      showToast("AI Requirements Analysis refreshed! 4 Actors and 18 FRs detected.");
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-slate-50 text-slate-900">
      {/* Top Action Header */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
            IDE WORKSPACE
          </span>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              {currentProject?.name || "Online Food Delivery System"}
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                Draft Specification
              </span>
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold transition-colors shadow-2xs"
          >
            <Save className="w-3.5 h-3.5 text-indigo-600" />
            <span>Save</span>
          </button>

          <button
            onClick={handleTriggerAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all"
          >
            {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Analyze</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-cyan-600" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setActiveView('version-history')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold transition-colors shadow-2xs"
          >
            <History className="w-3.5 h-3.5 text-amber-600" />
            <span>Versions</span>
          </button>
        </div>
      </div>

      {/* 3-Column Workspace Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT COLUMN: Project Nav Tree (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 border-r border-slate-200 bg-white p-3 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold px-2">Project Artifacts</span>
            
            <button 
              onClick={() => setActiveView('analysis')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Requirement Document
              </span>
              <span className="text-[10px] font-mono bg-indigo-100 px-1.5 py-0.2 rounded font-bold text-indigo-700">RAW</span>
            </button>

            <button 
              onClick={() => setActiveView('analysis')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                Functional Requirements
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">18 FRs</span>
            </button>

            <button 
              onClick={() => setActiveView('use-cases')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Actors & Use Cases
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">12 UCs</span>
            </button>

            <button 
              onClick={() => setActiveView('uml')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-amber-600" />
                UML Diagrams
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">Class/Seq</span>
            </button>

            <button 
              onClick={() => setActiveView('database')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-purple-600" />
                Database Schema ERD
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">9 Tables</span>
            </button>

            <button 
              onClick={() => setActiveView('api')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-rose-600" />
                API REST Endpoints
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">14 APIs</span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase block">COMPLETENESS RATING</span>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 font-medium">Spec Clarity</span>
              <span className="text-emerald-700 font-extrabold">{completeness}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${completeness}%` }} />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Requirement Editor (6 cols) */}
        <div className="col-span-1 lg:col-span-6 border-r border-slate-200 flex flex-col bg-white">
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Project Requirement Specification
            </h2>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 font-medium">
              <span>Words: {wordCount}</span>
              <span>Chars: {charCount}</span>
            </div>
          </div>

          {/* Large Editable Text Area */}
          <div className="flex-1 p-4 flex flex-col">
            <textarea
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              placeholder="Enter software requirement in natural language..."
              className="w-full h-full bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-sans leading-relaxed resize-none shadow-2xs"
            />
          </div>

          {/* Editor Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between font-mono font-medium">
            <span className="text-[11px]">Mode: Natural Language Processing</span>
            <span className="text-[11px] text-indigo-600 font-bold">Auto-saved to local state</span>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Assistant / Analysis Panel (3 cols) */}
        <div className="col-span-1 lg:col-span-3 bg-slate-50/70 p-4 overflow-y-auto space-y-5">
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">AI Design Assistant</h3>
              <p className="text-[10px] text-slate-500 font-medium">Architecture Extractor</p>
            </div>
          </div>

          {/* Status & Analyze trigger */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Analysis Status</span>
              <span className="text-emerald-700 font-extrabold font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ready
              </span>
            </div>

            <button
              onClick={handleTriggerAnalysis}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all"
            >
              {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Analyze Requirements</span>
            </button>
          </div>

          {/* Detection Results */}
          {analyzed && (
            <div className="space-y-4 animate-fade-in">
              {/* Confidence badge */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <span className="text-xs text-indigo-950 font-bold">Model Confidence</span>
                <span className="text-xs font-extrabold text-indigo-700 font-mono">92%</span>
              </div>

              {/* Detected Actors */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                  DETECTED ACTORS (4)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Customer', 'Restaurant Owner', 'Delivery Partner', 'Admin'].map((act, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-bold shadow-2xs">
                      👤 {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detected Features */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                  DETECTED MODULES (5)
                </span>
                <div className="space-y-1.5 text-xs">
                  {['Authentication & OAuth', 'Restaurant Catalog', 'Food Ordering Cart', 'Online Payment Gateway', 'Live Delivery GPS'].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                  EXPLORE GENERATED DESIGN
                </span>

                <button
                  onClick={() => setActiveView('analysis')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-800 font-bold transition-colors shadow-2xs"
                >
                  <span>View FR & NFR Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                </button>

                <button
                  onClick={() => setActiveView('uml')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-800 font-bold transition-colors shadow-2xs"
                >
                  <span>View Class & Seq Diagrams</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                </button>

                <button
                  onClick={() => setActiveView('change-impact')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs text-amber-900 font-bold transition-colors shadow-2xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Change Impact Analysis
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
