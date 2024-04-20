import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import BonlivList from '../components/bonliv/BonlivList';
import BonlivUpdateForm from '../components/bonliv/BonlivupdateForm';
import BonlivDeleteButton from '../components/bonliv/BonlivDeleteButton';
import SingleBonliv from '../components/bonliv/SingleBonliv';
import ItemsInBonlivList from '../components/bonliv/ItemInBonlivList';
import UpdateItemInBonlivForm from '../components/bonliv/updateItemInBonlivForm';
import DeleteItemFromBonlivButton from '../components/bonliv/DeleteItemFromBonlivButton';

const BonlivManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBonlivId, setSelectedBonlivId] = useState(null);
  const { setSidebarButtons } = useSidebar();
  const [selectedItemId, setSelectedItemId] = useState(null);


  const handleViewItemInBonliv = (itemId) => {
    setSelectedItemId(itemId);
    setCurrentView('viewItemInBonliv');
  };
  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View Bonliv</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectBonliv = (id) => {
    setSelectedBonlivId(id);
    setCurrentView('viewBonliv');
  };

  return (
    <div>
      {currentView === 'update' && <BonlivUpdateForm bonlivId={selectedBonlivId} />}
      {currentView === 'delete' && <BonlivDeleteButton bonlivId={selectedBonlivId} onSuccess={() => setCurrentView('list')} />}
      {currentView === 'list' && <BonlivList onSelectBonliv={handleSelectBonliv} />}
      {currentView === 'viewBonliv' && selectedBonlivId && (
        <SingleBonliv bonlivId={selectedBonlivId} onSelectItem={handleViewItemInBonliv} onChangeView={setCurrentView} />
      )}
      {currentView === 'viewItems' && selectedBonlivId && (
        <ItemsInBonlivList refBonliv={selectedBonlivId} />
      )}
      {currentView === 'viewItemInBonliv' && selectedBonlivId && selectedItemId && (
        <>
          <UpdateItemInBonlivForm refBonliv={selectedBonlivId} codeArt={selectedItemId} />
          <DeleteItemFromBonlivButton refBonliv={selectedBonlivId} codeArt={selectedItemId} onSuccess={() => setCurrentView('viewBonliv')} />
        </>
      )}
    </div>
  );
};

export default BonlivManagementPage;
