import React, { useState } from 'react';
import { useFetchItemsInBonliv, useUpdateItemInBonliv } from '../../hooks/bonlivHooks';
import DeleteItemFromBonlivButton from './DeleteItemFromBonlivButton';

const ItemsInBonlivList = ({ refBonliv }) => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const { items, loading, error } = useFetchItemsInBonliv(refBonliv, fetchTrigger);
    const { updateItem } = useUpdateItemInBonliv();
    const [editedItems, setEditedItems] = useState({});

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error fetching items: {error}</p>;
    if (!items || items.length === 0) return <p>No items found for this bonliv.</p>;

    const handleQteLivChange = (codeArt, newQteLiv) => {
        setEditedItems(prevItems => ({
            ...prevItems,
            [codeArt]: { ...prevItems[codeArt], qteliv: newQteLiv }
        }));
    };

    const handleApplyChanges = async (codeArt) => {
        const itemToBeUpdated = editedItems[codeArt];
        
        if (itemToBeUpdated && itemToBeUpdated.qteliv !== undefined) {
            await updateItem(refBonliv, codeArt, { qteliv: parseFloat(itemToBeUpdated.qteliv) || 0 });
            setEditedItems(prevItems => {
                const updatedItems = { ...prevItems };
                delete updatedItems[codeArt];
                return updatedItems;
            });
            setFetchTrigger(t => !t); // Toggle fetchTrigger to re-fetch items
        }
    };

    const copyAllQteToQteLiv = () => {
        const newEditedItems = items.reduce((acc, item) => {
            return {
                ...acc,
                [item.CODE_ART]: { ...item, qteliv: item.QTE }
            };
        }, {});
        setEditedItems(newEditedItems);
        // Note: This only updates the visual representation. You'll need to manually click "Apply Changes" for each item.
    };

    return (
        <div>
            <h3>Items in Bonliv</h3>
            <button onClick={copyAllQteToQteLiv}>Copy QTE to QTÉLIV for all</button>
            <ul>
                {items.map((item) => (
                    <li key={item.CODE_ART}>
                        <span>{item.CODE_ART} - {item.ARTICLE} - Quantity: {item.QTE} - Delivered: </span>
                        <input
                            type="number"
                            value={editedItems[item.CODE_ART]?.qteliv ?? item.qteliv ?? ''}
                            onChange={(e) => handleQteLivChange(item.CODE_ART, e.target.value)}
                        />
                        <button onClick={() => handleApplyChanges(item.CODE_ART)}>Apply Changes</button>
                        <DeleteItemFromBonlivButton refBonliv={refBonliv} codeArt={item.CODE_ART} onSuccess={() => setFetchTrigger(t => !t)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsInBonlivList;
