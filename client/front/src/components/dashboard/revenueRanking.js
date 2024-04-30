import React, { useMemo } from 'react';
import { Table } from 'antd';
import { useFetchRevenueRanking } from '../../hooks/useDashboard';

const RevenueRanking = () => {
  const { data, loading, error } = useFetchRevenueRanking();
  
  // Aggregate revenue per product and count units sold
  const aggregatedData = useMemo(() => {
    const revenueMap = new Map();

    data.forEach(({ code_art, factureDetails, nom }) => {
        factureDetails.forEach(detail => {
            // Check if the product code already exists in the map
            const existing = revenueMap.get(code_art) || {
                code_art,
                nom: detail.nom || nom, // Use the product name from the detail if available, otherwise from the parent
                revenue: 0,
                unitsSold: 0
            };
            console.log(detail);
            // Add the total from this detail to the existing revenue
            existing.revenue += detail.TotalTTC;
    
            // Add the quantity from this detail to the existing units sold
            existing.unitsSold += detail.QTE;  // Use the quantity field 'QTE' to accumulate total units sold
    
            // Set or update the map entry for this product code
            revenueMap.set(code_art, existing);
        });
    });
    

    return Array.from(revenueMap.values());
  }, [data]);

  const columns = [
    {
      title: 'Article Code',
      dataIndex: 'code_art',
      key: 'code_art',
    },
    {
      title: 'Article Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => `€${value.toFixed(2)}`, // Format currency
    },
    {
      title: 'Units Sold',
      dataIndex: 'unitsSold',
      key: 'unitsSold',
    },
  ];

  return (
    <div>
      <Table 
        dataSource={aggregatedData} 
        columns={columns} 
        loading={loading} 
        rowKey="code_art"  // Ensure rowKey is unique, using code_art for uniqueness
      />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default RevenueRanking;
