import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GitBranch, 
  Database, 
  Code2, 
  Boxes, 
  Zap, 
  Layers, 
  Play, 
  Cpu,
  ChevronRight,
  Workflow
} from 'lucide-react';

export const LandingPage = ({ onStartDesigning, onViewDemo }) => {
  const transformationSteps = [
    { title: "Requirement", icon: Workflow, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200 text-indigo-900" },
    { title: "Requirements", icon: CheckCircle2, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200 text-cyan-900" },
    { title: "Use Cases", icon: GitBranch, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 text-emerald-900" },
    { title: "UML", icon: Layers, color: "text-amber-600", bg: "bg-amber-50 border-amber-200 text-amber-900" },
    { title: "Database", icon: Database, color: "text-purple-600", bg: "bg-purple-50 border-purple-200 text-purple-900" },
    { title: "APIs", icon: Code2, color: "text-rose-600", bg: "bg-rose-50 border-rose-200 text-rose-900" },
    { title: "Architecture", icon: Boxes, color: "text-blue-600", bg: "bg-blue-50 border-blue-200 text-blue-900" }
  ];

  const featureCards = [
    {
      title: "AI Requirement Analysis",
      desc: "Extracts primary actors, business rules, functional modules, and non-functional requirements from raw plain English text.",
      icon: Sparkles,
      color: "from-indigo-500 to-indigo-600",
      accentBg: "bg-indigo-50 border-indigo-100"
    },
    {
      title: "UML Diagram Generation",
      desc: "Automatically renders interactive Use Case diagrams, Class diagrams, Sequence flows, and Activity charts with instant SVG export.",
      icon: GitBranch,
      color: "from-cyan-500 to-blue-600",
      accentBg: "bg-cyan-50 border-cyan-100"
    },
    {
      title: "Database Schema Design",
      desc: "Generates relational ERDs, primary/foreign key mappings, index constraints, and ready-to-run PostgreSQL DDL SQL scripts.",
      icon: Database,
      color: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-50 border-purple-100"
    },
    {
      title: "API Specification Engine",
      desc: "Creates complete REST API endpoints with request payloads, status codes, authentication badges, and Swagger OpenAPI 3.0 schemas.",
      icon: Code2,
      color: "from-rose-500 to-pink-600",
      accentBg: "bg-rose-50 border-rose-100"
    },
    {
      title: "System Architecture Canvas",
      desc: "Maps out microservices, API gateways, cache clusters, message buses, and database failover nodes for cloud deployments.",
      icon: Boxes,
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "Change Impact Analysis",
      desc: "Identifies ripple effects when requirements mutate — highlighting affected use cases, DB tables, APIs, and code files.",
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-50 border-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 bg-blueprint-grid">
      {/* Top Banner Badge */}
      <div className="bg-indigo-600 py-2 px-4 text-center text-white shadow-xs">
        <span className="inline-flex items-center gap-2 text-xs font-semibold">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] uppercase font-mono tracking-wider font-bold">
            B.Tech CSE Project Demo
          </span>
          AI Requirement-to-Software Design Generator
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-20 text-center relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 mb-6 shadow-md shadow-indigo-500/5">
          <Cpu className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>DevArchitect AI Platform v2.5</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Turn Software Requirements into{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
            Complete System Designs
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Describe your software idea in natural language and transform it into requirements, use cases, UML diagrams, database schemas, APIs and system architecture.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartDesigning}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
          >
            <span>Start Designing</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewDemo}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-sm shadow-sm transition-all"
          >
            <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>View Interactive Demo</span>
          </button>
        </div>

        {/* Transformation Steps Sequence */}
        <div className="mt-20">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono mb-6">
            AUTOMATED SOFTWARE ENGINEERING GENERATION PIPELINE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
            {transformationSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold shadow-xs ${step.bg}`}>
                    <Icon className={`w-4 h-4 ${step.color}`} />
                    <span>{step.title}</span>
                  </div>
                  {idx < transformationSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Interactive Example Demo Card */}
        <div className="mt-16 max-w-4xl mx-auto p-1.5 rounded-3xl bg-gradient-to-b from-indigo-200 via-slate-100 to-white border border-indigo-200 shadow-2xl">
          <div className="bg-white rounded-2xl p-6 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-500 ml-2">Live AI Requirement Analysis Preview</span>
              </div>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 font-bold">
                Confidence: 94%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Prompt */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  INPUT SOFTWARE REQUIREMENT
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    U
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium italic">
                    "I want to build an online food delivery system with customers, restaurants and delivery partners."
                  </p>
                </div>
              </div>

              {/* AI Detection Output */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-wider block mb-2">
                  GENERATED ARCHITECTURE METRICS
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                    <span className="text-slate-500 text-[10px] font-medium">Actors Detected</span>
                    <p className="text-sm font-extrabold text-indigo-900 font-mono">4 Actors</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                    <span className="text-slate-500 text-[10px] font-medium">Functional Req.</span>
                    <p className="text-sm font-extrabold text-cyan-900 font-mono">18 FRs</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                    <span className="text-slate-500 text-[10px] font-medium">Use Cases</span>
                    <p className="text-sm font-extrabold text-emerald-900 font-mono">12 Use Cases</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                    <span className="text-slate-500 text-[10px] font-medium">Entities & Tables</span>
                    <p className="text-sm font-extrabold text-purple-900 font-mono">9 Entities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Complete Engineering Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Everything required to go from plain text ideas to production-ready software architecture blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 transition-all duration-300 text-left hover:-translate-y-1 glass-card-hover group shadow-xs"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center shadow-md mb-4 text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 bg-white">
        <p className="font-bold text-slate-700">DevArchitect AI • Final-Year B.Tech CSE Capstone Project</p>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">Designed for Software Requirements to System Design Automation</p>
      </footer>
    </div>
  );
};
