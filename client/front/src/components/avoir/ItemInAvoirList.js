import React, { useState } from 'react';
import { useFetchItemsInAvoir } from '../../hooks/avoirHooks';
import UpdateItemInAvoirForm from './updateItemInAvoirForm';
import DeleteItemFromAvoirButton from './DeleteItemFromAvoirButton';

const ItemsInAvoirList = ({ refAvoir }) => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const { items, loading, error } = useFetchItemsInAvoir(refAvoir, fetchTrigger); 
    const [selectedItem, setSelectedItem] = useState(null);
    const [view, setView] = useState('list'); // 'list', 'update', 'single'

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error fetching items: {error}</p>;
    if (!items || items.length === 0) return <p>No items found for this avoir.</p>;

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setView('update');
    };

    return (
        <div>
            <h3>Items in Avoir</h3>
            {view === 'list' && (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.ARTICLE} - Quantity: {item.QTE} {item.PV_TTC} € Total: {item.TotalTTC}
                            <button onClick={() => handleEditItem(item)}>Edit</button>
                            <DeleteItemFromAvoirButton refAvoir={refAvoir} codeArt={item.CODE_ART} onSuccess={() => {
                                setView('list');
                                setFetchTrigger(prev => !prev); // Toggle fetchTrigger to re-fetch items
                            }} />
                        </li>
                    ))}
                </ul>
            )}
            {view === 'update' && selectedItem && (
                <UpdateItemInAvoirForm 
                    refAvoir={refAvoir} 
                    article={selectedItem} 
                    onSuccess={() => {
                        setView('list');
                        setFetchTrigger(prev => !prev); // Toggle fetchTrigger to re-fetch items
                    }} 
                />
            )}
        </div>
    );
};

export default ItemsInAvoirList;
