import { useState, useEffect } from 'react';
import {
  fetchMonthlyOrderVolume,
  fetchTopSalespersonsByQuotes,
  fetchRevenueRanking,
  fetchProfitabilityAnalysis,
  fetchLowStockLevels,
  fetchNetRevenue,
  fetchClientAccountDetails,
  fetchArticleSalesData
} from '../models/dashboardAPI';

// Hook for fetching monthly order volumes
export const useFetchMonthlyOrderVolume = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchMonthlyOrderVolume()
      .then(response => {
        console.log(response);
        const formattedData = response.data.map((total, index) => ({
          month: `${index + 1}`,  // Convert month index to human-readable month (1 = January, etc.)
          totalOrders: total
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

// Repeated for each data type, example for Top Salespersons by Quotes
export const useFetchTopSalespersonsByQuotes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchTopSalespersonsByQuotes()
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

// Add similar hooks for Revenue Ranking, Profitability Analysis, Low Stock Levels, Net Revenue, and Client Account Details
// Hook for fetching revenue rankings
export const useFetchRevenueRanking = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      fetchRevenueRanking()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { data, loading, error };
  };
  
  // Hook for fetching profitability analysis
  export const useFetchProfitabilityAnalysis = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      fetchProfitabilityAnalysis()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { data, loading, error };
  };
  
  // Hook for fetching low stock levels
  export const useFetchLowStockLevels = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      fetchLowStockLevels()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { data, loading, error };
  };
  
  // Hook for fetching net revenue
  export const useFetchNetRevenue = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      fetchNetRevenue()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { data, loading, error };
  };
  
  // Hook for fetching client account details
  export const useFetchClientAccountDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      fetchClientAccountDetails()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    return { data, loading, error };
  };
  
  export const useArticleSalesData = (code_art) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (code_art) {
        setLoading(true);
        fetchArticleSalesData(code_art)
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [code_art]);
  
    return { data, loading, error };
  };