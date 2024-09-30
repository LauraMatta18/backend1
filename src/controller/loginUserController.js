// loginUserController.js

const LoginUser = require("../models/Login_User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login para usuarios
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await LoginUser.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};

// Asegúrate de que haya exportaciones para logoutUser si lo estás usando
exports.logoutUser = (req, res) => {
  // Lógica para cerrar sesión, si es necesario
  res.json({ message: 'Sesión cerrada.' });
};