import React, { useMemo } from 'react';
import { useFetchReglementById,useDeleteReglementDetail } from '../../hooks/regHooks';


const ReglementDetailsList = ({ reglementId }) => {
  const { reglement, loading, error } = useFetchReglementById(reglementId);
  const { handleDelete, isDeleting, error: deleteError } = useDeleteReglementDetail();

  // Calculate the sum of all registered amounts
  const totalRegistered = useMemo(() => reglement?.reglementdetails?.reduce((total, detail) => total + detail.MNT_REGLER, 0) || 0, [reglement]);

  if (loading || isDeleting) return <p>Loading...</p>;
  if (error || deleteError) return <p>Error: {error || deleteError}</p>;
  if (!reglement || !reglement.reglementdetails.length) {
    return <p>No details found for this reglement.</p>;
  }

  const remainingAmount = reglement.MNT_REGLER - totalRegistered;

 // Inside ReglementDetailsList component, modify the onRemove function
const onRemove = async (detail) => {
    const success = await handleDelete(reglementId, detail.REF_AV_FAC);
    if (success) {
        alert('Detail removed successfully!');
        window.location.reload(); // Optionally refresh the component/data
    } else {
        alert('Failed to remove detail.');
    }
};


  return (
    <div>
      <h3>Reglement Details</h3>
      <p>Total Amount to Regulate: {reglement.MNT_REGLER}€</p>
      <p>Total Registered: {totalRegistered}€</p>
      <p>Remaining Amount: {remainingAmount}€</p>
      <ul>
        {reglement.reglementdetails.map(detail => (
          <li key={detail.id}>
            {detail.REF_AV_FAC} - Total Amount: {detail.MNT_ORIGINAL}€, Amount Registered: {detail.MNT_REGLER}€
            <button onClick={() => onRemove(detail)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReglementDetailsList;
