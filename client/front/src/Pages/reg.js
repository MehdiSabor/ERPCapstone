import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import ReglementsList from '../components/reg/RegList';
import CreateReglementForm from '../components/reg/CreateRegForm';
import SingleReglement from '../components/reg/SingleReg';
import ModifyReglementForm from '../components/reg/ModifyRegForm';
import DeleteReglementButton from '../components/reg/DeleteRegButton';

const RegManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedReglementId, setSelectedReglementId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View Reglements</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create Reglement</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectReglement = (id) => {
    setSelectedReglementId(id);
    setCurrentView('view');
  };

  const handleChangeView = (view, id) => {
    setCurrentView(view);
    setSelectedReglementId(id);
  };

  return (
    <div>
   
      {currentView === 'list' && <ReglementsList onSelectReglement={handleSelectReglement} />}
      {currentView === 'create' && <CreateReglementForm onReglementCreated={() => setCurrentView('list')} />}
      {currentView === 'view' && selectedReglementId && (
        <SingleReglement 
          reglementId={selectedReglementId} 
          onChangeView={handleChangeView}
        />
      )}
      {currentView === 'modify' && selectedReglementId && (
        <ModifyReglementForm reglementId={selectedReglementId} onUpdated={() => setCurrentView('list')} />
      )}
      {currentView === 'delete' && selectedReglementId && (
        <DeleteReglementButton reglementId={selectedReglementId} onDeleted={() => setCurrentView('list')} />
      )}
    </div>
  );
};

export default RegManagementPage;
