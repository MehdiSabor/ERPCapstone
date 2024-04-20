import React, { useEffect, useCallback } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchReglementById } from '../../hooks/regHooks';
import DeleteReglementButton from './DeleteRegButton';
import UnifiedFactureAvoirList from './UnifiedFactureAvoirsList';
import ReglementDetailsList from './RegDetailsList';

const SingleReglement = ({ reglementId, onChangeView }) => {
  const { reglement, loading, error } = useFetchReglementById(reglementId);
  const { setSidebarButtons } = useSidebar();

  const stableOnChangeView = useCallback(onChangeView, []);

  useEffect(() => {
    const reglementButtons = [
      <button key="modify" onClick={() => stableOnChangeView('modify', reglementId)}>Modify Reglement</button>,
      <button key="delete" onClick={() => stableOnChangeView('delete', reglementId)}>Delete Reglement</button>,
    ];

    // Simply setting the buttons without trying to slice and preserve old state
    setSidebarButtons(reglementButtons);

    // Clean up to reset sidebar when this component unmounts
    return () => setSidebarButtons([]);
  }, [setSidebarButtons, stableOnChangeView, reglementId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reglement) return <p>No Reglement found</p>;

  return (
    <div>
      <h3>Reglement Details</h3>
      <p>Client: {reglement.CLIENT}</p>
      <p>Amount: {reglement.MNT_REGLER}</p>
      <UnifiedFactureAvoirList reglementId={reglementId} />
      <ReglementDetailsList reglementId={reglementId} />
    </div>
  );
};

export default SingleReglement;
