import React, { useState } from 'react';
import { useCreateReglement } from '../../hooks/regHooks';
import { useFetchAllClients } from '../../hooks/clientHooks'; // Assuming this hook exists and works similarly to devis
import ClientList from '../client/ClientList'; // Adjust path as necessary

const CreateReglementForm = ({ onSuccess }) => {
  const initialState = {
    CODE_CLT: '',
    CLIENT: '',
    MNT_REGLER: 0,
    MODE_REG: '',
    BANQUE: '',
    REMARQUE: '',
    VILLE: ''
  };

  const [reglementData, setReglementData] = useState(initialState);
  const [showClientList, setShowClientList] = useState(false);
  const { handleCreate, isCreating, error } = useCreateReglement();
  const { clients, loading: loadingClients, error: errorClients } = useFetchAllClients();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReglementData(prev => ({
      ...prev,
      [name]: name === 'MNT_REGLER' ? parseFloat(value) || 0 : value
    }));
  };

  const handleClientSelect = (client) => {
    setReglementData(prevData => ({
      ...prevData,
      CODE_CLT: client.code_clt,
      CLIENT: client.nom
    }));
    setShowClientList(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleCreate(reglementData);
    if (result) {
      onSuccess(); // Refresh or navigate away
    }
  };

  if (loadingClients) return <p>Loading clients...</p>;
  if (errorClients) return <p>Error loading clients: {errorClients}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => setShowClientList(!showClientList)}>
        Select Client
      </button>
      {showClientList && <ClientList onSelectClient={handleClientSelect} clients={clients} />}   
      {reglementData.CODE_CLT && <p>Selected client: {reglementData.CODE_CLT}</p>}
                
      <label>
        Amount:
        <input
          name="MNT_REGLER"
          type="number"
          value={reglementData.MNT_REGLER}
          onChange={handleChange}
        />
      </label>
      {/* Additional fields here */}
      <label>
        Payment Mode:
        <input
          name="MODE_REG"
          type="text"
          value={reglementData.MODE_REG}
          onChange={handleChange}
        />
      </label>
      <label>
        Bank:
        <input
          name="BANQUE"
          type="text"
          value={reglementData.BANQUE}
          onChange={handleChange}
        />
      </label>
      <label>
        Remark:
        <input
          name="REMARQUE"
          type="text"
          value={reglementData.REMARQUE}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          name="VILLE"
          type="text"
          value={reglementData.VILLE}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={isCreating}>Create Reglement</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default CreateReglementForm;
