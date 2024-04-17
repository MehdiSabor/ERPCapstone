import React from 'react';
import { useDeleteItemFromAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const DeleteItemFromAvoirButton = ({ refAvoir, codeArt, onSuccess }) => {
  const { deleteItem } = useDeleteItemFromAvoir();

  const handleClick = async () => {
    if (!window.confirm('Are you sure you want to remove this item from the avoir?')) {
      return; // Exit if the user cancels the operation
    }

    try {
      await deleteItem(refAvoir, codeArt); // Assume success if this line does not throw
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Failed to delete item:', error);
      alert('Could not delete the item from the avoir. ' + (error.message || ''));
    }
  };

  return (
    <button onClick={handleClick}>Remove Item</button>
  );
};

export default DeleteItemFromAvoirButton;
