// loginEnterpriseController.js

const LoginEnterprise = require("../models/Login_Enterprise.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login para empresas
exports.loginEnterprise = async (req, res) => {
  const { email, password } = req.body;
  try {
    const enterprise = await LoginEnterprise.findOne({ where: { email } });
    if (!enterprise) return res.status(404).json({ message: 'Empresa no encontrada.' });

    const isMatch = await bcrypt.compare(password, enterprise.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: enterprise.enterprise_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión de la empresa:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};