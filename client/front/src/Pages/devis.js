import React, { useState } from 'react';
import DevisList from '../components/devis/DevisList';
import DevisForm from '../components/devis/DevisForm';
import SingleDevis from '../components/devis/SingleDevis';
import DevisDeleteButton from '../components/devis/DevisDeleteButton';
import DevisUpdateForm from '../components/devis/DevisupdateForm';
import ItemsInDevisList from '../components/devis/ItemInDevisList';
import AddItemToDevisForm from '../components/devis/AddItemToDevisForm';
import UpdateItemInDevisForm from '../components/devis/updateItemInDevisForm';
import DeleteItemFromDevisButton from '../components/devis/DeleteItemFromDevisButton';

const DevisManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedDevisId, setSelectedDevisId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSelectDevis = (id) => {
    setSelectedDevisId(id);
    setCurrentView('viewDevis');
  };

  const handleViewItemInDevis = (itemId) => {
    setSelectedItemId(itemId);
    setCurrentView('viewItemInDevis');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Devis</button>
      <button onClick={() => setCurrentView('create')}>Create Devis</button>
      {currentView === 'create' && <DevisForm />}
      {currentView === 'update' && <DevisUpdateForm devisId={selectedDevisId} />}
      {currentView === 'delete' && <DevisDeleteButton devisId={selectedDevisId} onSuccess={() => setCurrentView('list')} />}
      {currentView === 'list' && <DevisList onSelectDevis={handleSelectDevis} />}
      {currentView === 'viewDevis' && selectedDevisId && (
        <SingleDevis devisId={selectedDevisId} onSelectItem={handleViewItemInDevis} onChangeView={setCurrentView} />
      )}
      {currentView === 'viewItemInDevis' && selectedDevisId && selectedItemId && (
        <>
          <UpdateItemInDevisForm refDevis={selectedDevisId} codeArt={selectedItemId} />
          <DeleteItemFromDevisButton refDevis={selectedDevisId} codeArt={selectedItemId} onSuccess={() => setCurrentView('viewDevis')} />
        </>
      )}
      {currentView === 'addItem' && selectedDevisId && (
        <AddItemToDevisForm refDevis={selectedDevisId} onSuccess={() => setCurrentView('viewDevis')} />
      )}
      {currentView === 'viewItems' && selectedDevisId && (
        <ItemsInDevisList refDevis={selectedDevisId} />
      )}
    </div>
  );
};

export default DevisManagementPage;
