import React from 'react';
import { Table } from 'antd';
import { useFetchLowStockLevels } from '../../hooks/useDashboard';

const LowStockLevels = () => {
  const { data, loading, error } = useFetchLowStockLevels();
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Current Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="item" />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LowStockLevels;
