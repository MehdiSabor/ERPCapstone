import React, { useState, useEffect } from 'react';
import { useUpdateFour, useFetchFourById} from '../../hooks/fourHooks'; // Adjust the import path as necessary

const FourUpdateForm = ({ fourId }) => {
  const { Four, loading: fetching } = useFetchFourById(fourId);
  
  const { handleUpdate, isUpdated } = useUpdateFour();

  // Reflecting Four's fields based on your schema
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

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    
    if (Four) {
      // Populate form data with the Four's current data
      setFormData({ ...initialState, ...Four });
    }
    
  }, [Four]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(fourId, formData);
    if (isUpdated) {
      // Handle successful update (e.g., show a message or redirect)
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Iterate over formData to generate input fields */}
      {Object.keys(formData).map(key => (
        <div key={key}>
          <label>{key}: </label>
          <input
            type={key === 'echeance' || key === 'cond_paie' || key === 'bloquer' ? 'checkbox' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            checked={key === 'echeance' || key === 'cond_paie' || key === 'bloquer' ? formData[key] : undefined}
          />
        </div>
      ))}
      <button type="submit">Update Four</button>
    </form>
  );
};

export default FourUpdateForm;
