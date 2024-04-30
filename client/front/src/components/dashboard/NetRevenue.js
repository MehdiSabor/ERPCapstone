import React from 'react';
import { useFetchNetRevenue } from '../../hooks/useDashboard';

const NetRevenue = () => {
  const { data, loading, error } = useFetchNetRevenue();

  return (
    <div>
      {loading ? <p>Loading...</p> : <h2>Net Revenue: ${data}</h2>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NetRevenue;
