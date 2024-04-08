import React, { useEffect, useState } from 'react';
import { useFetchDevisById, useFetchItemsInDevis, useValidateDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary

const SingleDevis = ({ devisId , onChangeView }) => {
  const { devis, loading: loadingDevis, error: errorDevis } = useFetchDevisById(devisId);
  const { items, loading: loadingItems, error: errorItems } = useFetchItemsInDevis(devisId);
  const { validate, error, isValidated } = useValidateDevis(devisId);
 // Function to handle the click on the Validate button
 const handleValidateClick = async () => {
  try{
  await validate();
  
      alert('Devis has been successfully validated.');
      // Optionally, you can trigger other actions here, such as navigating away or refreshing the data
  } catch(error) {
      alert(`Failed to validate devis: ${error}`);
  }
};

  // To ensure that the items are re-fetched when the devis changes
  useEffect(() => {
    if (devisId) {
      // Fetch details of the devis by ID
    }
  }, [devisId]);

  if (loadingDevis || loadingItems) return <p>Loading...</p>;
  if (errorDevis) return <p>Error fetching devis: {errorDevis}</p>;
  if (errorItems) return <p>Error fetching items: {errorItems}</p>;
  if (!devis) return <p>No devis found</p>;

  return (
    <div>
    <button onClick={() => onChangeView('update', devisId)}>Update Devis</button>
      <button onClick={() => onChangeView('delete', devisId)}>Delete Devis</button>
      <button onClick={() => onChangeView('addItem', devisId)}>Add Item</button>
      <button onClick={() => onChangeView('viewItems', devisId)}>View Items</button>
      {!isValidated && (
                <button onClick={handleValidateClick}>Validate Devis</button>
            )}
            {error && <p>Error validating devis: {error}</p>}
      <h3>Devis Details</h3>
      <div>
      {console.log(devis)}
        <strong>Reference:</strong> {devis.REF_DEV}<br/>
        <strong>Date:</strong> {devis.DATE_DEV}<br/>
        <strong>Client:</strong> {devis.CLIENT}<br/>
        <strong>Total:</strong> {devis.MNT_TTC} HT:{devis.MNT_HT}<br/>
        <strong>{devis.VALIDER}</strong><br/>
        {/* Display other devis details here */}
      </div>
      <h4>Items in Devis</h4>
      {items && items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.CODE_ART}>
              {item.ARTICLE} - Quantity: {item.QTE} {item.PV_TTC} € Total: {item.TotalTTC}
              {/* Display other item details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this devis.</p>
      )}
    </div>
  );
};

export default SingleDevis;
