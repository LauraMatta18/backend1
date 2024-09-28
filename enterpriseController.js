// enterpriseController.js

const Enterprise = require("../models/enterprise.js");
const bcrypt = require('bcrypt');

// Crear una nueva empresa
exports.createEnterprise = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEnterprise = await Enterprise.create({
      name, email, password: hashedPassword
    });

    res.status(201).json(newEnterprise);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    res.status(500).json({ message: 'Error al crear empresa.', error: error.message });
  }
};

// Obtener todas las empresas
exports.getAllEnterprises = async (req, res) => {
  try {
    const enterprises = await Enterprise.findAll();
    res.json(enterprises);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
};

// Obtener una empresa por ID
exports.getEnterpriseById = async (req, res) => {
  try {
    const { id } = req.params;
    const enterprise = await Enterprise.findByPk(id);
    if (!enterprise) return res.status(404).json({ message: 'Empresa no encontrada' });

    res.json(enterprise);
  } catch (error) {
    console.error('Error al obtener empresa:', error);
    res.status(500).json({ message: 'Error al obtener empresa', error: error.message });
  }
};

// Actualizar una empresa
exports.updateEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const enterprise = await Enterprise.findByPk(id);
    if (!enterprise) return res.status(404).json({ message: 'Empresa no encontrada' });

    // Opcional: actualizar la contraseña solo si se proporciona
    if (password) {
      enterprise.password = await bcrypt.hash(password, 10);
    }
    enterprise.name = name;
    enterprise.email = email;
    await enterprise.save();

    res.json(enterprise);
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ message: 'Error al actualizar empresa', error: error.message });
  }
};

// Eliminar una empresa
exports.deleteEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const enterprise = await Enterprise.findByPk(id);
    if (!enterprise) return res.status(404).json({ message: 'Empresa no encontrada' });

    await enterprise.destroy();
    res.json({ message: 'Empresa eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    res.status(500).json({ message: 'Error al eliminar empresa.', error: error.message });
  }
};