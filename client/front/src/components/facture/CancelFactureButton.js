import React from 'react';
import {Button} from 'antd';
import { useCancelFacture } from '../../hooks/factureHooks';

const CancelFactureButton = ({ refFAC,onCancel }) => {
    const { handleCancel, error, isCancelled } = useCancelFacture();

    const onClickCancel = () => {
        handleCancel(refFAC);
onCancel();
    };

    return (
        <div>
            <Button type="primary" onClick={onClickCancel}>Cancel Facture</Button>
            
            {error && <alert>Error cancelling facture: {error}</alert>}
        </div>
    );
};

export default CancelFactureButton;
