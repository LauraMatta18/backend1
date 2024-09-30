const { DataTypes } = require('sequelize');
const sequelize = require('../../db.js');

const LoginEnterprise = sequelize.define('Login_Enterprise', {
  logent_id: {
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
  tableName: 'Login_Enterprise',
  timestamps: false  // Si no deseas timestamps automáticos
});

module.exports = LoginEnterprise;