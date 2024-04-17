import React from 'react';
import { useFetchReglementById } from '../../hooks/regHooks';
import ModifyReglementForm from './ModifyRegForm';
import DeleteReglementButton from './DeleteRegButton';
import AddUnifiedToReglement from './AddUnifiedToReg';
import ReglementDetailsList from './RegDetailsList';
import UnifiedFactureAvoirList from './UnifiedFactureAvoirsList';


const SingleReglement = ({ reglementId, onReglementUpdated, onReglementDeleted }) => {
  const { reglement, loading, error } = useFetchReglementById(reglementId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reglement) return <p>No Reglement found</p>;

  return (
    <div>
      <h3>Reglement Details</h3>
      <p>Client: {reglement.CLIENT}</p>
      <p>Amount: {reglement.MNT_REGLER}</p>
      <ModifyReglementForm reglementId={reglementId} onUpdated={onReglementUpdated} />
      <DeleteReglementButton reglementId={reglementId} onDeleted={onReglementDeleted} />
     <UnifiedFactureAvoirList reglementId={reglementId} />
     
      <ReglementDetailsList reglementId={reglementId} />
    </div>
  );
};

export default SingleReglement;
