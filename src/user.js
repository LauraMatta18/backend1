const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const User = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_login: {
    type: DataTypes.DATE
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Users',
  timestamps: false  // Si no quieres usar timestamps automáticos
});

module.exports = User;
