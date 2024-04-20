import React, { useEffect } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchComById } from '../../hooks/comHooks';

const SingleCom = ({ comId, onChangeView }) => {
    const { Com, loading, error } = useFetchComById(comId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        const comButtons = [
            <button key="update" onClick={() => onChangeView('update', comId)}>Update Comercial</button>,
            <button key="delete" onClick={() => onChangeView('delete', comId)}>Delete Comercial</button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2),  // Keep the first two base buttons
            ...comButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons, onChangeView, comId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!Com) return <p>No comercial found</p>;

    return (
        <div>
            <h3>Comercial Details</h3>
            <ul>
                {Object.entries(Com).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default SingleCom;
