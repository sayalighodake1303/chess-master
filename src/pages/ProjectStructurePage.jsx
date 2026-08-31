import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Check, 
  Download
} from 'lucide-react';
import { MOCK_ANALYSIS_DATA } from '../data/mockData';

export const ProjectStructurePage = ({ showToast }) => {
  const projectTree = MOCK_ANALYSIS_DATA.projectStructure.tree;
  const sampleFiles = MOCK_ANALYSIS_DATA.projectStructure.sampleFiles;

  const [selectedFileName, setSelectedFileName] = useState("OrderController.ts");
  const [copied, setCopied] = useState(false);
  const [openFolders, setOpenFolders] = useState({
    'food-delivery-backend': true,
    'src': true,
    'controllers': true
  });

  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleCopyCode = () => {
    setCopied(true);
    showToast(`Copied ${selectedFileName} code to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    showToast("Downloaded starter project directory archive (.zip)");
  };

  // Render tree recursively
  const renderTree = (nodes) => {
    return nodes.map((node, i) => {
      if (node.type === 'folder') {
        const isOpen = openFolders[node.name];
        return (
          <div key={i} className="pl-3">
            <div
              onClick={() => toggleFolder(node.name)}
              className="flex items-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-slate-100 cursor-pointer text-slate-700 text-xs font-mono select-none font-semibold"
            >
              {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{node.name}</span>
            </div>
            {isOpen && node.children && (
              <div className="border-l border-slate-200 ml-2">
                {renderTree(node.children)}
              </div>
            )}
          </div>
        );
      } else {
        const isSelected = selectedFileName === node.name;
        return (
          <div
            key={i}
            onClick={() => setSelectedFileName(node.name)}
            className={`flex items-center gap-2 py-1.5 px-2 ml-4 rounded-xl cursor-pointer text-xs font-mono transition-colors ${
              isSelected 
                ? 'bg-indigo-50 text-indigo-900 border-l-3 border-indigo-600 font-extrabold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{node.name}</span>
          </div>
        );
      }
    });
  };

  const currentCode = sampleFiles[selectedFileName] || `// Code for ${selectedFileName}\n\nexport class ${selectedFileName.replace(/\..*$/, '')} {\n  // Auto-generated starter template\n}`;

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold">
              STARTER CODE ARCHITECTURE
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Node.js / Express / TypeScript</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Starter Project Code Structure</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Auto-generated directory skeleton, controllers, services, entities, and Docker config.
          </p>
        </div>

        {/* Action Header */}
        <button
          onClick={handleDownloadZip}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Project Zip</span>
        </button>
      </div>

      {/* 2-Column File Tree & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
        {/* LEFT COLUMN: Directory Tree (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-3.5 overflow-y-auto font-mono text-xs space-y-2 shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold px-2 block mb-2">
            PROJECT EXPLORER TREE
          </span>
          {renderTree(projectTree)}
        </div>

        {/* RIGHT COLUMN: Code Viewer (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col font-mono text-xs shadow-xl">
          {/* Editor Header */}
          <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              {selectedFileName}
            </span>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="flex-1 p-6 overflow-auto bg-slate-900 text-indigo-200 leading-relaxed font-mono">
            <pre><code>{currentCode}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};
