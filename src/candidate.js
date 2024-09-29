const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Candidate = sequelize.define('Candidate', {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_user: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  PDF_ID: {
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
  sex: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  photo_1: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  photo_2: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  marital_state: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  registration_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  has_children: {
    type: DataTypes.BOOLEAN,
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
  tableName: 'Candidate',
  timestamps: false  // No timestamps automáticos
});

module.exports = Candidate;