import React from 'react';
import { useDeleteDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary

const DevisDeleteButton = ({ devisId, onSuccess }) => {
  const { handleDelete } = useDeleteDevis();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this devis?')) {
      await handleDelete(devisId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Devis</button>
  );
};

export default DevisDeleteButton;
