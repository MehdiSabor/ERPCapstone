import React, { useState } from 'react';
import { useCreateFour } from '../../hooks/fourHooks'; // Adjust the import path as necessary

const FourForm = () => {
  const { handleCreate } = useCreateFour();
  const initialState = {
    code_frs: '',
    compte: '',
    sociale: '',
    desc: '',
    pays: '',
    echeance: false,
    note: '',
    cond_paie: false,
    bloquer: false
  };

  const [fourData, setFourData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFourData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Transform boolean strings back to booleans
    const payload = {
      ...fourData,
      echeance: fourData.echeance === 'true',
      cond_paie: fourData.cond_paie === 'true',
      bloquer: fourData.bloquer === 'true'
    };
    await handleCreate(payload);
    // Reset form or provide feedback here
    setFourData(initialState);
  };

  return (
    <div>
      <h2>Create Four</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialState).map(key => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key === 'echeance' || key === 'cond_paie' || key === 'bloquer' ? 'checkbox' : 'text'}
              name={key}
              value={fourData[key]}
              onChange={handleChange}
              placeholder={key}
              // For checkboxes, you might want to manage the checked state differently
              checked={['echeance', 'cond_paie', 'bloquer'].includes(key) ? fourData[key] : undefined}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FourForm;
