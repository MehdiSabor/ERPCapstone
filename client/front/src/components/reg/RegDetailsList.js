import React, { useMemo } from 'react';
import { Card, Table, Button, Spin, Alert } from 'antd';

import { useFetchReglementById, useDeleteReglementDetail } from '../../hooks/regHooks';

const ReglementDetailsList = ({ reglementId }) => {
  const { reglement, loading, error } = useFetchReglementById(reglementId);
  const { handleDelete, isDeleting, error: deleteError } = useDeleteReglementDetail();

  // Calculate the sum of all registered amounts
  const totalRegistered = useMemo(() => reglement?.reglementdetails?.reduce((total, detail) => total + detail.MNT_REGLER, 0) || 0, [reglement]);
  const remainingAmount = reglement?.MNT_REGLER - totalRegistered;

  const onRemove = async (detail) => {
    const success = await handleDelete(reglementId, detail.REF_AV_FAC);
    if (success) {
      alert('Detail removed successfully!');
      window.location.reload(); // Optionally refresh the component/data
    } else {
      alert('Failed to remove detail.');
    }
  };

  const columns = [
    {
      title: 'Facture ID',
      dataIndex: 'REF_AV_FAC',
      key: 'REF_AV_FAC'
    },
    {
      title: 'Total Amount',
      dataIndex: 'MNT_ORIGINAL',
      key: 'MNT_ORIGINAL',
      render: (text) => `€${text.toFixed(2)}`
    },
    {
      title: 'Amount Registered',
      dataIndex: 'MNT_REGLER',
      key: 'MNT_REGLER',
      render: (text) => `€${text.toFixed(2)}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => onRemove(record)} type="danger">
          Remove
        </Button>
      )
    }
  ];

  if (loading || isDeleting) return <Spin spinning={true} tip="Loading..."><div style={{ minHeight: '200px' }} /></Spin>;
  if (error || deleteError) return <Alert message="Error" description={error || deleteError} type="error" showIcon />;
  if (!reglement || !reglement.reglementdetails.length) return <Alert message="No details found for this reglement" type="info" showIcon />;

  return (
    <Card title="Reglement Details" bordered={false}>
      <p>Total Amount to Regulate: €{reglement.MNT_REGLER.toFixed(2)}</p>
      <p>Total Registered: €{totalRegistered.toFixed(2)}</p>
      <p>Remaining Amount: €{remainingAmount.toFixed(2)}</p>
      <Table dataSource={reglement.reglementdetails} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ReglementDetailsList;
