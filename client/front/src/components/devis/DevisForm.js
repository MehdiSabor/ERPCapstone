import React, { useState } from 'react';
import { useCreateDevis } from '../../hooks/devisHooks'; // Adjust this path as needed

const DevisForm = () => {
  const { createDevis } = useCreateDevis(); // This function needs to be implemented in your hooks
  const initialState = {
    REF_DEV: '',
    DATEVALID: '',
    HEUREVALID: '',
    DATE_DEV: '',
    COMPTE: '',
    CODE_CLT: '',
    CLIENT: '',
    MNT_HT: 0,
    MNT_TTC: 0,
    EN_BC: false,
    EN_BL: false,
    CODE_COM: 0,
    VALIDER: false,
    REMARQUE: '',
    MODELIV: '',
    MODE_PAIE: '',
    BASEHT: false,
    NOTES: 0,
  };

  const [devisData, setDevisData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDevisData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDevis(devisData); // Implement this in your hooks
    setDevisData(initialState); // Reset form after submission
  };

  return (
    <div>
      <h2>Create Devis</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(initialState).map(([key, value]) => (
          <div key={key}>
            <label>{key.replace('_', ' ')}: </label>
            <input
              type={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? 'checkbox' : 
                    ['DATEVALID', 'HEUREVALID', 'DATE_DEV'].includes(key) ? 'date' :
                    ['MNT_HT', 'MNT_TTC', 'CODE_COM', 'CODE_ENT', 'NOTES'].includes(key) ? 'number' : 'text'}
              name={key}
              value={value}
              checked={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? devisData[key] : undefined}
              onChange={handleChange}
              placeholder={key.replace('_', ' ')}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DevisForm;
