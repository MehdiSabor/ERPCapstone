import React from 'react';
import { useFetchAllBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const BonlivList = ({ onSelectBonliv }) => {
  const { bonliv, loading, error } = useFetchAllBonliv();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching bonliv: {error}</p>;

  return (
    <div>
      <h2>Bonliv List</h2>
      <ul>
        {bonliv.map((bonlivItem) => (
          <li key={bonlivItem.REF_BL} onClick={() => onSelectBonliv(bonlivItem.REF_BL)}>
            {bonlivItem.CLIENT} - {bonlivItem.REF_BL} - Total: {bonlivItem.MNT_TTC.toFixed(2)}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BonlivList;
