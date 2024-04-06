import React, { useState } from 'react';
import { useCreateDevis } from '../../hooks/devisHooks'; // Adjust this path as needed

const DevisForm = () => {
  const { handleCreate } = useCreateDevis(); // This function needs to be implemented in your hooks
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
    const formattedData = {
      ...devisData,
      DATEVALID: devisData.DATEVALID ? new Date(devisData.DATEVALID).toISOString() : null,
      HEUREVALID: devisData.HEUREVALID ? new Date(devisData.HEUREVALID).toISOString() : null,
      DATE_DEV: devisData.DATE_DEV ? new Date(devisData.DATE_DEV).toISOString() : null,
    };
    await handleCreate(formattedData); // Make sure this function correctly handles the data
  };
  return (
    <div>
      <h2>Create Devis</h2>
      <form onSubmit={handleSubmit}>
      {Object.entries(initialState).map(([key]) => ( // No need to destructure value here
  <div key={key}>
    <label>{key.replace('_', ' ')}: </label>
    <input
      type={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? 'checkbox' : 
            ['DATEVALID', 'HEUREVALID', 'DATE_DEV'].includes(key) ? 'date' :
            ['MNT_HT', 'MNT_TTC', 'CODE_COM', 'CODE_ENT', 'NOTES'].includes(key) ? 'number' : 'text'}
      name={key}
      value={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? '' : devisData[key]} // Corrected to use devisData for value
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
