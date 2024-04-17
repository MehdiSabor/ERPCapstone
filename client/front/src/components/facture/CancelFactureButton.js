import React from 'react';
import { useCancelFacture } from '../../hooks/factureHooks';

const CancelFactureButton = ({ refFAC }) => {
    const { handleCancel, error, isCancelled } = useCancelFacture();

    const onClickCancel = () => {
        handleCancel(refFAC);
    };

    return (
        <div>
            <button onClick={onClickCancel}>Cancel Facture</button>
            {isCancelled && <p>Facture was cancelled successfully!</p>}
            {error && <p>Error cancelling facture: {error}</p>}
        </div>
    );
};

export default CancelFactureButton;
