import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import FactureList from '../components/facture/FactureList';
import SingleFacture from '../components/facture/SingleFacture';

const FactureManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFactureId, setSelectedFactureId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View All Factures</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectFacture = (id) => {
    setSelectedFactureId(id);
    setCurrentView('viewFacture');
  };

  return (
    <div>
      {currentView === 'list' && <FactureList onSelectFacture={handleSelectFacture} />}
      {currentView === 'viewFacture' && selectedFactureId && (
        <SingleFacture factureId={selectedFactureId} />
      )}
    </div>
  );
};

export default FactureManagementPage;
