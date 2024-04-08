import React, { useState } from 'react';
import BonlivList from '../components/bonliv/BonlivList';
import SingleBonliv from '../components/bonliv/SingleBonliv';
import BonlivDeleteButton from '../components/bonliv/BonlivDeleteButton';
import BonlivUpdateForm from '../components/bonliv/BonlivupdateForm';
import ItemsInBonlivList from '../components/bonliv/ItemInBonlivList';
import UpdateItemInBonlivForm from '../components/bonliv/updateItemInBonlivForm';
import DeleteItemFromBonlivButton from '../components/bonliv/DeleteItemFromBonlivButton';

const BonlivManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBonlivId, setSelectedBonlivId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSelectBonliv = (id) => {
    setSelectedBonlivId(id);
    setCurrentView('viewBonliv');
  };

  const handleViewItemInBonliv = (itemId) => {
    setSelectedItemId(itemId);
    setCurrentView('viewItemInBonliv');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Bonliv</button>
      
      {currentView === 'update' && <BonlivUpdateForm bonlivId={selectedBonlivId} />}
      {currentView === 'delete' && <BonlivDeleteButton bonlivId={selectedBonlivId} onSuccess={() => setCurrentView('list')} />}
      {currentView === 'list' && <BonlivList onSelectBonliv={handleSelectBonliv} />}
      {currentView === 'viewBonliv' && selectedBonlivId && (
        <SingleBonliv bonlivId={selectedBonlivId} onSelectItem={handleViewItemInBonliv} onChangeView={setCurrentView} />
      )}
      {currentView === 'viewItemInBonliv' && selectedBonlivId && selectedItemId && (
        <>
          <UpdateItemInBonlivForm refBonliv={selectedBonlivId} codeArt={selectedItemId} />
          <DeleteItemFromBonlivButton refBonliv={selectedBonlivId} codeArt={selectedItemId} onSuccess={() => setCurrentView('viewBonliv')} />
        </>
      )}
      
      {currentView === 'viewItems' && selectedBonlivId && (
        <ItemsInBonlivList refBonliv={selectedBonlivId} />
      )}
    </div>
  );
};

export default BonlivManagementPage;
