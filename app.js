const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // Permitir que el servidor reciba JSON en las peticiones

// Importar rutas
const userRoutes = require('./src/userRoutes.js'); // Asegúrate de que este archivo exista
const candidateRoutes = require('./src/candidateRoutes.js');
const enterpriseRoutes = require('./src/enterpriseRoutes.js');
const forgotPasswordUserRoutes = require('./src/forgotPasswordUserRoutes.js');
const loginUserRoutes = require('./src/loginUserRoutes.js');

// Usar las rutas
app.use('/users', userRoutes);              // Rutas relacionadas con usuarios
app.use('/candidates', candidateRoutes);    // Rutas relacionadas con candidatos
app.use('/enterprises', enterpriseRoutes);  // Rutas relacionadas con empresas
app.use('/forgot-password', forgotPasswordUserRoutes); // Rutas relacionadas con restablecimiento de contraseñas
app.use('/login', loginUserRoutes);         // Rutas relacionadas con inicio de sesión

// Configuración del puerto y inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
