import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchFactureById, useFetchDetailFacturesByFacture, useValidateFacture } from '../../hooks/factureHooks';
import SingleClient from '../client/SingleClient'; // Ensure the correct path
import CancelFactureButton from './CancelFactureButton'; // Ensure the correct path

const SingleFacture = ({ factureId }) => {
  const { facture, loading: loadingFacture, error: errorFacture } = useFetchFactureById(factureId);
  const { details, loading: loadingDetails, error: errorDetails } = useFetchDetailFacturesByFacture(factureId);
  const { validate, isValidated, error: validationError } = useValidateFacture();
  const { setSidebarButtons } = useSidebar();
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    const factureButtons = [
      <Button key="viewClient" type="primary" onClick={() => setShowClientModal(true)}>View Client</Button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 1), // Maintain the first base button
      ...factureButtons
    ]);

    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 1));
  }, [setSidebarButtons, factureId]);

  const handleValidateClick = async () => {
    try {
      await validate(factureId);
      alert('Facture has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate facture: ${error}`);
    }
  };

  if (loadingFacture || loadingDetails) return <p>Loading...</p>;
  if (errorFacture) return <p>Error fetching facture: {errorFacture}</p>;
  if (errorDetails) return <p>Error fetching facture details: {errorDetails}</p>;
  if (validationError) return <p>Error validating facture: {validationError}</p>;
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
        {!isValidated && <Button onClick={handleValidateClick}>Validate Facture</Button>}
        {facture.VALIDER && <CancelFactureButton refFAC={factureId} />}
      </div>
      <h4>Items in Facture</h4>
      {details.length > 0 ? (
        <ul>
          {details.map(detail => (
            <li key={detail.CODE_ART}>
              {detail.ARTICLE} - Quantity: {detail.QTE} - Price: {detail.PV_TTC.toFixed(2)}€
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this facture.</p>
      )}

      {showClientModal && (
        <Modal
          title="Client Details"
          visible={showClientModal}
          onOk={() => setShowClientModal(false)}
          onCancel={() => setShowClientModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowClientModal(false)}>
              Close
            </Button>
          ]}
        >
          <SingleClient clientId={facture.CODE_CLT} />
        </Modal>
      )}
    </div>
  );
};

export default SingleFacture;
