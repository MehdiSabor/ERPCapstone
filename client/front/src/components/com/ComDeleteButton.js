import React from 'react';
import { useDeleteCom } from '../../hooks/comHooks';

const ComDeleteButton = ({ comId, onSuccess }) => {
  const { handleDelete } = useDeleteCom();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this com?')) {
      await handleDelete(comId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Com</button>
  );
};

export default ComDeleteButton;
