import React, { useState } from 'react';
import CreateFamilleForm from '../components/famille/CreateFamilleForm';
import ListFamilles from '../components/famille/ListFamilles';
import ModifyFamilleForm from '../components/famille/ModifyFamilleForm';
import DeleteFamilleButton from '../components/famille/DeleteFamilleButton';
import SingleFamille from '../components/famille/SingleFamille';

const FamilleManagementPage = () => {
  const [currentView, setCurrentView] = useState('list'); // Possible values: 'list', 'viewFamille', 'modify', 'delete', 'create'
  const [selectedFamilleId, setSelectedFamilleId] = useState(null);

  const handleSelectFamille = (id) => {
    setSelectedFamilleId(id);
    console.log(id);
    setCurrentView('viewFamille');
  };

  const handleModifyFamille = () => {
    setCurrentView('modify');
  };

  const handleDeleteFamille = () => {
    setCurrentView('delete');
  };

  const handleCreateFamille = () => {
    setCurrentView('create');
  };

  return (
    <div>
      <h1>Famille Management</h1>
      <button onClick={() => setCurrentView('list')}>View All Familles</button>
      <button onClick={handleCreateFamille}>Create New Famille</button>

      {currentView === 'list' && <ListFamilles onSelectFamille={handleSelectFamille} />}
      {currentView === 'viewFamille' && selectedFamilleId && (
        <SingleFamille familleId={selectedFamilleId} onModify={handleModifyFamille} onDelete={handleDeleteFamille} />
      )}
      {currentView === 'create' && <CreateFamilleForm />}
      {currentView === 'modify' && selectedFamilleId && <ModifyFamilleForm familleId={selectedFamilleId} />}
      {currentView === 'delete' && selectedFamilleId && <DeleteFamilleButton familleId={selectedFamilleId} />}
    </div>
  );
};

export default FamilleManagementPage;
