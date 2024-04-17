const avoirService = require('../services/avService');

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



exports.getAvoirsByClientController = async (req, res) => {
  try {
    const avoirs = await avoirService.getAvoirsByClient(req.params.clientId);
    res.json(avoirs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addItemToAvoirController = async (req, res) => {
  try {
    const item = await avoirService.addItemToAvoir(req.params.refAvoir, req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItemFromAvoirController = async (req, res) => {
  try {
    await avoirService.deleteItemFromAvoir(req.params.refAvoir, req.params.codeArt);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItemInAvoirController = async (req, res) => {
  try {
    const updatedItem = await avoirService.updateItemInAvoir(req.params.refAvoir, req.params.codeArt, req.body);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemsInAvoirController = async (req, res) => {
  try {
    const items = await avoirService.getItemsInAvoir(req.params.refAvoir);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
