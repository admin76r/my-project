module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Test = sequelize.define('Test', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    code: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    unit: { type: DataTypes.STRING },
    ref_range: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
  }, { tableName: 'tests' });
  return Test;
};
