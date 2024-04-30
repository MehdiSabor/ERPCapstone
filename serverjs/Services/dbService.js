const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getMonthlyOrderVolume() {
    // Fetch data grouped by month
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

    // Initialize an array of 12 elements set to zero
    const monthlyTotals = Array.from({ length: 12 }, () => 0);

    // Populate the array with actual data
    ordersByMonth.forEach(order => {
        const monthIndex = order.DATE_BL.getMonth(); // getMonth() returns month index (0 = January, 11 = December)
        monthlyTotals[monthIndex] = order._count;
    });

    return monthlyTotals;
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
            TotalTTC: true,
            QTE: true
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
    // Aggregate total revenue from all sold items
    const revenue = await prisma.detailFacture.aggregate({
        _sum: {
            TotalTTC: true  // Total revenue including tax
        }
    });

    // Fetch details for cost calculation
    const detailFactures = await prisma.detailFacture.findMany({
        select: {
            PA_HT: true,  // Purchase price
            QTE: true,
            TVA: true    // Quantity
        }
    });

    // Calculate total cost by summing up PA_HT * QTE for each detailFacture
    const totalCost = detailFactures.reduce((sum, detail) => sum + ((detail.PA_HT * detail.QTE)+(detail.PA_HT * detail.TVA/100)), 0);

    // Fetch all client IDs
const allClients = await prisma.facture.findMany({
    select: {
      CODE_CLT: true
    }
  });
  const clientsCount = new Set(allClients.map(client => client.CODE_CLT)).size;
  
  // Fetch all article IDs
  const allArticles = await prisma.detailFacture.findMany({
    select: {
      CODE_ART: true
    }
  });
  const articlesCount = new Set(allArticles.map(article => article.CODE_ART)).size;
  

    // Net revenue calculation
    const netRevenue = revenue._sum.TotalTTC - totalCost;

    return {
        netRevenue,
        clientsCount: clientsCount,
        articlesCount: articlesCount
    };
}
async function getArticleSalesData(code_art) {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

    // First, fetch all invoices from the last 12 months
    const invoices = await prisma.facture.findMany({
        where: {
            DATE_FAC: {
                gte: twelveMonthsAgo
            }
        },
        include: {
            detailFactures: {
                where: {
                    CODE_ART: code_art
                },
                select: {
                    PA_HT: true,
                    PV_HT: true,
                    QTE: true,
                    facture: {
                        select: {
                            DATE_FAC: true
                        }
                    }
                }
            }
        }
    });

    // Prepare the data for aggregation
    let salesData = [];
    invoices.forEach(invoice => {
        invoice.detailFactures.forEach(detail => {
            salesData.push({
                DATE_FAC: detail.facture.DATE_FAC,
                PA_HT: detail.PA_HT,
                PV_HT: detail.PV_HT,
                QTE: detail.QTE
            });
        });
    });

    // Group by month and aggregate data
    const groupedData = salesData.reduce((acc, data) => {
        const month = data.DATE_FAC.getMonth();
        const year = data.DATE_FAC.getFullYear();
        const monthYearKey = `${year}-${month}`;

        if (!acc[monthYearKey]) {
            acc[monthYearKey] = {
                month: month + 1,
                year: year,
                PA_HT: data.PA_HT,
                PV_HT: data.PV_HT,
                totalSold: 0
            };
        }

        acc[monthYearKey].totalSold += data.QTE;
        return acc;
    }, {});

    // Convert the grouped object back to array
    return Object.values(groupedData).sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month));
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
    getClientAccountDetails,
    getArticleSalesData
  }
  