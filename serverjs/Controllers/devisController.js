const devisService = require('../Services/devisService');

exports.createDevisController = async (req, res) => {
  try {
    const devis = await devisService.createDevis(req.body);
    res.status(201).json(devis);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

exports.getDevisByIdController = async (req, res) => {
  try {
    const devis = await devisService.getDevisById(req.params.id);
    if (devis) {
      res.json(devis);
    } else {
      
      res.status(404).json({ message: 'Devis not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

exports.updateDevisController = async (req, res) => {
  try {
    const updatedDevis = await devisService.updateDevis(req.params.id, req.body);
    res.json(updatedDevis);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDevisController = async (req, res) => {
  try {
    await devisService.deleteDevis(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateDevisController = async (req, res) => {
  try {
    const bonliv = await devisService.validateDevis(req.params.refDevis);
    res.json(bonliv);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDevisController = async (req, res) => {
  try {
    const allDevis = await devisService.getAllDevis();
    res.json(allDevis);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

exports.getDevisByClientController = async (req, res) => {
  try {
    const devis = await devisService.getDevisByClient(req.params.clientId);
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDevisByCommercialController = async (req, res) => {
  try {
    const devis = await devisService.getDevisByCommercial(req.params.commercialId);
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addItemToDevisController = async (req, res) => {
  try {
    const item = await devisService.addItemToDevis(req.params.refDevis, req.body);
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItemFromDevisController = async (req, res) => {
  try {
    await devisService.deleteItemFromDevis(req.params.refDevis, req.params.codeArt);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItemInDevisController = async (req, res) => {
  try {
   
    const updatedItem = await devisService.updateItemInDevis(req.params.refDevis, req.params.codeArt, req.body);
    res.json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getItemsInDevisController = async (req, res) => {
  try {
    const items = await devisService.getItemsInDevis(req.params.refDevis);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
