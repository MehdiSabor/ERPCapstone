import React from 'react';
import { useDeleteItemFromBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const DeleteItemFromBonlivButton = ({ refBonliv, codeArt, onSuccess }) => {
  const { deleteItem } = useDeleteItemFromBonliv();

  const handleClick = async () => {
    if (!window.confirm('Are you sure you want to remove this item from the bonliv?')) {
      return; // Exit if the user cancels the operation
    }
  
    try {
      await deleteItem(refBonliv, codeArt); // Assume success if this line does not throw
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Failed to delete item:', error);
      alert('Could not delete the item from the bonliv. ' + (error.message || ''));
    }
  };
  


  return (
    <button onClick={handleClick}>Remove Item</button>
  );
};

export default DeleteItemFromBonlivButton;
