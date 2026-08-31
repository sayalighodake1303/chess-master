import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  RefreshCw
} from 'lucide-react';

export const UMLPage = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('class'); // 'usecase', 'class', 'sequence', 'activity'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(180, prev + 15));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(60, prev - 15));
  const handleResetZoom = () => setZoomLevel(100);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      showToast("UML Diagram layout refreshed with updated class relations!");
    }, 1000);
  };

  const handleDownload = () => {
    showToast(`Downloaded ${activeTab.toUpperCase()} Diagram as SVG!`);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              UML 2.5 STANDARD
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Vector SVG Canvas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">UML Architecture Diagrams</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Auto-generated class diagrams, sequence flows, use case maps, and activity state pipelines.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SVG</span>
          </button>
        </div>
      </div>

      {/* Tabs bar & Zoom Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('usecase')}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'usecase' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Use Case Diagram
          </button>

          <button
            onClick={() => setActiveTab('class')}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'class' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Class Diagram
          </button>

          <button
            onClick={() => setActiveTab('sequence')}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'sequence' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sequence Diagram
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'activity' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Activity Diagram
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 text-xs font-mono">
          <button onClick={handleZoomOut} className="p-1 hover:text-indigo-600 text-slate-500" title="Zoom Out">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center text-slate-800 font-bold">{zoomLevel}%</span>
          <button onClick={handleZoomIn} className="p-1 hover:text-indigo-600 text-slate-500" title="Zoom In">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleResetZoom} className="p-1 hover:text-indigo-600 text-slate-500 border-l border-slate-200 ml-1 pl-2" title="Reset">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative rounded-3xl bg-white border border-slate-200 p-8 min-h-[500px] flex items-center justify-center overflow-auto bg-blueprint-grid glass-panel shadow-sm">
        <div 
          className="transition-transform duration-300 w-full max-w-4xl"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* 1. CLASS DIAGRAM VIEW */}
          {activeTab === 'class' && (
            <div className="space-y-8 py-4">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 font-bold">
                  UML 2.5 Class Architecture • Online Food Delivery System
                </span>
              </div>

              {/* Class Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Class */}
                <div className="rounded-2xl border border-indigo-200 bg-white shadow-md overflow-hidden font-mono text-xs">
                  <div className="bg-indigo-600 p-2.5 text-center font-extrabold text-white border-b border-indigo-700">
                    «Entity» Customer
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-slate-700 border-b border-slate-100 bg-slate-50/50 font-medium">
                    <p>+ customerId: UUID</p>
                    <p>+ fullName: String</p>
                    <p>+ email: String</p>
                    <p>+ phone: String</p>
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-indigo-900 bg-white font-semibold">
                    <p>+ placeOrder(cart): Order</p>
                    <p>+ trackDelivery(orderId)</p>
                  </div>
                </div>

                {/* Order Class */}
                <div className="rounded-2xl border border-cyan-200 bg-white shadow-md overflow-hidden font-mono text-xs">
                  <div className="bg-cyan-600 p-2.5 text-center font-extrabold text-white border-b border-cyan-700">
                    «Entity» Order
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-slate-700 border-b border-slate-100 bg-slate-50/50 font-medium">
                    <p>+ orderId: UUID</p>
                    <p>+ customerId: UUID</p>
                    <p>+ status: OrderStatus</p>
                    <p>+ totalAmount: Decimal</p>
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-cyan-950 bg-white font-semibold">
                    <p>+ calculateTotal(): Decimal</p>
                    <p>+ updateStatus(newStatus)</p>
                  </div>
                </div>

                {/* DeliveryPartner Class */}
                <div className="rounded-2xl border border-emerald-200 bg-white shadow-md overflow-hidden font-mono text-xs">
                  <div className="bg-emerald-600 p-2.5 text-center font-extrabold text-white border-b border-emerald-700">
                    «Entity» DeliveryPartner
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-slate-700 border-b border-slate-100 bg-slate-50/50 font-medium">
                    <p>+ partnerId: UUID</p>
                    <p>+ driverName: String</p>
                    <p>+ vehicleType: String</p>
                    <p>+ isAvailable: Boolean</p>
                  </div>
                  <div className="p-3 space-y-1 text-[11px] text-emerald-950 bg-white font-semibold">
                    <p>+ acceptAssignment(taskId)</p>
                    <p>+ updateGPS(lat, lng)</p>
                  </div>
                </div>
              </div>

              {/* Relationship Connector Lines SVG */}
              <svg className="w-full h-24 stroke-indigo-500 stroke-2 fill-none overflow-visible">
                <path d="M 150 0 L 150 50 L 450 50 L 450 0" strokeDasharray="4 4" />
                <path d="M 450 50 L 450 90 L 750 90 L 750 0" strokeDasharray="4 4" />
                <circle cx="450" cy="50" r="4" fill="#4f46e5" />
              </svg>
            </div>
          )}

          {/* 2. USE CASE DIAGRAM VIEW */}
          {activeTab === 'usecase' && (
            <div className="py-6 space-y-8">
              <div className="grid grid-cols-3 gap-8 items-center">
                {/* Actors */}
                <div className="space-y-4">
                  {['Customer', 'Restaurant Owner', 'Delivery Partner'].map((act, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center font-mono text-xs text-indigo-900 font-extrabold">
                      👤 {act}
                    </div>
                  ))}
                </div>

                {/* System Boundary Box */}
                <div className="col-span-2 p-6 rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 space-y-4">
                  <span className="text-[10px] font-mono uppercase text-indigo-700 font-extrabold block text-center">
                    SYSTEM BOUNDARY: FOOD DELIVERY PLATFORM
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {['UC-01 Browse Restaurants', 'UC-02 Place Order', 'UC-03 Process Payment', 'UC-04 Accept Delivery', 'UC-05 Live Tracking'].map((uc, idx) => (
                      <div key={idx} className="p-3 rounded-full bg-white border border-indigo-200 text-center text-xs font-mono text-slate-800 font-bold shadow-2xs">
                        {uc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. SEQUENCE DIAGRAM VIEW */}
          {activeTab === 'sequence' && (
            <div className="py-6 space-y-6 font-mono text-xs">
              <div className="grid grid-cols-4 text-center border-b border-slate-200 pb-3">
                <span className="font-extrabold text-indigo-900">Customer</span>
                <span className="font-extrabold text-cyan-900">API Gateway</span>
                <span className="font-extrabold text-emerald-900 font-mono">Order Service</span>
                <span className="font-extrabold text-purple-900">PostgreSQL DB</span>
              </div>

              <div className="space-y-4 text-[11px] font-semibold">
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-2xs">
                  1. POST /api/v1/orders (cartPayload) ➔ API Gateway
                </div>
                <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 ml-12 shadow-2xs">
                  2. Validate JWT Auth & Proxy Request ➔ Order Service
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 ml-24 shadow-2xs">
                  3. INSERT INTO orders (status = 'PLACED') ➔ PostgreSQL DB
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 ml-36 shadow-2xs">
                  4. Return Order Confirmation (Order ID: ord_77610)
                </div>
              </div>
            </div>
          )}

          {/* 4. ACTIVITY DIAGRAM VIEW */}
          {activeTab === 'activity' && (
            <div className="py-6 text-center space-y-4 font-mono text-xs">
              <div className="inline-block px-5 py-2.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold border border-emerald-300 shadow-2xs">
                ● START: Customer Submits Order
              </div>
              <div className="w-0.5 h-6 bg-slate-300 mx-auto" />
              <div className="p-3 max-w-xs mx-auto rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold shadow-2xs">
                Authorize Stripe Payment Hold
              </div>
              <div className="w-0.5 h-6 bg-slate-300 mx-auto" />
              <div className="p-3 max-w-xs mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold shadow-2xs">
                ◇ Is Payment Authorized?
              </div>
              <div className="w-0.5 h-6 bg-slate-300 mx-auto" />
              <div className="inline-block px-5 py-2.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold border border-indigo-300 shadow-2xs">
                ● END: Dispatch Driver & Notify Customer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
