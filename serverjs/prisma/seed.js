const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create multiple Commercials

  await prisma.client.deleteMany();
  await prisma.comercial.deleteMany();
  await prisma.famille.deleteMany();
  await prisma.article.deleteMany();
  await prisma.fournisseur.deleteMany();

  const commercials = await Promise.all([
    prisma.comercial.create({ data: { nom: 'Sofia Boutella', tel: '0670003001', email: 'sofia@electroparts.ma' }}),
    prisma.comercial.create({ data: { nom: 'Karim El Ahmadi', tel: '0670003002', email: 'karim@globalparts.ma' }}),
    prisma.comercial.create({ data: { nom: 'Laila Aziz', tel: '0670003003', email: 'laila@mechanix.ma' }}),
    // Add more if needed
  ]);

 

  // Create multiple Familles
  const familles = await Promise.all([
    prisma.famille.create({ data: { nom: 'Hydraulics' }}),
    prisma.famille.create({ data: { nom: 'Engine Parts' }}),
    prisma.famille.create({ data: { nom: 'Electrical' }}),
    // Add more if needed
  ]);

   // Create multiple Fournisseurs
   const fournisseurs = await Promise.all([
    prisma.fournisseur.create({ data: { code_frs: 'FRS001',compte:'HT', sociale: 'HydroTech Supplies', desc: 'Supplier of industrial hydraulic equipment', pays: 'Morocco', echeance: false, cond_paie: false, bloquer: false }}),
    prisma.fournisseur.create({ data: { code_frs: 'FRS002',compte:'AV', sociale: 'AutoValve Inc.', desc: 'Premium engine parts manufacturer', pays: 'Germany', echeance: false, cond_paie: false, bloquer: false }}),
    prisma.fournisseur.create({ data: { code_frs: 'FRS003',compte:'EW', sociale: 'ElectroWiring Co.', desc: 'Automotive electrical systems specialist', pays: 'China', echeance: true, cond_paie: false, bloquer: true }}),
    // Add more if needed
  ]);

   // Create multiple Clients
   const clients = await Promise.all([
    prisma.client.create({ data: { nom: 'Delta Electronics', compte: 'C00001', tel: '0661002003', adresse: '1234 Elm St', ville: 'Casablanca', note: 'Preferred customer', echeance: 30, mode_paie: 'Cash', REMISE_G: 10.5, bloquer: false, plafond: 50000.0, code_com: commercials[0].code_com, SOLDE: 0 }}),
    prisma.client.create({ data: { nom: 'Global Parts', compte: 'R00001', tel: '0661002004', adresse: '2345 Pine St', ville: 'Rabat', echeance: 45, mode_paie: 'Check', REMISE_G: 12.0, bloquer: true, plafond: 30000.0, code_com: commercials[1].code_com, SOLDE: 0 }}),
    prisma.client.create({ data: { nom: 'Mechanix Inc.', compte: 'M00001', tel: '0661002005', adresse: '3456 Oak St', ville: 'Marrakech', echeance: 60, mode_paie: 'Bank Transfer', REMISE_G: 15.0, bloquer: false, plafond: 75000.0, code_com: commercials[2].code_com, SOLDE: 0 }}),
    // Add more if needed
  ]);
  

  // Create multiple Articles
  const articles = await Promise.all([
    prisma.article.create({ data: { code_art: 'SP001', nom: 'Hydraulic Pump', desc: 'Hydraulic gear pump for industrial applications', photo: 'hydraulic_pump.jpg', PA_HT: 1200.0, TVA: 20.0, PA_TTC: 1440.0, PV_HT: 1500.0, PV_TTC: 1800.0, Code_fam: familles[0].code_fam, STK_MAX: 50, STK_MIN: 5, code_frs: 'FRS001', qte_stk: 30 }}),
    prisma.article.create({ data: { code_art: 'SP002', nom: 'Engine Valve', desc: 'High-performance engine valve', photo: 'engine_valve.jpg', PA_HT: 300.0, TVA: 20.0, PA_TTC: 360.0, PV_HT: 400.0, PV_TTC: 480.0, Code_fam: familles[1].code_fam, STK_MAX: 200, STK_MIN: 20, code_frs: 'FRS002', qte_stk: 150 }}),
    prisma.article.create({ data: { code_art: 'SP003', nom: 'Wiring Harness', desc: 'Electrical wiring harness for automotive', photo: 'wiring_harness.jpg', PA_HT: 450.0, TVA: 20.0, PA_TTC: 540.0, PV_HT: 600.0, PV_TTC: 720.0, Code_fam: familles[2].code_fam, STK_MAX: 100, STK_MIN: 10, code_frs: 'FRS003', qte_stk: 75 }}),
    // Add more if needed
  ]);





 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
