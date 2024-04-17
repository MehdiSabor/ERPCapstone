import React, { useState } from 'react';
import { useUpdateFamille } from '../../hooks/familleHooks';

const ModifyFamilleForm = ({ familleId, initialData, onSuccess }) => {
  const [formData, setFormData] = useState(initialData);
  const { handleUpdate, isUpdating, error } = useUpdateFamille();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.nom]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdate(familleId, formData);
    onSuccess();  // Refresh or navigate away
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        required
      />
      
      <button type="submit" disabled={isUpdating}>Update Famille</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default ModifyFamilleForm;
