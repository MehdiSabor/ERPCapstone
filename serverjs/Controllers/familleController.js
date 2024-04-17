const familleService = require('../services/familleService');

exports.createFamilleController = async (req, res) => {
  try {
    const famille = await familleService.createFamille(req.body);
    res.status(201).json(famille);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFamilleByIdController = async (req, res) => {
  try {
    const famille = await familleService.getFamilleById(parseInt(req.params.id));
    if (famille) {
      res.json(famille);
    } else {
      res.status(404).json({ message: 'Famille not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFamillesController = async (req, res) => {
  try {
    const familles = await familleService.getAllFamilles();
    res.json(familles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFamilleController = async (req, res) => {
  try {
    const famille = await familleService.updateFamille(parseInt(req.params.id), req.body);
    res.json(famille);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFamilleController = async (req, res) => {
  try {
    await familleService.deleteFamille(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
