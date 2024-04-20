import React, { useEffect } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchFourById } from '../../hooks/fourHooks';

const SingleFour = ({ fourId, onChangeView }) => {
    const { Four, loading, error } = useFetchFourById(fourId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        const fourButtons = [
            <button key="update" onClick={() => onChangeView('update', fourId)}>Update Fournisseur</button>,
            <button key="delete" onClick={() => onChangeView('delete', fourId)}>Delete Fournisseur</button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2),  // Keep the first two base buttons
            ...fourButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons, onChangeView, fourId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!Four) return <p>No fournisseur found</p>;

    return (
        <div>
            <h3>Fournisseur Details</h3>
            <ul>
                {Object.entries(Four).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default SingleFour;
