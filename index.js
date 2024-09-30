'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const configPath = path.join(__dirname, "./config.json");
const config = require(configPath)[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
    }
);

const app = express();
const PORT = 3002;

// Middleware para procesar JSON
app.use(express.json());

// Cargar modelos
fs.readdirSync(path.join(__dirname, 'src/models'))
    .filter(file => file.endsWith('.js') && file !== path.basename(__filename))
    .forEach(file => {
        try {
            console.log(`Cargando modelo: ${file}`);
            const model = require(path.join(__dirname, 'src/models', file));
            if (model.init) {
                model.init(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            } else {
                console.error(`El archivo ${file} no tiene una definición de modelo válida.`);
            }
        } catch (error) {
            console.error(`Error cargando el modelo ${file}:`, error);
        }
    });

// Asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Probar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
        return sequelize.sync(); // Sincroniza todos los modelos
    })
    .then(() => {
        console.log('Base de datos sincronizada.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
