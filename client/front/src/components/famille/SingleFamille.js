import React, { useEffect } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchFamilleById } from '../../hooks/familleHooks';

const SingleFamille = ({ familleId, onChangeView }) => {
  const { famille, loading, error } = useFetchFamilleById(familleId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const familleButtons = [
     
      <button key="delete" onClick={() => onChangeView('delete', familleId)}>Delete Famille</button>
    ];

    setSidebarButtons(familleButtons);

    return () => setSidebarButtons([]);
  }, [setSidebarButtons, onChangeView, familleId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!famille) return <p>No Famille found</p>;

  return (
    <div>
      <h3>Famille Details</h3>
      <p>Name: {famille.nom}</p>
      <p>Code: {famille.code_fam}</p>
    </div>
  );
};

export default SingleFamille;
