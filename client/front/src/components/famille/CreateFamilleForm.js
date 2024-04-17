import React, { useState } from 'react';
import { useCreateFamille } from '../../hooks/familleHooks';

const CreateFamilleForm = () => {
  const [formData, setFormData] = useState({ nom: '' });
  const { handleCreate, isSubmitting, error } = useCreateFamille();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleCreate(formData);
    console.log('Famille Created:', result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        placeholder="Nom de la famille"
        required
      />
      
      <button type="submit" disabled={isSubmitting}>Create Famille</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default CreateFamilleForm;
