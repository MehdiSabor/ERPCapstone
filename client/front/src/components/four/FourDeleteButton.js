import React from 'react';
import { useDeleteFour } from '../../hooks/fourHooks';

const FourDeleteButton = ({ fourId, onSuccess }) => {
  const { handleDelete } = useDeleteFour();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this four?')) {
      await handleDelete(fourId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Fournisseur</button>
  );
};

export default FourDeleteButton;
