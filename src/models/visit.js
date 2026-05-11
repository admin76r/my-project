module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Visit = sequelize.define('Visit', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    visit_number: { type: DataTypes.STRING, unique: true },
    visit_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'registered' }
  }, { tableName: 'visits' });
  return Visit;
};
