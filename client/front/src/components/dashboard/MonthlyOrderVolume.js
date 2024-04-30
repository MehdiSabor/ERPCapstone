import React, { useState } from 'react';
import { Line, Column } from '@ant-design/charts'; // Import Column for bar chart
import { Card, Switch } from 'antd'; // Import Card and Switch components
import { useFetchMonthlyOrderVolume } from '../../hooks/useDashboard'; // Adjust the path as necessary

const MonthlyOrderVolume = () => {
  const { data, loading, error } = useFetchMonthlyOrderVolume();
  const [isBarChart, setIsBarChart] = useState(false); // State to toggle chart type

  const config = {
    data,
    xField: 'month',
    yField: 'totalOrders',
    // Conditional styling based on chart type
    ...(isBarChart ? {} : {
      point: {
        size: 5,
        shape: 'diamond',
      },
    }),
  };

  return (
    <Card 
      title="Monthly Order Volume" 
      extra={<Switch checkedChildren="Bar" unCheckedChildren="Line" checked={isBarChart} onChange={() => setIsBarChart(!isBarChart)} />}
      style={{ width: '100%' }}
    >
      {loading ? <p>Loading...</p> : (isBarChart ? <Column {...config} /> : <Line {...config} />)}
      {error && <p>Error: {error}</p>}
    </Card>
  );
};

export default MonthlyOrderVolume;
