import React from 'react';
import { Table } from 'antd';
import { useFetchProfitabilityAnalysis } from '../../hooks/useDashboard';

const ProfitabilityAnalysis = () => {
  const { data, loading, error } = useFetchProfitabilityAnalysis();
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
    {
      title: 'Net Profit',
      dataIndex: 'netProfit',
      key: 'netProfit',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="item" />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ProfitabilityAnalysis;
