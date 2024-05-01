import React, { useState,useEffect } from 'react';
import ClientList from '../components/client/ClientList';
import ClientForm from '../components/client/ClientForm';
import SingleClient from '../components/client/SingleClient';
import ClientDeleteButton from '../components/client/ClientDeleteButton';
import ClientUpdateForm from '../components/client/ClientupdateForm';
import { useSidebar } from '../SidebarContext';


const ClientManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedClientId, setSelectedClientId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  const handleSelectClient = (client) => {
    console.log(client);
    setSelectedClientId(client.code_clt);
    setCurrentView('view');
  };
  useEffect(() => {
    const buttons = [
    <button key="list" onClick={() => setCurrentView('list')}>View Clients</button>,
    <button key="create" onClick={() => setCurrentView('create')}>Create Client</button>
    ];
    setSidebarButtons(buttons);
}, [setSidebarButtons, setCurrentView]);


  return (
    <div>
      
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
