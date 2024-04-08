const blService = require('../Services/blService');

exports.createBonLiv = async (req, res) => {
  try {
    const bonliv = await blService.createBonLiv(req.body);
    res.status(201).json(bonliv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBonLivById = async (req, res) => {
  try {
    const id = req.params.id;
    const bonliv = await blService.getBonLivById(id);
    if (bonliv) res.json(bonliv);
    else res.status(404).json({ message: 'BonLiv not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBonLiv = async (req, res) => {
  try {
    const id = req.params.id;
    const bonliv = await blService.updateBonLiv(id, req.body);
    res.json(bonliv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBonLiv = async (req, res) => {
  try {
    const id = req.params.id;
    await blService.deleteBonLiv(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBonLivs = async (req, res) => {
  try {
    const bonlivs = await blService.getAllBonLivs();
    res.json(bonlivs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.validateBonLiv = async (req, res) => {
  try {
    const id = req.params.id;
    const bonliv = await blService.validateBonLiv(id);
    res.json(bonliv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllDetailBonlivsByBonliv = async (req, res) => {
  try {
    const refBL = req.params.refBL;
    const details = await blService.getAllDetailBonlivsByBonliv(refBL);
    res.json(details);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDetailBonlivById = async (req, res) => {
  try {
    const { refBL, codeArt } = req.params;
    const detail = await blService.getDetailBonlivById(refBL, codeArt);
    if (detail) res.json(detail);
    else res.status(404).json({ message: 'DetailBonliv not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDetailBonliv = async (req, res) => {
  try {
    const { refBL, codeArt } = req.params;
    const detail = await blService.updateDetailBonliv(refBL, codeArt, req.body);
    res.json(detail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDetailBonliv = async (req, res) => {
  try {
    const { refBL, codeArt } = req.params;
    await blService.deleteDetailBonliv(refBL, codeArt);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
