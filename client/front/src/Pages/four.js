import React, { useState } from 'react';
import FourList from '../components/four/FourList'; // Adjust paths as necessary
import FourForm from '../components/four/FourForm';
import SingleFour from '../components/four/SingleFour';
import FourDeleteButton from '../components/four/FourDeleteButton'; // Implement or adjust according to your delete logic
import FourUpdateForm from '../components/four/FourupdateForm';

const FourManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFourId, setSelectedFourId] = useState(null);

  const handleSelectFour = (id) => {
    setSelectedFourId(id);
    setCurrentView('view');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Fournisseur</button>
      <button onClick={() => setCurrentView('create')}>Create Fournisseur</button>
      {currentView === 'create' && <FourForm />}
      {currentView === 'update' && <FourUpdateForm fourId={selectedFourId} />}
      {currentView === 'delete' && <FourDeleteButton fourId={selectedFourId} onSuccess={() => setCurrentView('list')} />}
  
      {currentView === 'list' && <FourList onSelectFour={handleSelectFour} />}
      {currentView === 'view' && selectedFourId && (
        <SingleFour fourId={selectedFourId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default FourManagementPage;
