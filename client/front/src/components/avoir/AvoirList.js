import React from 'react';
import { useFetchAllAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const AvoirList = ({ onSelectAvoir }) => {
  const { avoir, loading, error } = useFetchAllAvoir();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching avoir: {error}</p>;

  return (
    <div>
      <h2>Avoir List</h2>
      <ul>
        {avoir.map((avoirItem) => (
          <li key={avoirItem.REF_AVR} onClick={() => onSelectAvoir(avoirItem.REF_AVR)}>
            {avoirItem.CLIENT} - {avoirItem.REF_AVR} - Total: {avoirItem.MNT_TTC.toFixed(2)}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvoirList;
