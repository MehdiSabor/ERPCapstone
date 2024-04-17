import React, { useState } from 'react';
import { useFetchAllUnifiedFactureAvoir, useAddDetailReglement } from '../../hooks/regHooks';

const UnifiedFactureAvoirList = ({ reglementId }) => {
    const { unifiedRecords, loading, error } = useFetchAllUnifiedFactureAvoir();
    const { handleAddDetail, isLoading, createError } = useAddDetailReglement();
    const [selectedUnified, setSelectedUnified] = useState(null);

    const handleSelect = (unified) => {
        setSelectedUnified(unified);
    };

    const handleAdd = async () => {
        if (!selectedUnified) {
            alert('No unified facture avoir selected.');
            return;
        }

        const regDetailData = {
            REF_REGV: reglementId,
            REF_AV_FAC: selectedUnified.REF_AV_FAC,
            MNT_REGLER: selectedUnified.MNT_TTC - selectedUnified.MNT_REGLER // Calculate the amount to be registered
        };

        try {
            await handleAddDetail(regDetailData);
            alert('Reglement detail added successfully!');
            setSelectedUnified(null); // Reset selection
        } catch (err) {
            alert('Failed to add reglement detail: ' + err.message);
        }
    };

    if (loading) return <p>Loading unified records...</p>;
    if (error) return <p>Error fetching unified records: {error}</p>;

    return (
        <div>
            <h3>Select Unified Facture Avoir to Add</h3>
            <ul>
                {unifiedRecords.map((unified) => (
                    <li key={unified.REF_AV_FAC} onClick={() => handleSelect(unified)} style={{ cursor: 'pointer', backgroundColor: selectedUnified === unified ? '#ccc' : 'transparent' }}>
                        {unified.REF_AV_FAC} - Remaining Amount: €{(unified.MNT_TTC - unified.MNT_REGLER).toFixed(2)}
                    </li>
                ))}
            </ul>
            <button onClick={handleAdd} disabled={isLoading}>Add Selected to Reglement</button>
            {createError && <p>Error: {createError}</p>}
        </div>
    );
};

export default UnifiedFactureAvoirList;
