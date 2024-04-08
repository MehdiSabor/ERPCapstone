import React, { useState, useEffect } from 'react';
import { useUpdateBonliv, useFetchBonlivById } from '../../hooks/bonlivHooks'; // Ensure the path matches your hooks' location

const BonlivUpdateForm = ({ bonlivId }) => {
  const { bonliv, loading } = useFetchBonlivById(bonlivId);
  const { handleUpdate, isUpdated } = useUpdateBonliv();

  const initialState = {
    REF_BL: '',        // Assuming REF_BL is immutable
    DATE_BL: '',       // Assuming DATE_BL is immutable
    REF_DEV: '',       // Assuming REF_DEV is immutable
    DATEVALID: '',
    HEUREVALID: '',
    COMPTE: '',
    CODE_CLT: '',      // Assuming CODE_CLT is immutable, represented as a number in the model
    CLIENT: '',        // Assuming CLIENT is derived from CODE_CLT and thus immutable
    MNT_HT: 0,
    MNT_TTC: 0,
    EN_FACTURE: false,
    VALIDER: false,
    MODELIV: '',
    MODE_PAIE: '',
    REMARQUE: '',
    CODE_CON: 0,
    CODE_ADR: 0,
    BASEHT: false,
    IMPRIMER: false,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (bonliv) {
      // Convert DATEVALID and HEUREVALID to the appropriate string format if needed
      const updatedFormData = {
        ...initialState,
        ...bonliv,
        DATEVALID: bonliv.DATEVALID ? new Date(bonliv.DATEVALID).toISOString().substring(0, 10) : '',
        HEUREVALID: bonliv.HEUREVALID ? new Date(bonliv.HEUREVALID).toISOString().substring(11, 19) : '',
      };
      setFormData(updatedFormData);
    }
  }, [bonliv]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...formData,
      DATEVALID: formData.DATEVALID ? new Date(formData.DATEVALID) : null,
      HEUREVALID: formData.HEUREVALID ? new Date(`1970-01-01T${formData.HEUREVALID}`) : null,
    };
    await handleUpdate(bonlivId, updateData);
    if (isUpdated) {
      // Handle successful update, such as showing a notification or redirecting
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields dynamically based on initialState */}
      {Object.keys(initialState).map(key => (
        key !== 'REF_BL' && key !== 'DATE_BL' && key !== 'REF_DEV' && key !== 'CLIENT' && // Skip immutable fields
        <div key={key}>
          <label>{key.replace('_', ' ')}:</label>
          <input
            type={['MNT_HT', 'MNT_TTC', 'CODE_CON', 'CODE_ADR'].includes(key) ? 'number' :
                  ['EN_FACTURE', 'VALIDER', 'BASEHT', 'IMPRIMER'].includes(key) ? 'checkbox' :
                  ['DATEVALID', 'HEUREVALID'].includes(key) ? 'datetime-local' : 'text'}
            name={key}
            value={['EN_FACTURE', 'VALIDER', 'BASEHT', 'IMPRIMER'].includes(key) ? '' : formData[key]}
            checked={['EN_FACTURE', 'VALIDER', 'BASEHT', 'IMPRIMER'].includes(key) ? formData[key] : undefined}
            onChange={handleChange}
            placeholder={`Enter ${key.replace('_', ' ').toLowerCase()}`}
          />
        </div>
      ))}
      <button type="submit">Update Bonliv</button>
    </form>
  );
};

export default BonlivUpdateForm;
