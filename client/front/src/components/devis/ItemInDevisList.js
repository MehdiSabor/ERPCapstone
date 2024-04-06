import React, { useState } from 'react';
import { useFetchItemsInDevis } from '../../hooks/devisHooks';
import UpdateItemInDevisForm from './updateItemInDevisForm';
import DeleteItemFromDevisButton from './DeleteItemFromDevisButton';

const ItemsInDevisList = ({ refDevis }) => {

    const [fetchTrigger, setFetchTrigger] = useState(false);
    const { items, loading, error } = useFetchItemsInDevis(refDevis, fetchTrigger); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'update', 'single'

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error fetching items: {error}</p>;
  if (!items || items.length === 0) return <p>No items found for this devis.</p>;

  

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setView('update');
  };

  return (
    <div>
      <h3>Items in Devis</h3>
      {view === 'list' && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.ARTICLE} - Quantity: {item.QTE} {item.PV_TTC} €
              <button onClick={() => handleEditItem(item)}>Edit</button>
              <DeleteItemFromDevisButton refDevis={refDevis} codeArt={item.CODE_ART} onSuccess={() => {
    setView('list');
    setFetchTrigger(prev => !prev); // Toggle fetchTrigger to re-fetch items
  }}  />
            </li>
          ))}
        </ul>
      )}
      {view === 'update' && selectedItem && (
        <UpdateItemInDevisForm 
  refDevis={refDevis} 
  article={selectedItem} 
  onSuccess={() => {
    setView('list');
    setFetchTrigger(prev => !prev); // Toggle fetchTrigger to re-fetch items
  }} 
/> )}
      
    </div>
  );
};

export default ItemsInDevisList;
