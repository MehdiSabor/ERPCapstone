import React, { useEffect, useState } from 'react';
import { useFetchAvoirById, useFetchItemsInAvoir, useValidateAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const SingleAvoir = ({ avoirId , onChangeView }) => {
  const { avoir, loading: loadingAvoir, error: errorAvoir } = useFetchAvoirById(avoirId);
  const { items, loading: loadingItems, error: errorItems } = useFetchItemsInAvoir(avoirId);
  const { validate, error, isValidated } = useValidateAvoir(avoirId);
 // Function to handle the click on the Validate button
 const handleValidateClick = async () => {
  try{
  await validate();
  
      alert('Avoir has been successfully validated.');
      // Optionally, you can trigger other actions here, such as navigating away or refreshing the data
  } catch(error) {
      alert(`Failed to validate avoir: ${error}`);
  }
};

  // To ensure that the items are re-fetched when the avoir changes
  useEffect(() => {
    if (avoirId) {
      // Fetch details of the avoir by ID
    }
  }, [avoirId]);

  if (loadingAvoir || loadingItems) return <p>Loading...</p>;
  if (errorAvoir) return <p>Error fetching avoir: {errorAvoir}</p>;
  if (errorItems) return <p>Error fetching items: {errorItems}</p>;
  if (!avoir) return <p>No avoir found</p>;

  return (
    <div>
    <button onClick={() => onChangeView('update', avoirId)}>Update Avoir</button>
      <button onClick={() => onChangeView('delete', avoirId)}>Delete Avoir</button>
      <button onClick={() => onChangeView('addItem', avoirId)}>Add Item</button>
      <button onClick={() => onChangeView('viewItems', avoirId)}>View Items</button>
      {!isValidated && (
                <button onClick={handleValidateClick}>Validate Avoir</button>
            )}
            {error && <p>Error validating avoir: {error}</p>}
      <h3>Avoir Details</h3>
      <div>
      {console.log(avoir)}
        <strong>Reference:</strong> {avoir.REF_DEV}<br/>
        <strong>Date:</strong> {avoir.DATE_DEV}<br/>
        <strong>Client:</strong> {avoir.CLIENT}<br/>
        <strong>Total:</strong> {avoir.MNT_TTC} HT:{avoir.MNT_HT}<br/>
        <strong>{avoir.VALIDER}</strong><br/>
        {/* Display other avoir details here */}
      </div>
      <h4>Items in Avoir</h4>
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
        <p>No items found in this avoir.</p>
      )}
    </div>
  );
};

export default SingleAvoir;
