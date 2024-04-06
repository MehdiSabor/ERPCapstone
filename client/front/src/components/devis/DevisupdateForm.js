import React, { useState, useEffect } from 'react';
import { useUpdateDevis, useFetchDevisById } from '../../hooks/devisHooks'; // Ensure the path matches your hooks' location

const DevisUpdateForm = ({ devisId }) => {
  const { devis, loading: fetching } = useFetchDevisById(devisId);
  const { handleUpdate, isUpdated } = useUpdateDevis();

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

  const [formData, setFormData] = useState(initialState);

  const toLocalDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (devis) {
      setFormData({ ...initialState, ...devis });
    }
  }, [devis]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(devisId, formData);
    if (isUpdated) {
      // Handle successful update, such as showing a notification or redirecting
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    
    <form onSubmit={handleSubmit}>
     {Object.keys(formData).map(key => (
  <div key={key}>
    <label>{key.replace('_', ' ')}:</label>
   
    <input
      type={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? 'checkbox' :
            ['MNT_HT', 'MNT_TTC', 'CODE_COM', 'NOTES'].includes(key) ? 'number' :
            ['DATE_DEV', 'DATEVALID', 'HEUREVALID'].includes(key) ? 'date' : 'text'}
      name={key}
      // Use toLocalDate for date inputs, otherwise use formData[key]
      value={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? '' :
             ['DATE_DEV', 'DATEVALID', 'HEUREVALID'].includes(key) ? toLocalDate(formData[key]) : formData[key]}
      // Only for checkboxes
      checked={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? formData[key] : undefined}
      onChange={handleChange}
      placeholder={key.replace('_', ' ')}
    />
  </div>
))}

      <button type="submit">Update Devis</button>
    </form>
  );
};

export default DevisUpdateForm;
