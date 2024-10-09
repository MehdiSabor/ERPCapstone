import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/dashboard'; // Adjust this as necessary

// Order Tracking
export const fetchMonthlyOrderVolume = () => axios.get(`${API_BASE_URL}/orders/monthly`);

// Sales Performance
export const fetchTopSalespersonsByQuotes = () => axios.get(`${API_BASE_URL}/sales/top-salespersons`);
export const fetchRevenueRanking = () => axios.get(`${API_BASE_URL}/sales/revenue-ranking`);
export const fetchProfitabilityAnalysis = () => axios.get(`${API_BASE_URL}/sales/profitability`);

// Inventory Insights
export const fetchLowStockLevels = () => axios.get(`${API_BASE_URL}/inventory/low-stock`);

// Financial Metrics
export const fetchNetRevenue = () => axios.get(`${API_BASE_URL}/financial/net-revenue`);

// Customer Insights
export const fetchClientAccountDetails = () => axios.get(`${API_BASE_URL}/customers/accounts`);


export const fetchArticleSalesData = (code_art) => {
    return axios.get(`${API_BASE_URL}/article-sales/${code_art}`);
  };