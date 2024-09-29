const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Enterprise = sequelize.define('Enterprise', {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_enterprise: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  PDF_rut: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  created_password_hash: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cellphone_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  born_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  enterprise_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  photo_log: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  registration_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  industries_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  UUID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_registration_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Enterprise',
  timestamps: false  // No timestamps automáticos
});

module.exports = Enterprise;