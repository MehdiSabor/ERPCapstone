import React from 'react';
import { Line } from '@ant-design/charts';
import { useFetchMonthlyOrderVolume } from '../../hooks/useDashboard';

const MonthlyOrderVolume = () => {
  const { data, loading, error } = useFetchMonthlyOrderVolume();

  const config = {
    data,
    xField: 'month',
    yField: 'totalOrders',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : <Line {...config} />}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MonthlyOrderVolume;
