import React from 'react';
import { useDeleteBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const BonlivDeleteButton = ({ bonlivId, onSuccess }) => {
  const { handleDelete } = useDeleteBonliv();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this bonliv?')) {
      await handleDelete(bonlivId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Bonliv</button>
  );
};

export default BonlivDeleteButton;
