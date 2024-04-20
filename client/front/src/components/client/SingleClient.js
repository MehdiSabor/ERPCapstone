import React, { useEffect } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchClientById } from '../../hooks/clientHooks';

const SingleClient = ({ clientId, onChangeView }) => {
    const { client, loading, error } = useFetchClientById(clientId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        // Define SingleClient specific buttons
        const clientButtons = [
            <button key="update" onClick={() => onChangeView('update', clientId)}>Update Client</button>,
            <button key="delete" onClick={() => onChangeView('delete', clientId)}>Delete Client</button>
        ];

        // Set the buttons for this client view
        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2), // Assume first two are base buttons, adjust slice as necessary
            ...clientButtons
        ]);

        // Clean up by removing only the client-specific buttons on unmount
        return () => {
            setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
        };
    }, [setSidebarButtons, onChangeView, clientId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!client) return <p>No client found</p>;

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
                    !['devis', 'bonliv', 'facture', 'avoirs', 'reglements', 'UnifiedFactureAvoir', 'comercial'].includes(key) && (
                        <li key={key}>{`${key}: ${formatValue(key, value)}`}</li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default SingleClient;
