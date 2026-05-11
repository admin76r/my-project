const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

let sequelize;

// Support SQLite fallback for Gitpod / quick demos
if (process.env.DB_USE_SQLITE === 'true' || process.env.DB_USE_SQLITE === '1') {
  const storage = process.env.DB_SQLITE_FILE || path.join(__dirname, '..', 'data', 'db.sqlite');
  // Ensure directory exists
  fs.mkdirSync(path.dirname(storage), { recursive: true });
  sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false });
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  });
}

const db = { sequelize, Sequelize };

// load models
fs.readdirSync(__dirname)
  .filter(f => f !== 'index.js' && f.endsWith('.js'))
  .forEach(file => {
    const mod = require(path.join(__dirname, file))(sequelize);
    db[mod.name] = mod;
  });

// Associations (basic)
if (db.Patient && db.Visit) {
  db.Patient.hasMany(db.Visit, { foreignKey: 'patient_id' });
  db.Visit.belongsTo(db.Patient, { foreignKey: 'patient_id' });
}
if (db.Visit && db.Sample) {
  db.Visit.hasMany(db.Sample, { foreignKey: 'visit_id' });
  db.Sample.belongsTo(db.Visit, { foreignKey: 'visit_id' });
}
if (db.Sample && db.SampleTest) {
  db.Sample.hasMany(db.SampleTest, { foreignKey: 'sample_id' });
  db.SampleTest.belongsTo(db.Sample, { foreignKey: 'sample_id' });
}
if (db.Test && db.SampleTest) {
  db.Test.hasMany(db.SampleTest, { foreignKey: 'test_id' });
  db.SampleTest.belongsTo(db.Test, { foreignKey: 'test_id' });
}
if (db.SampleTest && db.TestResult) {
  db.SampleTest.hasMany(db.TestResult, { foreignKey: 'sample_test_id' });
  db.TestResult.belongsTo(db.SampleTest, { foreignKey: 'sample_test_id' });
}

module.exports = db;
