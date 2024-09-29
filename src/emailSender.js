// utils/emailSender.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // O tu proveedor de correo
  auth: {
    user: 'tu_email@gmail.com',
    pass: 'tu_contraseña' // Considera usar OAuth2 o una contraseña de aplicación para mayor seguridad
  }
});

const sendResetPasswordEmail = (to, token) => {
  const resetLink = `http://tu_dominio/reset-password?token=${token}`;

  const mailOptions = {
    from: 'tu_email@gmail.com',
    to,
    subject: 'Restablecimiento de contraseña',
    text: `Recibiste este correo porque se solicitó un restablecimiento de contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };