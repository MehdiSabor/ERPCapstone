import React from 'react';
import { useDeleteReglement } from '../../hooks/regHooks';

const DeleteReglementButton = ({ reglementId, onDeleted }) => {
  const { handleDelete, isDeleting, error } = useDeleteReglement();

  const handleClick = async () => {
    await handleDelete(reglementId);
    onDeleted();
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isDeleting}>Delete Reglement</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DeleteReglementButton;
