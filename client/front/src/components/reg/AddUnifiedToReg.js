import React, { useState } from 'react';
import { useFetchAllUnifiedFactureAvoir, useCreateReglementDetailsBatch } from '../../hooks/regHooks';

const AddUnifiedToReglement = ({ reglementId, reglementMaxAmount }) => {
  const { unifiedRecords, loading, error } = useFetchAllUnifiedFactureAvoir();
  const { handleCreateBatch, isCreating, createError } = useCreateReglementDetailsBatch(); // Correct usage of hook
  const [selectedUnified, setSelectedUnified] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleSelect = (unified) => {
    const availableAmount = unified.MNT_TTC - unified.MNT_REGLER;
    const newTotal = selectedAmount + availableAmount;

    if (newTotal <= reglementMaxAmount) {
      setSelectedUnified([...selectedUnified, unified]);
      setSelectedAmount(newTotal);
    } else {
      // Optionally handle the case where only a partial amount can be added
      const remainingAmount = reglementMaxAmount - selectedAmount;
      if (remainingAmount > 0 && selectedUnified.length === 0) {
        setSelectedUnified(prev => [...prev, { ...unified, PARTIAL_AMOUNT: remainingAmount }]);
        setSelectedAmount(reglementMaxAmount);
      }
    }
  };

  const handleAdd = async () => {
    const details = selectedUnified.map(unified => ({
      REF_REGV: reglementId,
      REF_AV_FAC: unified.REF_AV_FAC,
      MNT_REGLER: unified.PARTIAL_AMOUNT || (unified.MNT_TTC - unified.MNT_REGLER),
      MNT_ORIGINAL: unified.MNT_TTC
    }));

    try {
      await handleCreateBatch(details);
      // Optionally reset selection after successful addition
      setSelectedUnified([]);
      setSelectedAmount(0);
    } catch (err) {
      console.error('Failed to add reglement details:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (isCreating) return <p>Adding...</p>;
  if (createError) return <p>Error adding details: {createError}</p>;

  return (
    <div>
      <h3>Add Unified to Reglement</h3>
      <p>Total Selected: {selectedAmount}MAD (Max: {reglementMaxAmount}MAD)</p>
      <ul>
        {unifiedRecords.map(unified => (
          <li key={unified.REF_AV_FAC} onClick={() => handleSelect(unified)} style={{ cursor: 'pointer', backgroundColor: selectedUnified.find(item => item.REF_AV_FAC === unified.REF_AV_FAC) ? '#ccc' : 'transparent' }}>
            {unified.REF_AV_FAC} - Remaining: {unified.MNT_TTC - unified.MNT_REGLER}MAD
          </li>
        ))}
      </ul>
      {selectedUnified.length > 0 && <button onClick={handleAdd}>Add Selected to Reglement</button>}
    </div>
  );
};

export default AddUnifiedToReglement;
