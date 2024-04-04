import React, { useState, useEffect } from 'react';
import { useUpdateClient, useFetchClientById } from '../../hooks/clientHooks';

const ClientUpdateForm = ({ clientId }) => {
  const { client, loading: fetching } = useFetchClientById(clientId);
  const { handleUpdate, isUpdated } = useUpdateClient();

  // Extended to match the ClientForm's initialState
  const initialState = {
    code_clt: '',
    nom: '',
    compte: '',
    tel: '',
    adresse: '',
    ville: '',
    code_region: '',
    note: '',
    echeance: 0,
    mode_paie: '',
    REMISE_G: 0.0,
    bloquer: false,
    plafond: 0.0,
    code_com: 0,
    cond_paie: '',
    mode_liv: '',
    code_cat: '',
    SOLDE: 0
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (client) {
      // Spread the client object to fill the form data, ensuring all fields are covered
      setFormData({ ...initialState, ...client });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(clientId, {
      ...formData,
      echeance: parseInt(formData.echeance, 10) || 0,
      REMISE_G: parseFloat(formData.REMISE_G) || 0.0,
      plafond: parseFloat(formData.plafond) || 0.0,
      code_com: parseInt(formData.code_com, 10) || 0,
      SOLDE: parseInt(formData.SOLDE, 10) || 0,
      code_region: formData.code_region ? parseInt(formData.code_region, 10) : null,
      cond_paie: formData.cond_paie ? parseInt(formData.cond_paie, 10) : null,
      code_cat: formData.code_cat ? parseInt(formData.code_cat, 10) : null,
    });
    if (isUpdated) {
      // Handle successful update (e.g., show a message or redirect)
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Iterate over formData instead of initialState to generate input fields */}
      {Object.keys(formData).map(key => (
        key !== "bloquer" ? (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key.includes("echeance") || key.includes("plafond") || key.includes("REMISE_G") || key.includes("SOLDE") || key.includes("code_") ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </div>
        ) : (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={handleChange}
              /> {key}
            </label>
          </div>
        )
      ))}
      <button type="submit">Update Client</button>
    </form>
  );
};

export default ClientUpdateForm;
