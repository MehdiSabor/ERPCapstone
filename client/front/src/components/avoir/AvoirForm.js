import React, { useState } from 'react';
import { useCreateAvoir } from '../../hooks/avoirHooks';
import { useFetchAllComs } from '../../hooks/comHooks';
import { useFetchAllClients } from '../../hooks/clientHooks';
import ClientList from '../client/ClientList'; // Adjust paths as necessary
import ComList from '../com/ComList';

const AvoirForm = () => {
    const { handleCreate } = useCreateAvoir();
    const { Coms, loading: loadingComs, error: errorComs } = useFetchAllComs();
    const { clients, loading: loadingClients, error: errorClients } = useFetchAllClients();
    const [showClientList, setShowClientList] = useState(false);
    const [showComList, setShowComList] = useState(false);

    const initialState = {
        CODE_CLT: '',
        CLIENT: '',
        MNT_HT: 0,
        MNT_TTC: 0,
        CODE_COM: '',
        REMARQUE: '',
    };

    const [avoirData, setAvoirData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setAvoirData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleClientSelect = (client) => {
        setAvoirData(prevData => ({
            ...prevData,
            CODE_CLT: client.code_clt,
            CLIENT: client.nom,
        }));
        setShowClientList(false);
    };

    const handleComSelect = (com) => {
        console.log(com);
          setAvoirData(prevData => ({
              ...prevData,
              CODE_COM: com,
          }));
          setShowComList(false);
      };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreate(avoirData);
        alert('Avoir created successfully');
        setAvoirData(initialState); // Reset form after submission
    };

    if (loadingClients||loadingComs ) return <p>Loading clients/coms...</p>;
    if (errorComs ||errorClients) return <p>Error loading clients/coms: {errorClients}</p>;

    return (
        <div>
            <h2>Create Avoir</h2>
            <form onSubmit={handleSubmit}>
                <button type="button" onClick={() => setShowClientList(true)}>Select Client</button>
                {avoirData.CODE_CLT && <p>Selected Client: {avoirData.CLIENT}</p>}
                {showClientList && <ClientList onSelectClient={handleClientSelect} clients={clients} />}
                <div>
                <button type="button" onClick={() => setShowComList(true)}>Select Commercial</button>
                   
                {showComList && <ComList  onSelectCom={handleComSelect} />}
 </div>
                <div>
                    <label htmlFor="MNT_HT">Amount HT:</label>
                    <input
                        type="number"
                        id="MNT_HT"
                        name="MNT_HT"
                        value={avoirData.MNT_HT}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="MNT_TTC">Amount TTC:</label>
                    <input
                        type="number"
                        id="MNT_TTC"
                        name="MNT_TTC"
                        value={avoirData.MNT_TTC}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="REMARQUE">Remark:</label>
                    <textarea
                        id="REMARQUE"
                        name="REMARQUE"
                        value={avoirData.REMARQUE}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit Avoir</button>
            </form>
        </div>
    );
};

export default AvoirForm;
