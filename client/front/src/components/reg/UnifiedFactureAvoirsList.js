import React, { useState } from 'react';
import { Table, Button, Spin, Alert, Tag,message } from 'antd';

import { useFetchAllUnifiedFactureAvoir, useAddDetailReglement } from '../../hooks/regHooks';

const UnifiedFactureAvoirList = ({ reglementId,handleRefetch }) => {
    const { unifiedRecords, loading, error } = useFetchAllUnifiedFactureAvoir();
    const { handleAddDetail, isLoading, createError } = useAddDetailReglement();
    const [selectedUnified, setSelectedUnified] = useState(null);

    const handleSelect = (record) => {
        setSelectedUnified(record);
    };

    const handleAdd = async () => {
        if (!selectedUnified) {
          alert('No unified facture avoir selected.');
          return;
        }
      
        const regDetailData = {
          REF_REGV: reglementId,
          REF_AV_FAC: selectedUnified.REF_AV_FAC,
          MNT_REGLER: selectedUnified.MNT_TTC - selectedUnified.MNT_REGLER
        };
      
        try {
          await handleAddDetail(regDetailData);
          message.success('Reglement detail added successfully!');
          setSelectedUnified(null); // Reset selection
          handleRefetch();  // Refresh reglement details after adding
        } catch (err) {
          message.error('Failed to add reglement detail: ' + err.message);
        }
      };
      

    const columns = [
        {
            title: 'Facture ID',
            dataIndex: 'REF_AV_FAC',
            key: 'REF_AV_FAC'
        },
        {
            title: 'Remaining Amount',
            dataIndex: 'MNT_REGLER',
            key: 'remaining',
            render: (_, record) => `€${(record.MNT_TTC - record.MNT_REGLER).toFixed(2)}`,
            sorter: (a, b) => (a.MNT_TTC - a.MNT_REGLER) - (b.MNT_TTC - b.MNT_REGLER)
        },
        {
            title: 'Status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Settled', value: 'settled' }
            ],
            onFilter: (value, record) => (value === 'pending' ? (record.MNT_TTC - record.MNT_REGLER) > 0 : (record.MNT_TTC - record.MNT_REGLER) === 0),
            render: (_, record) => {
                const amountLeft = record.MNT_TTC - record.MNT_REGLER;
                return <Tag color={amountLeft > 0 ? 'green' : 'volcano'}>{amountLeft > 0 ? 'Pending' : 'Settled'}</Tag>;
            }
        }
    ];

    if (loading || isLoading) return <Spin spinning={true} tip="Loading..."><div style={{ minHeight: '200px' }} /></Spin>;
    if (error || createError) return <Alert message="Error" description={error || createError} type="error" showIcon />;

    return (
        <div>
            <h3>Select Unified Facture Avoir to Add</h3>
            <Table
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: selectedUnified ? [selectedUnified.REF_AV_FAC] : [],
                    onChange: (_, selectedRows) => handleSelect(selectedRows[0])
                }}
                dataSource={unifiedRecords}
                columns={columns}
                rowKey="REF_AV_FAC"
                pagination={{ pageSize: 5 }}
            />
            <Button onClick={handleAdd} disabled={!selectedUnified || isLoading}>Add Selected to Reglement</Button>
        </div>
    );
};

export default UnifiedFactureAvoirList;
