import React from 'react';
import { useFetchAllClients } from '../../hooks/clientHooks';
const ClientList = ({ onSelectClient }) => {
    const { clients, loading, error } = useFetchAllClients();
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Clients List</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.code_clt} onClick={() => onSelectClient(client)}>
            {client.code_clt} {client.nom} - {client.ville}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ClientList;
