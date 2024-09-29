'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, "./config.json");
const config = require(configPath)[env];
const db = {};
const express = require('express');
const sequelize = require("./db"); // Asegúrate de que esta importación sea correcta
const userRoutes = require("./src/userRoutes"); // Verifica que este archivo existe y es correcto
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas
app.use('/users', userRoutes); // Asegúrate que userRoutes está exportando correctamente un router

// Sincronizar base de datos y arrancar el servidor
sequelize.sync({ force: true })
    .then(() => {
        console.log('Base de datos conectada y sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
    });

// Resto del código para los modelos de Sequelize
fs
  .readdirSync(__dirname)
  .filter(file => {
      return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
      );
  })
  .forEach(file => {
      const modelPath = path.join(__dirname, file);
      const model = require(modelPath);

      // Verificar si el archivo exporta una función
      if (typeof model === 'function') {
          db[model.name] = model(sequelize, Sequelize.DataTypes);
      } else {
          console.error(`El archivo ${file} no exporta una función válida para Sequelize.`);
      }
  });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;
