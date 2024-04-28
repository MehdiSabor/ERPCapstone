import React, { useMemo } from 'react';
import { Card, Table, Button, Spin, Alert,message } from 'antd';

import { useFetchReglementById, useDeleteReglementDetail } from '../../hooks/regHooks';

const ReglementDetailsList = ({ reglementId,reglement,handleRefetch , loading, error}) => {
  const { handleDelete, isDeleting, error: deleteError } = useDeleteReglementDetail();

  
  const onRemove = async (detail) => {
    const success = await handleDelete(reglementId, detail.REF_AV_FAC);
    if (success) {
      message.success('Detail removed successfully!');
      handleRefetch();  // Refresh unified list after deletion
    } else {
      message.error('Failed to remove detail.');
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
       <Table dataSource={reglement.reglementdetails} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ReglementDetailsList;
