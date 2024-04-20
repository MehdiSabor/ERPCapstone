import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import ListFamilles from '../components/famille/ListFamilles';
import CreateFamilleForm from '../components/famille/CreateFamilleForm';
import SingleFamille from '../components/famille/SingleFamille';
import ModifyFamilleForm from '../components/famille/ModifyFamilleForm';
import DeleteFamilleButton from '../components/famille/DeleteFamilleButton';

const FamilleManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFamilleId, setSelectedFamilleId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View All Familles</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create New Famille</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectFamille = (id) => {
    setSelectedFamilleId(id);
    setCurrentView('viewFamille');
  };

  return (
    <div>
      {currentView === 'create' && <CreateFamilleForm onFamilleCreated={() => setCurrentView('list')} />}
      {currentView === 'modify' && selectedFamilleId && <ModifyFamilleForm familleId={selectedFamilleId} onFamilleModified={() => setCurrentView('list')} />}
      {currentView === 'delete' && selectedFamilleId && <DeleteFamilleButton familleId={selectedFamilleId} onFamilleDeleted={() => setCurrentView('list')} />}
      {currentView === 'list' && <ListFamilles onSelectFamille={handleSelectFamille} />}
      {currentView === 'viewFamille' && selectedFamilleId && (
        <SingleFamille familleId={selectedFamilleId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default FamilleManagementPage;
