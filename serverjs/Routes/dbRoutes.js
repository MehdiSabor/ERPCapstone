const express = require('express');
const router = express.Router();
const dbController = require('../Controllers/dbController');

router.get('/orders/monthly', dbController.getMonthlyOrderVolume);

router.get('/sales/top-salespersons', dbController.getTopSalespersonsByQuotes);
router.get('/sales/revenue-ranking', dbController.getRevenueRanking);
router.get('/sales/profitability', dbController.getProfitabilityAnalysis);

router.get('/inventory/low-stock', dbController.getLowStockLevels);

router.get('/financial/net-revenue', dbController.getNetRevenue);

router.get('/customers/accounts', dbController.getClientAccountDetails);
router.get('/article-sales/:code_art', dbController.fetchArticleSalesData);

module.exports = router;
