const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const LoginUser = sequelize.define('Login_User', {
  loguser_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  locked_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_registration_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Login_User',
  timestamps: false  // Si no deseas timestamps automáticos (createdAt, updatedAt)
});

module.exports = LoginUser;