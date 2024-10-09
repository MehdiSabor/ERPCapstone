// controllers/faController.js
const factureService = require('../Services/faService');

exports.getFactureById = async (req, res) => {
  try {
    const facture = await factureService.getFactureById(req.params.id);
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFactures = async (req, res) => {
  try {
    const factures = await factureService.getAllFactures();
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateFacture = async (req, res) => {
  try {
    const facture = await factureService.validateFacture(req.params.id);
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDetailFacturesByFacture = async (req, res) => {
  try {
    const details = await factureService.getAllDetailFacturesByFacture(req.params.id);
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.cancelFacture = async (req, res) => {
  try {
      const refFAC = req.params.id;
      const result = await factureService.cancelFactureAndCreateAvoirs(refFAC);
      res.json({ message: 'Facture cancelled and avoirs created', result });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
