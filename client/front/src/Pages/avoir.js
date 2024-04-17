import React, { useState } from 'react';
import AvoirList from '../components/avoir/AvoirList';
import AvoirForm from '../components/avoir/AvoirForm';
import SingleAvoir from '../components/avoir/SingleAvoir';
import AvoirDeleteButton from '../components/avoir/AvoirDeleteButton';
import AvoirUpdateForm from '../components/avoir/AvoirupdateForm';
import ItemsInAvoirList from '../components/avoir/ItemInAvoirList';
import AddItemToAvoirForm from '../components/avoir/AddItemToAvoirForm';
import UpdateItemInAvoirForm from '../components/avoir/updateItemInAvoirForm';
import DeleteItemFromAvoirButton from '../components/avoir/DeleteItemFromAvoirButton';

const AvoirManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedAvoirId, setSelectedAvoirId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSelectAvoir = (id) => {
    setSelectedAvoirId(id);
    setCurrentView('viewAvoir');
  };

  const handleViewItemInAvoir = (itemId) => {
    setSelectedItemId(itemId);
    setCurrentView('viewItemInAvoir');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Avoir</button>
      <button onClick={() => setCurrentView('create')}>Create Avoir</button>
      {currentView === 'create' && <AvoirForm />}
      {currentView === 'update' && <AvoirUpdateForm avoirId={selectedAvoirId} />}
      {currentView === 'delete' && <AvoirDeleteButton avoirId={selectedAvoirId} onSuccess={() => setCurrentView('list')} />}
      {currentView === 'list' && <AvoirList onSelectAvoir={handleSelectAvoir} />}
      {currentView === 'viewAvoir' && selectedAvoirId && (
        <SingleAvoir avoirId={selectedAvoirId} onSelectItem={handleViewItemInAvoir} onChangeView={setCurrentView} />
      )}
      {currentView === 'viewItemInAvoir' && selectedAvoirId && selectedItemId && (
        <>
          <UpdateItemInAvoirForm refAvoir={selectedAvoirId} codeArt={selectedItemId} />
          <DeleteItemFromAvoirButton refAvoir={selectedAvoirId} codeArt={selectedItemId} onSuccess={() => setCurrentView('viewAvoir')} />
        </>
      )}
      {currentView === 'addItem' && selectedAvoirId && (
        <AddItemToAvoirForm refAvoir={selectedAvoirId} onSuccess={() => setCurrentView('viewAvoir')} />
      )}
      {currentView === 'viewItems' && selectedAvoirId && (
        <ItemsInAvoirList refAvoir={selectedAvoirId} />
      )}
    </div>
  );
};

export default AvoirManagementPage;
