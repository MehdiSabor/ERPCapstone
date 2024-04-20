import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import FourList from '../components/four/FourList';
import FourForm from '../components/four/FourForm';
import SingleFour from '../components/four/SingleFour';
import FourDeleteButton from '../components/four/FourDeleteButton';
import FourUpdateForm from '../components/four/FourupdateForm';

const FourManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFourId, setSelectedFourId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View Fournisseur</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create Fournisseur</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectFour = (id) => {
    setSelectedFourId(id);
    setCurrentView('view');
  };

  return (
    <div>
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
