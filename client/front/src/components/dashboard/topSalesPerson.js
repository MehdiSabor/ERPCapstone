import React from 'react';
import { Table } from 'antd';
import { useFetchTopSalespersonsByQuotes } from '../../hooks/useDashboard'; // Adjust the path as necessary

const TopSalespersonsByQuotes = () => {
  const { data, loading, error } = useFetchTopSalespersonsByQuotes();
  console.log(data);
  // Define table columns
  const columns = [
    {
      title: 'Salesperson',
      dataIndex: 'nom',  // Assuming 'nom' is the field for the salesperson's name
      key: 'name',
    },
    {
      title: 'Quotes',
      dataIndex: 'Devis',
      key: 'quotes',
      // Use a custom render function to display the length of the quotes array
      render: (Devis) => Devis.length, // Render the length of the Devis array
    },
  ];

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          rowKey="nom"  // Adjust according to the unique identifier key for each salesperson
        />
      )}
    </div>
  );
};

export default TopSalespersonsByQuotes;
