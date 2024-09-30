const User = require('../models/User.js'); 
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;

        if (!name || !email || !password || !bio) {
            return res.status(400).json({ error: 'Faltan campos requeridos.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password_hash: hashedPassword, bio });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};
