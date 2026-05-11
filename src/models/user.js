module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true },
    password_hash: { type: DataTypes.STRING },
    full_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
  }, { tableName: 'users' });
  return User;
};
