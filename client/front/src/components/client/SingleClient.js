import React from 'react';
import { useFetchClientById } from '../../hooks/clientHooks';

const SingleClient = ({ clientId, onChangeView }) => {
    const { client, loading, error } = useFetchClientById(clientId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!client) return <p>No client found</p>;

    // Function to format the value based on its type for better readability
    const formatValue = (key, value) => {
      if (key === 'bloquer') return value ? 'Yes' : 'No';
      if (key === 'createdAt') return new Date(value).toLocaleDateString();
      return value;
    };

    return (
      <div>
        <h3>Client Details</h3>
        <ul>
          {Object.entries(client).map(([key, value]) => (
            // Exclude relational or complex fields from direct rendering
            !['devis', 'bonliv', 'facture', 'avoirs', 'reglements', 'UnifiedFactureAvoir', 'comercial'].includes(key) && (
              <li key={key}>{`${key}: ${formatValue(key, value)}`}</li>
            )
          ))}
        </ul>
        <button onClick={() => onChangeView('update', clientId)}>Update Client</button>
        <button onClick={() => onChangeView('delete', clientId)}>Delete Client</button>
      </div>
    );
};

export default SingleClient;
