const dbServices = require('../Services/dbService');

// Order Tracking Controllers
exports.getMonthlyOrderVolume = async (req, res) => {
  try {
    const orderVolumes = await dbServices.getMonthlyOrderVolume();
    res.json(orderVolumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sales Performance Controllers
exports.getTopSalespersonsByQuotes = async (req, res) => {
  try {
    const salespersons = await dbServices.getTopSalespersonsByQuotes();
    res.json(salespersons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRevenueRanking = async (req, res) => {
  try {
    const rankings = await dbServices.getRevenueRanking();
    res.json(rankings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfitabilityAnalysis = async (req, res) => {
  try {
    const profitability = await dbServices.getProfitabilityAnalysis();
    res.json(profitability);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Inventory Insights Controllers
exports.getLowStockLevels = async (req, res) => {
  try {
    const stockLevels = await dbServices.getLowStockLevels();
    res.json(stockLevels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Financial Metrics Controllers
exports.getNetRevenue = async (req, res) => {
  try {
    const netRevenue = await dbServices.getNetRevenue();
    res.json(netRevenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Customer Insights Controllers
exports.getClientAccountDetails = async (req, res) => {
  try {
    const accounts = await dbServices.getClientAccountDetails();
    res.json(accounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
