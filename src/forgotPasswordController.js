// forgotPasswordController.js

const User = require("./user.js");
const ForgotPasswordUser = require("./ForgotPasswordUser.js");
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail } = require('./emailSender');

// Solicitar restablecimiento de contraseña
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await ForgotPasswordUser.create({
      user_id: user.user_id,
      email: user.email,
      reset_token: token,
      token_expires: new Date(Date.now() + 3600000)
    });

    sendResetPasswordEmail(user.email, token);
    res.status(200).json({ message: 'Se ha enviado un enlace para restablecer la contraseña.' });
  } catch (error) {
    console.error('Error al solicitar restablecimiento de contraseña:', error);
    res.status(500).json({ message: 'Error al solicitar restablecimiento de contraseña.', error: error.message });
  }
};

// Restablecer la contraseña
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const resetRequest = await ForgotPasswordUser.findOne({ where: { reset_token: token } });

    if (!resetRequest || new Date() > resetRequest.token_expires) {
      return res.status(400).json({ message: 'Token inválido o expirado.' });
    }

    const user = await User.findByPk(resetRequest.user_id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await ForgotPasswordUser.destroy({ where: { reset_token: token } });
    res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña.', error: error.message });
  }
};
