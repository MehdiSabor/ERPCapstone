import React from 'react';
import { useDeleteAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const AvoirDeleteButton = ({ avoirId, onSuccess }) => {
  const { handleDelete } = useDeleteAvoir();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this avoir?')) {
      await handleDelete(avoirId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Avoir</button>
  );
};

export default AvoirDeleteButton;
