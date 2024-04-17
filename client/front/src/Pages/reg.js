import React, { useState } from 'react';
import ReglementsList from '../components/reg/RegList';
import CreateReglementForm from '../components/reg/CreateRegForm';
import SingleReglement from '../components/reg/SingleReg';

const RegManagementPage = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'view'
  const [selectedReglementId, setSelectedReglementId] = useState(null);

  const handleSelectReglement = (id) => {
    setSelectedReglementId(id);
    setCurrentView('view');
  };

  const handleReglementUpdated = () => {
    setCurrentView('list');
    setSelectedReglementId(null);
  };

  const handleReglementDeleted = () => {
    setCurrentView('list');
    setSelectedReglementId(null);
  };

  return (
    <div>
      {currentView === 'list' && (
        <>
          <button onClick={() => setCurrentView('create')}>Create Reglement</button>
          <ReglementsList onSelectReglement={handleSelectReglement} />
        </>
      )}
      {currentView === 'create' && (
        <>
          <button onClick={() => setCurrentView('list')}>Back to List</button>
          <CreateReglementForm onReglementCreated={() => setCurrentView('list')} />
        </>
      )}
      {currentView === 'view' && selectedReglementId && (
        <>
          <button onClick={() => setCurrentView('list')}>Back to List</button>
          <SingleReglement 
            reglementId={selectedReglementId} 
            onReglementUpdated={handleReglementUpdated}
            onReglementDeleted={handleReglementDeleted} 
          />
        </>
      )}
    </div>
  );
};

export default RegManagementPage;
