import React from 'react';
import { useFetchFamilleById } from '../../hooks/familleHooks';

const SingleFamille = ({ familleId, onModify, onDelete }) => {
  const { famille, loading, error } = useFetchFamilleById(familleId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!famille) return <p>No Famille found</p>;

  return (
    <div>
      <h3>Famille Details</h3>
      <p>Name: {famille.nom}</p>
      <p>code: {famille.code_fam}</p>
      <button onClick={onModify}>Modify Famille</button>
      <button onClick={onDelete}>Delete Famille</button>
    </div>
  );
};

export default SingleFamille;
