const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false
});

const db = { sequelize, Sequelize };

// load models
fs.readdirSync(__dirname)
  .filter(f=>f !== 'index.js' && f.endsWith('.js'))
  .forEach(file=>{
    const mod = require(path.join(__dirname,file))(sequelize);
    db[mod.name] = mod;
  });

// Associations (basic)
db.Patient.hasMany(db.Visit, { foreignKey: 'patient_id' });
db.Visit.belongsTo(db.Patient, { foreignKey: 'patient_id' });

module.exports = db;
