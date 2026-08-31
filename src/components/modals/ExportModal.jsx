import React, { useState } from 'react';
import { X, Download, FileText, Database, Code, FileCode, Check, Copy } from 'lucide-react';

export const ExportModal = ({ isOpen, onClose, currentProject, showToast }) => {
  const [selectedFormat, setSelectedFormat] = useState('sql');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportOptions = [
    { id: 'sql', title: 'PostgreSQL DDL (.sql)', desc: 'Complete SQL schema definitions with constraints & keys', icon: Database },
    { id: 'openapi', title: 'OpenAPI 3.0 Spec (.json)', desc: 'Swagger REST API documentation JSON schema', icon: Code },
    { id: 'markdown', title: 'Software Spec Document (.md)', desc: 'Complete SRS document with FRs, NFRs, Use Cases', icon: FileText },
    { id: 'plantuml', title: 'PlantUML Diagrams (.puml)', desc: 'Standard PlantUML definitions for Class & Use Case charts', icon: FileCode }
  ];

  const handleExport = () => {
    showToast(`Exported ${currentProject?.name || 'Project'} design as ${selectedFormat.toUpperCase()}!`);
    onClose();
  };

  const handleCopyCode = () => {
    setCopied(true);
    showToast("Artifact code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs">
              <Download className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Export Software Design Artifacts</h2>
              <p className="text-xs text-slate-500 font-medium">Download formatted engineering specifications for development</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {exportOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedFormat === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedFormat(opt.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-xs font-extrabold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>{opt.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{opt.desc}</p>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? "Copied!" : "Copy Payload"}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Artifact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
