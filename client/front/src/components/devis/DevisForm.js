import React, { useState } from 'react';
import { useCreateDevis } from '../../hooks/devisHooks';
import { useFetchAllComs } from '../../hooks/comHooks';
import { useFetchAllClients } from '../../hooks/clientHooks';
import ClientList from '../client/ClientList'; // Adjust paths as necessary
import ComList from '../com/ComList';

const DevisForm = () => {
    const { handleCreate } = useCreateDevis();
    const { Coms, loading: loadingComs, error: errorComs } = useFetchAllComs();
    const { clients, loading: loadingClients, error: errorClients } = useFetchAllClients();
    const [showClientList, setShowClientList] = useState(false);
    const [showComList, setShowComList] = useState(false);

    const initialState = {
       
        REMARQUE: '',
        MODELIV: '',
        MODE_PAIE: '',
        NOTES: '',
    };

    const [devisData, setDevisData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDevisData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleClientSelect = (client) => {
        setDevisData(prevData => ({
            ...prevData,
            CODE_CLT: client.code_clt,
            CLIENT: client.nom,
            COMPTE: client.compte
        }));
        setShowClientList(false);

        console.log(devisData);
    };

    const handleComSelect = (com) => {
      console.log(com);
        setDevisData(prevData => ({
            ...prevData,
            CODE_COM: com,
        }));
        setShowComList(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreate(devisData);
    };

    if (loadingComs || loadingClients) return <p>Loading...</p>;
    if ( errorClients) return <p>Error loading data</p>;

    return (
        <div>
            <h2>Create Devis</h2>
            <form onSubmit={handleSubmit}>
                {/* Trigger buttons for modals */}
                <div>
                <button type="button" onClick={() => setShowComList(true)}>Select Commercial</button>
                   
                {showComList && <ComList  onSelectCom={handleComSelect} />}
 </div>
                <div>
                    <button type="button" onClick={() => setShowClientList(true)}>Select Client</button>
                    {devisData.CODE_COM && <p>Selected comercial: {devisData.CODE_COM}</p>}
                
                    {devisData.CODE_CLT && <p>Selected Client: {devisData.CLIENT},{devisData.COMPTE} </p>}
                </div>


 {showClientList && <ClientList onSelectClient={handleClientSelect} clients={clients} />}

               {/* REMARQUE Field */}
               <div>
                    <label htmlFor="REMARQUE">Remarque:</label>
                    <textarea
                        id="REMARQUE"
                        name="REMARQUE"
                        value={devisData.REMARQUE}
                        onChange={handleChange}
                        placeholder="Add any remarks"
                    />
                </div>

                {/* MODELIV Field */}
                <div>
                    <label htmlFor="MODELIV">Mode of Delivery:</label>
                    <input
                        type="text"
                        id="MODELIV"
                        name="MODELIV"
                        value={devisData.MODELIV}
                        onChange={handleChange}
                        placeholder="Delivery mode"
                    />
                </div>

                {/* MODE_PAIE Field */}
                <div>
                    <label htmlFor="MODE_PAIE">Payment Mode:</label>
                    <input
                        type="text"
                        id="MODE_PAIE"
                        name="MODE_PAIE"
                        value={devisData.MODE_PAIE}
                        onChange={handleChange}
                        placeholder="Payment mode"
                    />
                </div>

                {/* NOTES Field */}
                <div>
                    <label htmlFor="NOTES">Notes:</label>
                    <input
                        type="text"
                        id="NOTES"
                        name="NOTES"
                        value={devisData.NOTES}
                        onChange={handleChange}
                        placeholder="Add notes if any"
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DevisForm;