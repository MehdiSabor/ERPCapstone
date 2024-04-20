import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import ComList from '../components/com/ComList';
import ComForm from '../components/com/ComForm';
import SingleCom from '../components/com/SingleCom';
import ComDeleteButton from '../components/com/ComDeleteButton';
import ComUpdateForm from '../components/com/ComupdateForm';

const ComManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedComId, setSelectedComId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View Comercials</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create Comercial</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectCom = (id) => {
    setSelectedComId(id);
    setCurrentView('view');
  };

  return (
    <div>
      {currentView === 'create' && <ComForm />}
      {currentView === 'update' && <ComUpdateForm comId={selectedComId} />}
      {currentView === 'delete' && <ComDeleteButton comId={selectedComId} onSuccess={() => setCurrentView('list')} />}
      {currentView === 'list' && <ComList onSelectCom={handleSelectCom} />}
      {currentView === 'view' && selectedComId && (
        <SingleCom comId={selectedComId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default ComManagementPage;
