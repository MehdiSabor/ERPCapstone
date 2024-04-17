const avoirService = require('../services/avoirService');

exports.createAvoirController = async (req, res) => {
  try {
    const avoir = await avoirService.createAvoir(req.body);
    res.status(201).json(avoir);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvoirByIdController = async (req, res) => {
  try {
    const avoir = await avoirService.getAvoirById(req.params.id);
    if (avoir) {
      res.json(avoir);
    } else {
      res.status(404).json({ message: 'Avoir not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAvoirController = async (req, res) => {
  try {
    const updatedAvoir = await avoirService.updateAvoir(req.params.id, req.body);
    res.json(updatedAvoir);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAvoirController = async (req, res) => {
  try {
    await avoirService.deleteAvoir(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateAvoirController = async (req, res) => {
  try {
    const result = await avoirService.validateAvoir(req.params.refAvoir);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAvoirsController = async (req, res) => {
  try {
    const allAvoirs = await avoirService.getAllAvoirs();
    res.json(allAvoirs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
