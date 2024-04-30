import React from 'react';
import { Table } from 'antd';
import { useFetchRevenueRanking } from '../../hooks/useDashboard';

const RevenueRanking = () => {
  const { data, loading, error } = useFetchRevenueRanking();
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="name" />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default RevenueRanking;
