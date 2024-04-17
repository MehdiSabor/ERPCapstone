import React, { useState, useEffect } from 'react';
import { useUpdateReglement, useFetchReglementById } from '../../hooks/regHooks';

const ModifyReglementForm = ({ reglementId, onUpdated }) => {
  const { reglement, loading: fetching } = useFetchReglementById(reglementId);
  const [reglementData, setReglementData] = useState({ MNT_REGLER: 0 });
  const { handleUpdate, isUpdating, error } = useUpdateReglement();

  useEffect(() => {
    if (reglement) {
      setReglementData({ MNT_REGLER: reglement.MNT_REGLER });
    }
  }, [reglement]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdate(reglementId, reglementData);
    onUpdated();
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={reglementData.MNT_REGLER}
          onChange={e => setReglementData({...reglementData, MNT_REGLER: parseFloat(e.target.value)})}
        />
      </label>
      <button type="submit" disabled={isUpdating}>Update Reglement</button>
    </form>
  );
};

export default ModifyReglementForm;
