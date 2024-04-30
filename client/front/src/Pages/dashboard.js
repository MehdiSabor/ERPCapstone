import React from 'react';
import MonthlyOrderVolume from '../components/dashboard/MonthlyOrderVolume';
import TopSalespersonsByQuotes from '../components/dashboard/topSalesPerson';
import RevenueRanking from '../components/dashboard/revenueRanking';
import ProfitabilityAnalysis from '../components/dashboard/ProfitabilityAnalysis';
import LowStockLevels from '../components/dashboard/LowStock';
import NetRevenue from '../components/dashboard/NetRevenue';
import ClientAccountDetails from '../components/dashboard/clientaccount';

const DashboardPage = () => {
  return (
    <div>
      <MonthlyOrderVolume />
      <TopSalespersonsByQuotes />
      <RevenueRanking />
      <ProfitabilityAnalysis />
      <LowStockLevels />
      <NetRevenue />
      <ClientAccountDetails />
    </div>
  );
};

export default DashboardPage;
