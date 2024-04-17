
import React from 'react';
import { useDeleteFamille } from '../../hooks/familleHooks';// Ensure the correct path to your hooks

const DeleteFamilleButton = ({ familleId, onSuccess }) => {
  const { handleDelete, isDeleting, error } = useDeleteFamille();

  const handleClick = async () => {
    await handleDelete(familleId);
    onSuccess();  // Refresh list or navigate away
  };

  return (
    <>
      <button onClick={handleClick} disabled={isDeleting}>
        Delete Famille
      </button>
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default DeleteFamilleButton;
