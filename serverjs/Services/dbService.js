const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getMonthlyOrderVolume() {
    const ordersByMonth = await prisma.bonliv.groupBy({
      by: ['DATE_BL'],
      _count: true,
      where: {
        DATE_BL: {
          gte: new Date(new Date().getFullYear(), 0, 1),  // from the start of the current year
          lt: new Date(new Date().getFullYear() + 1, 0, 1)  // until the end of the current year
        }
      },
      orderBy: {
        DATE_BL: 'asc'
      }
    });
    return ordersByMonth.map(month => ({
      month: month.DATE_BL.getMonth() + 1,
      totalOrders: month._count
    }));
  }

  async function getTopSalespersonsByQuotes() {
    return await prisma.comercial.findMany({
      where: {
        Devis: {
          some: {}
        }
      },
      include: {
        Devis: {
          select: {
            _count: true
          }
        }
      },
      orderBy: {
        Devis: {
          _count: 'desc'
        }
      }
    });
  }

  async function getRevenueRanking() {
    return await prisma.article.findMany({
      include: {
        factureDetails: {
          select: {
            TotalTTC: true
          }
        }
      }
    });
  }

  async function getProfitabilityAnalysis() {
    return await prisma.article.findMany({
      include: {
        factureDetails: {
          select: {
            TotalTTC: true,
            PA_HT: true
          }
        }
      }
    });
  }

  async function getLowStockLevels() {
    return await prisma.article.findMany({
      where: {
        qte_stk: {
          lte: { STK_MIN: true }
        }
      }
    });
  }

  async function getNetRevenue() {
    const revenue = await prisma.factureDetails.aggregate({
      _sum: {
        TotalTTC: true
      }
    });
    const cost = await prisma.factureDetails.aggregate({
      _sum: {
        PA_HT: true
      }
    });
    return revenue._sum.TotalTTC - cost._sum.PA_HT;
  }

  async function getClientAccountDetails() {
    return await prisma.client.findMany({
      include: {
        reglements: true,
        facture: true
      }
    });
  }

  module.exports = {
    getMonthlyOrderVolume,
    getTopSalespersonsByQuotes,
    getRevenueRanking,
    getProfitabilityAnalysis,
    getLowStockLevels,
    getNetRevenue,
    getClientAccountDetails
  }
  