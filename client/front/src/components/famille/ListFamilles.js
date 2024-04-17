import React, { useState } from 'react';
import { useFamilles } from '../../hooks/familleHooks';

const ListFamilles = ({ onSelectFamille }) => {
  const { familles, loading, error } = useFamilles();
  const [selectedFamilleId, setSelectedFamilleId] = useState(null);

  const handleSelect = (famille) => {
    setSelectedFamilleId(famille.code_fam);  // Assuming `id` is the identifier for famille
    onSelectFamille(famille.code_fam);  // Pass the selected famille ID up to the parent component
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {familles.map(famille => (
        <li
          key={famille.code_fam}  // Use a unique identifier from your famille data
          onClick={() => handleSelect(famille)}
          style={{ cursor: 'pointer', backgroundColor: selectedFamilleId === famille.code_fam ? '#cccccc' : 'transparent' }}
        >
          {famille.nom} - {famille.code_fam}
        </li>
      ))}
    </ul>
  );
};

export default ListFamilles;
