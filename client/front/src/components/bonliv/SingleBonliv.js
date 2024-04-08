import React, { useEffect, useState } from 'react';
import { useFetchBonlivById, useFetchItemsInBonliv, useValidateBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const SingleBonliv = ({ bonlivId , onChangeView }) => {
  const { bonliv, loading: loadingBonliv, error: errorBonliv } = useFetchBonlivById(bonlivId);
  const { items, loading: loadingItems, error: errorItems } = useFetchItemsInBonliv(bonlivId);
  const { validate, error, isValidated } = useValidateBonliv(bonlivId);
 // Function to handle the click on the Validate button
 const handleValidateClick = async () => {
  try{
  await validate();
  
      alert('Bonliv has been successfully validated.');
      // Optionally, you can trigger other actions here, such as navigating away or refreshing the data
  } catch(error) {
      alert(`Failed to validate bonliv: ${error}`);
  }
};

  // To ensure that the items are re-fetched when the bonliv changes
  useEffect(() => {
    if (bonlivId) {
      // Fetch details of the bonliv by ID
    }
  }, [bonlivId]);

  if (loadingBonliv || loadingItems) return <p>Loading...</p>;
  if (errorBonliv) return <p>Error fetching bonliv: {errorBonliv}</p>;
  if (errorItems) return <p>Error fetching items: {errorItems}</p>;
  if (!bonliv) return <p>No bonliv found</p>;

  return (
    <div>
    <button onClick={() => onChangeView('update', bonlivId)}>Update Bonliv</button>
      <button onClick={() => onChangeView('delete', bonlivId)}>Delete Bonliv</button>
      <button onClick={() => onChangeView('addItem', bonlivId)}>Add Item</button>
      <button onClick={() => onChangeView('viewItems', bonlivId)}>View Items</button>
      {!isValidated && (
                <button onClick={handleValidateClick}>Validate Bonliv</button>
            )}
            {error && <p>Error validating bonliv: {error}</p>}
      <h3>Bonliv Details</h3>
      <div>
      {console.log(bonliv)}
        <strong>Reference:</strong> {bonliv.REF_BL}<br/>
        <strong>Date:</strong> {bonliv.DATE_BL}<br/>
        <strong>Client:</strong> {bonliv.CLIENT}<br/>
        <strong>Total:</strong> {bonliv.MNT_TTC} HT:{bonliv.MNT_HT}<br/>
        <strong>Total Liv: {bonliv.MNT_TTCliv} </strong>
        
        <strong>{bonliv.VALIDER}</strong><br/>
        {/* Display other bonliv details here */}
      </div>
      <h4>Items in Bonliv</h4>
      {items && items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.CODE_ART}>
              {item.CODE_ART} - Quantity: {item.QTE} {item.PV_TTC} € - qteliv: {item.qteliv} Total: {item.TotalTTC}/Totalliv: {item.TotalTTCliv} 
              {/* Display other item details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this bonliv.</p>
      )}
    </div>
  );
};

export default SingleBonliv;
