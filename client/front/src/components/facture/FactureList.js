import React from 'react';
import { useFetchAllFactures } from '../../hooks/factureHooks'; // Adjust the import path as necessary

const FactureList = ({ onSelectFacture }) => {
  const { factures, loading, error } = useFetchAllFactures();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching factures: {error}</p>;

  return (
    <div>
      <h2>Facture List</h2>
      <ul>
        {factures.map((facture) => (
          <li key={facture.REF_FAC} onClick={() => onSelectFacture(facture.REF_FAC)}>
            {facture.CLIENT} - {facture.REF_FAC} - Total: {facture.MNT_TTC.toFixed(2)}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FactureList;
