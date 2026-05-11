module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Sample = sequelize.define('Sample', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    visit_id: { type: DataTypes.UUID, allowNull: false },
    sample_barcode: { type: DataTypes.STRING, unique: true },
    collected_at: { type: DataTypes.DATE },
    collected_by: { type: DataTypes.UUID },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, { tableName: 'samples' });
  return Sample;
};
