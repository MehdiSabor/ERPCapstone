import React, { useState, useEffect } from 'react';
import { useUpdateAvoir, useFetchAvoirById } from '../../hooks/avoirHooks'; // Correct import paths as necessary

const AvoirUpdateForm = ({ avoirId }) => {
  const { avoir, loading: fetching } = useFetchAvoirById(avoirId);
  const { handleUpdate, isUpdated } = useUpdateAvoir();

  const initialState = {
    REF_AVR: '',
    DATE_AVR: '',
    CODE_CLT: '',
    CLIENT: '',
    CODE_COM: 0,
    VALIDER: false,
    REMARQUE: '',
    BASEHT: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (Object.hasOwnProperty.call(initialState, name)) { // Only allow changes to fields in initialState
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  useEffect(() => {
    if (avoir) {
      const filteredAvoir = Object.keys(initialState).reduce((obj, key) => {
        obj[key] = avoir[key];
        return obj;
      }, {});
      setFormData(filteredAvoir);
    }
  }, [avoir]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = Object.keys(formData).reduce((obj, key) => {
      if (initialState.hasOwnProperty(key)) {
        obj[key] = formData[key];
      }
      return obj;
    }, {});
    await handleUpdate(avoirId, dataToSubmit);
    if (isUpdated) {
      // Handle successful update
    }
  };

  if (fetching) return <p>Loading...</p>;

  // Only create input fields for keys in initialState
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(initialState).map(key => (
        <div key={key}>
          <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}:</label>
          <input
            id={key}
            type={['VALIDER', 'BASEHT'].includes(key) ? 'checkbox' :
                  ['CODE_COM'].includes(key) ? 'number' : 'text'}
            name={key}
            checked={['VALIDER', 'BASEHT'].includes(key) ? formData[key] : false}
            value={['VALIDER', 'BASEHT'].includes(key) ? '' : formData[key] || ''}
            onChange={handleChange}
            placeholder={key.replace('_', ' ').toUpperCase()}
            disabled={key === 'REF_AVR'} // Optionally disable fields that should not be changed
          />
        </div>
      ))}
      <button type="submit">Update Avoir</button>
    </form>
  );
};

export default AvoirUpdateForm;
