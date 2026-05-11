module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT }
  }, { tableName: 'patients' });
  return Patient;
};
