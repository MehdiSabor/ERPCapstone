const express = require('express');
const cors = require('cors'); // Import the cors package
const clientRoutes = require('./Routes/clientRoutes'); 
const fournisseurRoutes = require('./Routes/fourRoutes');  
const comercialRoutes = require('./Routes/comercialRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const devisRoutes = require('./Routes/DevisRoutes');
const blRoutes = require('./Routes/blRoutes');
const faRoutes = require('./Routes/faRoutes');
const avRoutes = require('./Routes/avRoutes');
const regRoutes = require('./Routes/regRoutes');
const famRoutes =require('./Routes/familleRoutes');
const accountRoutes = require('./Routes/accountRoutes');
const dashboardRoutes = require('./Routes/dbRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5001' 
};

app.use(cors(corsOptions)); 





app.use(express.json()); 
app.use('/account', accountRoutes);
app.use('/dashboard',dashboardRoutes);
app.use(authMiddleware); 
app.use('/client', clientRoutes); 
app.use('/four', fournisseurRoutes);
app.use('/com', comercialRoutes);
app.use('/article', articleRoutes);
app.use('/devis', devisRoutes);
app.use('/bl', blRoutes);
app.use('/fa',faRoutes);
app.use('/av',avRoutes);
app.use('/reglement',regRoutes);
app.use('/fam', famRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
