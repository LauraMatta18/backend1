const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // Permitir que el servidor reciba JSON en las peticiones

// Importar rutas
const userRoutes = require('./src/routes/userRoutes.js'); // Asegúrate de que este archivo exista
const candidateRoutes = require('./src/routes/candidateRoutes.js');
const enterpriseRoutes = require('./src/routes/enterpriseRoutes.js');
const forgotPasswordUserRoutes = require('./src/routes/forgotPasswordUserRoutes.js');
const loginUserRoutes = require('./src/routes/loginUserRoutes.js');

// Usar las rutas
app.use('/users', userRoutes);              // Rutas relacionadas con usuarios
app.use('/candidates', candidateRoutes);    // Rutas relacionadas con candidatos
app.use('/enterprises', enterpriseRoutes);  // Rutas relacionadas con empresas
app.use('/forgot-password', forgotPasswordUserRoutes); // Rutas relacionadas con restablecimiento de contraseñas
app.use('/login', loginUserRoutes);         // Rutas relacionadas con inicio de sesión

// Configuración del puerto y manejo de errores al iniciar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
});
