import React, { useState } from 'react';
import { 
  Server, 
  ArrowDown
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const ArchitecturePage = () => {
  const architecture = MOCK_ANALYSIS_DATA.architecture;
  const [selectedNode, setSelectedNode] = useState(architecture.layers[2].nodes[0]);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              MICROSERVICES TOPOLOGY
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">4-Tier System Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">System Architecture Blueprint</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cloud-native topology connecting clients, API gateway, microservices, caches, and relational storage.
          </p>
        </div>
      </div>

      {/* 2-Column Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: 4-Layer System Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {architecture.layers.map((layer, lIdx) => (
            <div key={layer.id} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  {layer.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-medium">{layer.nodes.length} Nodes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {layer.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md' 
                          : 'bg-white border-slate-200 hover:border-indigo-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {node.type}
                        </span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>

                      <h3 className="text-xs font-extrabold text-slate-900">{node.name}</h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-medium">{node.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Directional Connector Arrow */}
              {lIdx < architecture.layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-mono text-slate-500 font-bold flex items-center gap-1.5 shadow-2xs">
                    <ArrowDown className="w-3 h-3 text-indigo-600" />
                    <span>gRPC / REST / TLS 1.3 Data Flow</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Node Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedNode ? (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 glass-panel space-y-5 sticky top-20 shadow-sm">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-indigo-600 uppercase font-extrabold">{selectedNode.type}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{selectedNode.name}</h3>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold shadow-2xs">
                  <Server className="w-4 h-4" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">NODE RESPONSIBILITY</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {selectedNode.desc}
                </p>
              </div>

              {/* Node Specifications */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Replicas:</span>
                  <span className="text-indigo-900 font-bold">3 Replicas (K8s Auto-scale)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Protocol:</span>
                  <span className="text-emerald-900 font-bold">HTTPS / TLS 1.3 / gRPC</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Health Status:</span>
                  <span className="text-emerald-800 font-extrabold">Healthy (99.9% SLA)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs font-medium">
              Select an architecture node to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
