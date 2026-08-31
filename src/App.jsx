import React, { useState } from 'react';
import { INITIAL_PROJECTS } from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';
import { CreateProjectModal } from './components/modals/CreateProjectModal';
import { VersionCompareModal } from './components/modals/VersionCompareModal';
import { ExportModal } from './components/modals/ExportModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RequirementWorkspace } from './pages/RequirementWorkspace';
import { RequirementAnalysisPage } from './pages/RequirementAnalysisPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { UMLPage } from './pages/UMLPage';
import { DatabasePage } from './pages/DatabasePage';
import { APIPage } from './pages/APIPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ProjectStructurePage } from './pages/ProjectStructurePage';
import { ChangeImpactPage } from './pages/ChangeImpactPage';
import { VersionHistoryPage } from './pages/VersionHistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [activeView, setActiveView] = useState('landing');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState(INITIAL_PROJECTS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals & Overlay state
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCompareVersionOpen, setIsCompareVersionOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // System Toast Notifications
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSelectProject = (project) => {
    setCurrentProject(project);
  };

  const handleCreateProject = (newProject) => {
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setActiveView('workspace');
  };

  const handleUpdateRequirement = (newRequirementText) => {
    const updated = { ...currentProject, rawRequirement: newRequirementText };
    setCurrentProject(updated);
    setProjects(projects.map(p => p.id === updated.id ? updated : p));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Toast Notification Container */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreateProject={handleCreateProject}
        showToast={showToast}
      />

      <VersionCompareModal
        isOpen={isCompareVersionOpen}
        onClose={() => setIsCompareVersionOpen(false)}
        currentVersion={currentProject?.version || "v2.1"}
        previousVersion="v1.0"
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        currentProject={currentProject}
        showToast={showToast}
      />

      {/* Main Top Header Navbar */}
      <Navbar
        currentProject={currentProject}
        projects={projects}
        onSelectProject={handleSelectProject}
        onOpenCreateProject={() => setIsCreateProjectOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showToast={showToast}
      />

      {/* Main Content Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Rendered on non-landing views or responsive) */}
        {activeView !== 'landing' && (
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            isSidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            currentProject={currentProject}
          />
        )}

        {/* View Switcher Viewport */}
        <main className="flex-1 overflow-y-auto min-w-0">
          {activeView === 'landing' && (
            <LandingPage
              onStartDesigning={() => setActiveView('dashboard')}
              onViewDemo={() => {
                setCurrentProject(projects[0]);
                setActiveView('workspace');
              }}
              onOpenCreateProject={() => setIsCreateProjectOpen(true)}
            />
          )}

          {activeView === 'dashboard' && (
            <DashboardPage
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenCreateProject={() => setIsCreateProjectOpen(true)}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'workspace' && (
            <RequirementWorkspace
              currentProject={currentProject}
              onUpdateRequirement={handleUpdateRequirement}
              setActiveView={setActiveView}
              onOpenExport={() => setIsExportOpen(true)}
              showToast={showToast}
            />
          )}

          {activeView === 'analysis' && (
            <RequirementAnalysisPage
              currentProject={currentProject}
            />
          )}

          {activeView === 'use-cases' && (
            <UseCasesPage />
          )}

          {activeView === 'uml' && (
            <UMLPage showToast={showToast} />
          )}

          {activeView === 'database' && (
            <DatabasePage showToast={showToast} />
          )}

          {activeView === 'api' && (
            <APIPage showToast={showToast} />
          )}

          {activeView === 'architecture' && (
            <ArchitecturePage />
          )}

          {activeView === 'project-structure' && (
            <ProjectStructurePage showToast={showToast} />
          )}

          {activeView === 'change-impact' && (
            <ChangeImpactPage showToast={showToast} />
          )}

          {activeView === 'version-history' && (
            <VersionHistoryPage
              onOpenCompareModal={() => setIsCompareVersionOpen(true)}
              showToast={showToast}
            />
          )}

          {activeView === 'settings' && (
            <SettingsPage
              currentProject={currentProject}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
