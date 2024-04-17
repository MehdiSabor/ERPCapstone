import React, { useState } from 'react';
import FactureList from '../components/facture/FactureList';
import SingleFacture from '../components/facture/SingleFacture';

const FactureManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFactureId, setSelectedFactureId] = useState(null);

  const handleSelectFacture = (id) => {
    setSelectedFactureId(id);
    setCurrentView('viewFacture');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View All Factures</button>
      {currentView === 'list' && <FactureList onSelectFacture={handleSelectFacture} />}
      {currentView === 'viewFacture' && selectedFactureId && (
        <>
          <SingleFacture factureId={selectedFactureId} />
          </>
      )}
    </div>
  );
};

export default FactureManagementPage;
