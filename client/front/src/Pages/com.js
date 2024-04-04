import React, { useState } from 'react';
import ComList from '../components/com/ComList'; // Adjust paths as necessary
import ComForm from '../components/com/ComForm';
import SingleCom from '../components/com/SingleCom';
import ComDeleteButton from '../components/com/ComDeleteButton'; // Implement or adjust according to your delete logic
import ComUpdateForm from '../components/com/ComupdateForm';

const ComManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedComId, setSelectedComId] = useState(null);

  const handleSelectCom = (id) => {
    setSelectedComId(id);
    setCurrentView('view');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Comercials</button>
      <button onClick={() => setCurrentView('create')}>Create Comercial</button>
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
