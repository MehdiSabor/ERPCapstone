import React, { useState } from 'react';
import { useAddItemToDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary

const AddItemToDevisForm = ({ refDevis }) => {
  const { addItem } = useAddItemToDevis();
  
  const initialState = {
    REF_DEV: refDevis, // This value is preset and should not change
    CODE_ART: '',
    ARTICLE: '',
    QTE: 0,
    GRATUIT: 0,
    PA_HT: 0,
    PV_HT: 0,
    PV_TTC: 0,
    REMISE: 0,
    REMISEG: 0,
    TVA: 0,
    QTEliv: 0,
  };

  const [itemData, setItemData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(refDevis, itemData);
    // Optionally reset the form or provide feedback here
    setItemData(initialState);
  };

  return (
    <div>
      <h2>Add Item to Devis</h2>
      <form onSubmit={handleSubmit}>
        {/* Skip REF_DEV as it is already set */}
        {Object.keys(initialState).filter(key => key !== 'REF_DEV').map(key => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key.includes('QTE') || key.includes('GRATUIT')|| key.includes('PA_HT') || key.includes('PV_HT') || key.includes('PV_TTC') || key.includes('REMISE') || key === 'TVA' ? "number" : "text"}
              name={key}
              value={itemData[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </div>
        ))}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemToDevisForm;
