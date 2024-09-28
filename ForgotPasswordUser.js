const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const User = require('./user.js'); // Importa el modelo de usuario para la clave foránea

const ForgotPasswordUser = sequelize.define('Forgot_Password_User', {
  password_reset: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Hace referencia a la tabla 'Users'
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  reset_token: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  token_expires: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Forgot_Password_User',
  timestamps: false  // No queremos timestamps automáticos
});

module.exports = ForgotPasswordUser;