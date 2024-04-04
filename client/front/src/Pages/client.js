import React, { useState } from 'react';
import ClientList from '../components/client/ClientList';
import ClientForm from '../components/client/ClientForm';
import SingleClient from '../components/client/SingleClient';
import ClientDeleteButton from '../components/client/ClientDeleteButton';
import ClientUpdateForm from '../components/client/ClientupdateForm';


const ClientManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleSelectClient = (id) => {
    setSelectedClientId(id);
    setCurrentView('view');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Clients</button>
      <button onClick={() => setCurrentView('create')}>Create Client</button>
      {currentView === 'create' && <ClientForm />}
      {currentView === 'update' && <ClientUpdateForm clientId={selectedClientId} />}
      {currentView === 'delete' && <ClientDeleteButton clientId={selectedClientId} onSuccess={() => setCurrentView('list')} />}
  
      {currentView === 'list' && <ClientList onSelectClient={handleSelectClient} />}
      {currentView === 'view' && selectedClientId && (
        <SingleClient clientId={selectedClientId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default ClientManagementPage;
