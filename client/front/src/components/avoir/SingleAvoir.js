import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchAvoirById, useFetchItemsInAvoir, useValidateAvoir } from '../../hooks/avoirHooks';

const SingleAvoir = ({ avoirId, onChangeView }) => {
  const { avoir, loading, error } = useFetchAvoirById(avoirId);
  const { items, loadingItems, errorItems } = useFetchItemsInAvoir(avoirId);
  const { validate, isValidated } = useValidateAvoir();
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const avoirButtons = [
      <button key="update" onClick={() => onChangeView('update', avoirId)}>Update Avoir</button>,
      <button key="delete" onClick={() => onChangeView('delete', avoirId)}>Delete Avoir</button>,
      <button key="addItem" onClick={() => onChangeView('addItem', avoirId)}>Add Item</button>,
      <button key="viewItems" onClick={() => onChangeView('viewItems', avoirId)}>View Items</button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Keep the first two base buttons
      ...avoirButtons
    ]);

    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, avoirId]);

  const handleValidateClick = async () => {
    try {
        
      await validate(avoirId);
      alert('Avoir has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate avoir: ${error}`);
    }
  };

  if (loading || loadingItems) return <p>Loading...</p>;
  if (error) return <p>Error fetching avoir: {error}</p>;
  if (errorItems) return <p>Error fetching items: {errorItems}</p>;
  if (!avoir) return <p>No avoir found</p>;

  return (
    <div>
      <h3>Avoir Details</h3>
      <div>
        <strong>Reference:</strong> {avoir.REF_DEV}<br/>
        <strong>Date:</strong> {avoir.DATE_DEV}<br/>
        <strong>Client:</strong> {avoir.CLIENT}<br/>
        <strong>Total:</strong> {avoir.MNT_TTC} HT:{avoir.MNT_HT}<br/>
        <strong>Status:</strong> {avoir.VALIDER ? 'Validated' : 'Not Validated'}<br/>
        {!isValidated && <button onClick={handleValidateClick}>Validate Avoir</button>}
      </div>
      <h4>Items in Avoir</h4>
      {items && items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.CODE_ART}>
              {item.ARTICLE} - Quantity: {item.QTE} {item.PV_TTC} € Total: {item.TotalTTC}
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
