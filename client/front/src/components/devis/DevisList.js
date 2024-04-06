import React from 'react';
import { useFetchAllDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary

const DevisList = ({ onSelectDevis }) => {
  const { devis, loading, error } = useFetchAllDevis();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching devis: {error}</p>;

  return (
    <div>
      <h2>Devis List</h2>
      <ul>
        {devis.map((devisItem) => (
          <li key={devisItem.REF_DEV} onClick={() => onSelectDevis(devisItem.REF_DEV)}>
            {devisItem.CLIENT} - {devisItem.REF_DEV} - Total: {devisItem.MNT_TTC.toFixed(2)}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevisList;
