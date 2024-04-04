import React from 'react';
import { useDeleteClient } from '../../hooks/clientHooks';

const ClientDeleteButton = ({ clientId, onSuccess }) => {
  const { handleDelete } = useDeleteClient();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await handleDelete(clientId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Client</button>
  );
};

export default ClientDeleteButton;
