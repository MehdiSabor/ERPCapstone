import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import ListUsers from '../components/user/ListUsers';
import CreateUserForm from '../components/user/CreateUserForm';
import SingleUser from '../components/user/SingleUser';
import ModifyUserForm from '../components/user/ModifyUserForm';
import DeleteUserButton from '../components/user/DeleteUserButton';

const UserManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View All Users</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create New User</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    setCurrentView('viewUser');
  };

  return (
    <div>
      {currentView === 'create' && <CreateUserForm onUserCreated={() => setCurrentView('list')} />}
      {currentView === 'modify' && selectedUserId && <ModifyUserForm userId={selectedUserId} onUserModified={() => setCurrentView('list')} />}
      {currentView === 'delete' && selectedUserId && <DeleteUserButton userId={selectedUserId} onUserDeleted={() => setCurrentView('list')} />}
      {currentView === 'list' && <ListUsers onSelectUser={handleSelectUser} />}
      {currentView === 'viewUser' && selectedUserId && (
        <SingleUser userId={selectedUserId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default UserManagementPage;
