import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  Link, 
  Code, 
  Download, 
  Copy, 
  Check, 
  Table, 
  FileCode
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const DatabasePage = ({ showToast }) => {
  const [activeView, setActiveView] = useState('erd'); // 'erd' or 'sql'
  const [copied, setCopied] = useState(false);

  const tables = MOCK_ANALYSIS_DATA.database.tables;
  const sqlSnippet = MOCK_ANALYSIS_DATA.database.sqlSnippet;

  const handleCopySql = () => {
    setCopied(true);
    showToast("PostgreSQL SQL Schema DDL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportSql = () => {
    showToast("Exported schema as schema_postgresql.sql");
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              RELATIONAL SCHEMA (3NF)
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">6 Core Tables • PostgreSQL 15</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Database ERD & Schema Design</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Normalized database entities, primary key identifiers, foreign key relationships, and SQL creation scripts.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView(activeView === 'erd' ? 'sql' : 'erd')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold transition-colors shadow-2xs"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-600" />
            <span>{activeView === 'erd' ? 'View SQL Code' : 'View Visual ERD'}</span>
          </button>

          <button
            onClick={handleExportSql}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SQL Script</span>
          </button>
        </div>
      </div>

      {/* Mode View Tabs */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs w-fit">
        <button
          onClick={() => setActiveView('erd')}
          className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
            activeView === 'erd' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Visual ERD Cards
        </button>

        <button
          onClick={() => setActiveView('sql')}
          className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
            activeView === 'sql' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Generated SQL DDL Script
        </button>
      </div>

      {/* 1. VISUAL ERD CARDS GRID */}
      {activeView === 'erd' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.name}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm overflow-hidden glass-card transition-all"
            >
              {/* Table Header */}
              <div className="bg-purple-600 p-3.5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-white" />
                  <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider">
                    {table.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md font-bold">
                  {table.columns.length} Cols
                </span>
              </div>

              {/* Table Description */}
              <div className="px-4 py-2 text-[11px] text-slate-500 bg-slate-50 border-b border-slate-100 font-medium">
                {table.description}
              </div>

              {/* Columns Table List */}
              <div className="p-3.5 space-y-1.5 font-mono text-xs">
                {table.columns.map((col, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-100 transition-colors">
                    <div className="flex items-center gap-2 truncate">
                      {col.isPk ? (
                        <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Primary Key" />
                      ) : col.isFk ? (
                        <Link className="w-3.5 h-3.5 text-indigo-600 shrink-0" title="Foreign Key" />
                      ) : (
                        <span className="w-3.5 h-3.5 text-slate-400 font-bold shrink-0 text-[10px] text-center">#</span>
                      )}
                      <span className={`truncate text-[11px] ${col.isPk ? 'text-amber-900 font-extrabold' : col.isFk ? 'text-indigo-900 font-bold' : 'text-slate-800 font-medium'}`}>
                        {col.name}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0 font-mono font-semibold">
                      {col.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. GENERATED SQL DDL CODE EDITOR */}
      {activeView === 'sql' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden font-mono text-xs shadow-xl">
          <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-slate-300 text-xs font-bold flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              schema_postgresql.sql (PostgreSQL 15+)
            </span>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy SQL"}</span>
            </button>
          </div>

          <pre className="p-6 text-indigo-200 leading-relaxed overflow-x-auto selection:bg-purple-500/30">
            <code>{sqlSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
