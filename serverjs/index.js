const express = require('express');
const cors = require('cors'); // Import the cors package
const clientRoutes = require('./Routes/clientRoutes'); 
const fournisseurRoutes = require('./Routes/fourRoutes');  
const comercialRoutes = require('./Routes/comercialRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const devisRoutes = require('./Routes/DevisRoutes');
const blRoutes = require('./Routes/blRoutes');
const faRoutes = require('./Routes/faRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001' 
};

app.use(cors(corsOptions)); 


app.use(express.json()); 
app.use('/client', clientRoutes); 
app.use('/four', fournisseurRoutes);
app.use('/com', comercialRoutes);
app.use('/article', articleRoutes);
app.use('/devis', devisRoutes);
app.use('/bl', blRoutes);
app.use('/fa',faRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
