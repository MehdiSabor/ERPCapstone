const comercialService = require('../Services/comercialService');

exports.createComercial = async (req, res) => {
  try {
    const comercial = await comercialService.createComercial(req.body);
    res.status(201).json(comercial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComercialById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comercial = await comercialService.getComercialById(id);
    if (comercial) res.json(comercial);
    else res.status(404).json({ message: 'Comercial not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComercial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comercial = await comercialService.updateComercial(id, req.body);
    res.json(comercial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComercial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await comercialService.deleteComercial(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllComerciaux = async (req, res) => {
  try {
    const comerciaux = await comercialService.getAllComerciaux();
    res.json(comerciaux);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
