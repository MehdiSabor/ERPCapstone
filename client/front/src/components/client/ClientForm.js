import React, { useState } from 'react';
import { useCreateClient } from '../../hooks/clientHooks';
import ComList from '../com/ComList';

const ClientForm = () => {
  const { handleCreate } = useCreateClient();
  const [showComList, setShowComList] = useState(false);

  const initialState = {
    
    nom: '',
    
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

  const [clientData, setClientData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClientData({
      ...clientData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectCom = (code_com) => {
    setClientData({ ...clientData, code_com });
    setShowComList(false); // Close the ComList after selection
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...clientData,
      echeance: parseInt(clientData.echeance, 10) || 0,
      REMISE_G: parseFloat(clientData.REMISE_G) || 0.0,
      plafond: parseFloat(clientData.plafond) || 0.0,
      code_com: parseInt(clientData.code_com, 10) || 0,
      SOLDE: parseInt(clientData.SOLDE, 10) || 0,
      code_region: clientData.code_region ? parseInt(clientData.code_region, 10) : null,
      cond_paie: clientData.cond_paie ? parseInt(clientData.cond_paie, 10) : null,
      code_cat: clientData.code_cat ? parseInt(clientData.code_cat, 10) : null,
    };
    await handleCreate(payload);
    // Reset form or provide feedback here
    setClientData(initialState);
  };

  return (
    <div>
      <h2>Create Client</h2>
      <form onSubmit={handleSubmit}>
        {/* Iterating over each field defined in the initialState for input generation */}
        {Object.keys(initialState).map(key => (
          key !== "bloquer" ? (
            <div key={key}>
              <label>{key}: </label>
              <input
                type={key.includes("echeance") || key.includes("plafond") || key.includes("REMISE_G") || key.includes("SOLDE") || key.includes("code_") ? "number" : "text"}
                name={key}
                value={clientData[key]}
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
                  checked={clientData[key]}
                  onChange={handleChange}
                /> {key}
              </label>
            </div>
          )
        ))}
        <div>
                    <button type="button" onClick={() => setShowComList(true)}>Select Commercial</button>
                    {clientData.code_com && <p>Selected Commercial: {clientData.code_com}</p>}
                </div>
                {showComList && <ComList  onSelectCom={handleSelectCom} />}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClientForm;
