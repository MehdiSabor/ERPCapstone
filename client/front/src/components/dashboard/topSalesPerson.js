import React from 'react';
import { Table } from 'antd';
import { useFetchTopSalespersonsByQuotes } from '../../hooks/useDashboard';

const TopSalespersonsByQuotes = () => {
  const { data, loading, error } = useFetchTopSalespersonsByQuotes();
  const columns = [
    {
      title: 'Salesperson',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quotes',
      dataIndex: 'quotes',
      key: 'quotes',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="name" />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TopSalespersonsByQuotes;
