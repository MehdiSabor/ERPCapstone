const fournisseurService = require('../services/fourService');

exports.createFournisseur = async (req, res) => {
  try {
    const fournisseur = await fournisseurService.createFournisseur(req.body);
    res.status(201).json(fournisseur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFournisseurById = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseur = await fournisseurService.getFournisseurById(id);
    if (fournisseur) res.json(fournisseur);
    else res.status(404).json({ message: 'Fournisseur not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseur = await fournisseurService.updateFournisseur(id, req.body);
    res.json(fournisseur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    await fournisseurService.deleteFournisseur(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await fournisseurService.getAllFournisseurs();
    res.json(fournisseurs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
