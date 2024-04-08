import React, { useState } from 'react';
import { useFetchItemsInBonliv, useUpdateItemInBonliv } from '../../hooks/bonlivHooks';
import DeleteItemFromBonlivButton from './DeleteItemFromBonlivButton';

const ItemsInBonlivList = ({ refBonliv }) => {
    const { items, loading, error, refetch } = useFetchItemsInBonliv(refBonliv);
    const { updateItem } = useUpdateItemInBonliv(); // Called at the top level
    const [editedItems, setEditedItems] = useState({}); // Holds the edited qteliv values

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error fetching items: {error}</p>;
    if (!items || items.length === 0) return <p>No items found for this bonliv.</p>;

    const handleQteLivChange = (codeArt, newQteLiv) => {
        setEditedItems(prevItems => ({
            ...prevItems,
            [codeArt]: newQteLiv
        }));
    };

    const handleApplyChanges = async (codeArt) => {
        const newQteLiv = editedItems[codeArt];
        
        if (newQteLiv !== undefined) {
            await updateItem(refBonliv, codeArt, { qteliv: parseFloat(newQteLiv) });
            setEditedItems(prevItems => {
                const updatedItems = { ...prevItems };
                delete updatedItems[codeArt];
                return updatedItems;
            });
            
        }
    };

    return (
        <div>
            <h3>Items in Bonliv</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.CODE_ART}>
                        <span>{item.CODE_ART} - {item.ARTICLE} - Quantity: {item.QTE} - Delivered: </span>
                        <input
                            type="number"
                            value={editedItems[item.CODE_ART] ?? item.QTE}
                            onChange={(e) => handleQteLivChange(item.CODE_ART, e.target.value)}
                        />
                        <button onClick={() => handleApplyChanges(item.CODE_ART)}>Apply Changes</button>
                        <DeleteItemFromBonlivButton refBonliv={refBonliv} codeArt={item.CODE_ART} onSuccess={refetch} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsInBonlivList;
