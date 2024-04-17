import React, { useEffect } from 'react';
import { useFetchAllReglements } from '../../hooks/regHooks';

const ReglementList = ({ onSelectReglement }) => {
  const { reglements, loading, error } = useFetchAllReglements();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Reglement List</h2>
      <ul>
        {reglements.map(reglement => (
          <li key={reglement.REF_REGV} onClick={() => onSelectReglement(reglement.REF_REGV)}>
            {reglement.CLIENT} - {reglement.DATE_REG}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReglementList;
