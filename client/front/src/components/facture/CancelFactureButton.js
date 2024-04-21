import React from 'react';
import {Button} from 'antd';
import { useCancelFacture } from '../../hooks/factureHooks';

const CancelFactureButton = ({ refFAC }) => {
    const { handleCancel, error, isCancelled } = useCancelFacture();

    const onClickCancel = () => {
        handleCancel(refFAC);
    };

    return (
        <div>
            <Button type="primary" onClick={onClickCancel}>Cancel Facture</Button>
            {isCancelled && <alert>Facture was cancelled successfully!</alert>}
            {error && <alert>Error cancelling facture: {error}</alert>}
        </div>
    );
};

export default CancelFactureButton;
