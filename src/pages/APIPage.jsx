import React, { useState } from 'react';
import { 
  Lock, 
  Globe, 
  Copy, 
  Check, 
  Play
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const APIPage = ({ showToast }) => {
  const apis = MOCK_ANALYSIS_DATA.apis;
  const [selectedApi, setSelectedApi] = useState(apis[0]);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const getMethodBadge = (method) => {
    switch (method) {
      case 'GET': return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold';
      case 'POST': return 'bg-indigo-100 text-indigo-800 border-indigo-300 font-extrabold';
      case 'PATCH': return 'bg-amber-100 text-amber-800 border-amber-300 font-extrabold';
      case 'DELETE': return 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleCopyEndpoint = () => {
    setCopied(true);
    showToast(`Copied endpoint ${selectedApi.endpoint}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateApi = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      showToast(`Mock API execution 200 OK returned in 34ms!`);
    }, 800);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              OPENAPI 3.0 SPEC
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">14 REST API Endpoints</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">API Specification & Documentation</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            RESTful API contract schemas, authentication scopes, request parameters, and response payloads.
          </p>
        </div>
      </div>

      {/* 2-Column Catalog & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Endpoints Navigation Catalog (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">API Endpoints</h2>
            <span className="text-[10px] text-slate-500 font-mono font-medium">v1 REST API</span>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
            {apis.map((api) => {
              const isSelected = selectedApi?.id === api.id;
              return (
                <div
                  key={api.id}
                  onClick={() => setSelectedApi(api)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-indigo-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                    <span className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${getMethodBadge(api.method)}`}>
                      {api.method}
                    </span>
                    <span className="text-slate-900 font-extrabold truncate">{api.endpoint}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate font-medium">{api.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Endpoint Inspector Details (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {selectedApi ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 glass-panel space-y-6 shadow-sm">
              {/* Endpoint Header */}
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl font-mono text-xs font-extrabold border ${getMethodBadge(selectedApi.method)}`}>
                    {selectedApi.method}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedApi.endpoint}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                    selectedApi.authRequired 
                      ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {selectedApi.authRequired ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                    {selectedApi.authRequired ? 'Bearer JWT Auth' : 'Public Access'}
                  </span>

                  <button
                    onClick={handleCopyEndpoint}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Copy Endpoint URL"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleSimulateApi}
                    disabled={isSimulating}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isSimulating ? 'Sending...' : 'Test Request'}</span>
                  </button>
                </div>
              </div>

              {/* Endpoint Description */}
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900">{selectedApi.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{selectedApi.summary}</p>
              </div>

              {/* Request Body Payload */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                  REQUEST BODY SCHEMA (APPLICATION/JSON)
                </span>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-indigo-200 overflow-x-auto shadow-md">
                  <pre><code>{selectedApi.requestBody}</code></pre>
                </div>
              </div>

              {/* Response Body Payload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">
                    SUCCESS RESPONSE (200 OK / 201 CREATED)
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    STATUS 200 OK
                  </span>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-md">
                  <pre><code>{selectedApi.responseJson}</code></pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs font-medium">
              Select an endpoint to inspect API specifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
