import React, { useEffect } from 'react';
import { useFetchFactureById, useValidateFacture, useFetchDetailFacturesByFacture } from '../../hooks/factureHooks';
import CancelFactureButton from './CancelFactureButton'; // Make sure the path is correct

const SingleFacture = ({ factureId }) => {
  const { facture, loading: loadingFacture, error: errorFacture } = useFetchFactureById(factureId);
  const { details, loading: loadingDetails, error: errorDetails } = useFetchDetailFacturesByFacture(factureId);
  const { validate, isValidated, error: validationError } = useValidateFacture();

  // Function to handle the click on the Validate button
  const handleValidateClick = async () => {
    try {
      
      await validate(factureId);
      alert('Facture has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate facture: ${error}`);
    }
  };

  useEffect(() => {
    if (factureId) {
      // Additional logic if needed when factureId changes
    }
  }, [factureId]);

  if (loadingFacture || loadingDetails) return <p>Loading...</p>;
  if (errorFacture) return <p>Error fetching facture: {errorFacture}</p>;
  if (errorDetails) return <p>Error fetching facture details: {errorDetails}</p>;
  if (!facture) return <p>No facture found</p>;

  return (
    <div>
      <h3>Facture Details</h3>
      <div>
        <strong>Reference:</strong> {facture.REF_FAC}<br/>
        <strong>Date:</strong> {new Date(facture.DATE_FAC).toLocaleDateString()}<br/>
        <strong>Client:</strong> {facture.CLIENT}<br/>
        <strong>Total HT:</strong> {facture.MNT_HT.toFixed(2)}€<br/>
        <strong>Total TTC:</strong> {facture.MNT_TTC.toFixed(2)}€<br/>
        <strong>Status:</strong> {facture.VALIDER ? 'Validated' : 'Not Validated'}<br/>
        {!isValidated && <button onClick={handleValidateClick}>Validate Facture</button>}
        {facture.VALIDER && <CancelFactureButton refFAC={factureId} />}
        {validationError && <p>Error validating facture: {validationError}</p>}
      </div>
      <h4>Items in Facture</h4>
      {details.length > 0 ? (
        <ul>
          {details.map(detail => (
            <li key={detail.CODE_ART}>
              {detail.ARTICLE} - Quantity: {detail.QTE} - Price: {detail.PV_TTC.toFixed(2)}€
              {/* You can add more detail attributes here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this facture.</p>
      )}
    </div>
  );
};

export default SingleFacture;
