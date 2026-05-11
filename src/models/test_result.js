module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const TestResult = sequelize.define('TestResult', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sample_test_id: { type: DataTypes.UUID, allowNull: false },
    value: { type: DataTypes.STRING },
    remarks: { type: DataTypes.STRING },
    entered_by: { type: DataTypes.UUID },
    verified_by: { type: DataTypes.UUID },
    entered_at: { type: DataTypes.DATE },
    verified_at: { type: DataTypes.DATE }
  }, { tableName: 'test_results' });
  return TestResult;
};
