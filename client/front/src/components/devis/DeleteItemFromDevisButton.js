import React from 'react';
import { useDeleteItemFromDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary

const DeleteItemFromDevisButton = ({ refDevis, codeArt, onSuccess }) => {
  const { deleteItem } = useDeleteItemFromDevis();

  const handleClick = async () => {
    if (!window.confirm('Are you sure you want to remove this item from the devis?')) {
      return; // Exit if the user cancels the operation
    }
  
    try {
      await deleteItem(refDevis, codeArt); // Assume success if this line does not throw
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Failed to delete item:', error);
      alert('Could not delete the item from the devis. ' + (error.message || ''));
    }
  };
  


  return (
    <button onClick={handleClick}>Remove Item</button>
  );
};

export default DeleteItemFromDevisButton;
