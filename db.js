const { Sequelize } = require('sequelize');
const path = require('path');
const configPath = path.join(__dirname, './config.json');
const config = require(configPath);

// Verifica que la configuración para el entorno de desarrollo esté definida
if (!config.development) {
  throw new Error('No se encuentra la configuración para el entorno de desarrollo en config.json.');
}

// Crear la instancia de Sequelize con la configuración de desarrollo
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false, // Desactivar el logging de Sequelize para que no se llene de mensajes
  }
);

// Función para autenticar y verificar la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
  }
})();

module.exports = sequelize;
