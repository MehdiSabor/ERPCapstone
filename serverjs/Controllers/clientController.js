//  controllers/clientController.js
const clientService = require('../services/clientService');
const xlsx = require('xlsx');

exports.createClient = async (req, res) => {
  try {
    console.log(req.body);
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    console.log(req.params.id)
    const client = await clientService.getClientById(parseInt(req.params.id));
    if (client) res.json(client);
    else res.status(404).json({ message: "Client not found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(parseInt(req.params.id), req.body);
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await clientService.deleteClient(parseInt(req.params.id));
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.bulkUploadClients = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const result = await clientService.bulkCreateOrUpdateClients(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
