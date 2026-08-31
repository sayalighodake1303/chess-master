import React from 'react';
import { X, GitCompare, PlusCircle, RefreshCw, CheckCircle, FileCode } from 'lucide-react';

export const VersionCompareModal = ({ isOpen, onClose, currentVersion = "v2.1", previousVersion = "v1.0" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center shadow-xs">
              <GitCompare className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                Requirement Version Comparison
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono font-bold">
                  {previousVersion} vs {currentVersion}
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">Side-by-side diff analysis showing requirement evolution over time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diff Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Version Meta Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block mb-1">PREVIOUS BASELINE ({previousVersion})</span>
              <p className="font-extrabold text-slate-900">Initial Core Requirements Baseline</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">10 Aug 2026 • 4 Actors • 14 Functional Requirements</p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200">
              <span className="text-[10px] font-mono uppercase text-indigo-700 font-extrabold block mb-1">TARGET VERSION ({currentVersion})</span>
              <p className="font-extrabold text-indigo-950">Added Live Delivery Partner Dispatch Engine</p>
              <p className="text-[11px] text-indigo-600 font-medium mt-1">13 Aug 2026 • 4 Actors • 18 Functional Requirements</p>
            </div>
          </div>

          {/* Section 1: Requirement Text Diff */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" />
              Raw Requirement Specification Diff
            </h3>

            <div className="rounded-2xl border border-slate-200 overflow-hidden font-mono text-[11px] leading-relaxed shadow-2xs">
              <div className="bg-slate-50 p-3 text-slate-600 border-b border-slate-200">
                I want to build an online food delivery system where customers can browse restaurants, view menus, place food orders and make payments.
              </div>
              <div className="bg-emerald-50/90 p-3 text-emerald-900 border-b border-emerald-100 flex items-start gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-emerald-700 text-[10px] uppercase font-mono block">Added in {currentVersion}:</span>
                  "Delivery partners should receive automated trip assignments based on driver GPS location and update order drop-off status live."
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Artifact Changes Matrix */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-800">Impacted Architecture Artifacts</h3>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold font-mono border border-emerald-200">ADDED</span>
                  <div>
                    <p className="font-bold text-slate-800">Delivery Partner Actor & Use Cases</p>
                    <p className="text-[11px] text-slate-500">UC-03 (Accept Delivery Trip), UC-04 (Update Order Status)</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-extrabold font-mono border border-amber-200">MODIFIED</span>
                  <div>
                    <p className="font-bold text-slate-800">Database Schema (2 New Tables)</p>
                    <p className="text-[11px] text-slate-500">Created delivery_partners and delivery_tasks tables with FK to ORDERS</p>
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-amber-600" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold font-mono border border-emerald-200">ADDED</span>
                  <div>
                    <p className="font-bold text-slate-800">Real-time WebSocket Push Server</p>
                    <p className="text-[11px] text-slate-500">System Architecture microservice node for live GPS coordinate broadcast</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-slate-400 text-xs font-mono font-medium">Diff calculated in 12ms</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
