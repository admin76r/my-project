module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const SampleTest = sequelize.define('SampleTest', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sample_id: { type: DataTypes.UUID, allowNull: false },
    test_id: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, { tableName: 'sample_tests' });
  return SampleTest;
};
