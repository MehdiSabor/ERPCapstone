import React from 'react';
import { Table } from 'antd';
import { useFetchClientAccountDetails } from '../../hooks/useDashboard';

const ClientAccountDetails = () => {
  const { data, loading, error } = useFetchClientAccountDetails();
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Transaction History',
      dataIndex: 'history',
      key: 'history',
    },
    {
      title: 'Outstanding Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Payment Behavior',
      dataIndex: 'behavior',
      key: 'behavior',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="name" />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ClientAccountDetails;
