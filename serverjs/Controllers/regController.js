const regService = require('../services/regService');

// Create a Reglement
exports.createReglementController = async (req, res) => {
  try {
    const reglement = await regService.createReglement(req.body);
    res.status(201).json(reglement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Reglement by ID
exports.getReglementByIdController = async (req, res) => {
  try {
    const reglement = await regService.getReglementById(req.params.id);
    if (reglement) {
      res.json(reglement);
    } else {
      res.status(404).json({ message: 'Reglement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Reglement
exports.updateReglementController = async (req, res) => {
  try {
    const updatedReglement = await regService.updateReglement(req.params.id, req.body);
    res.json(updatedReglement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Reglement
exports.deleteReglementController = async (req, res) => {
  try {
    await regService.deleteReglement(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all Reglements
exports.getAllReglementsController = async (req, res) => {
  try {
    const allReglements = await regService.getAllReglements();
    res.json(allReglements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a batch of Reglement Details
exports.createReglementDetailsBatchController = async (req, res) => {
  try {
    const reglementDetails = await regService.createReglementDetailsBatch(req.body);
    res.status(201).json(reglementDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
