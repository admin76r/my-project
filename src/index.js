const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 4000;
async function start(){
  await sequelize.authenticate();
  console.log('DB connected');
  app.listen(PORT, ()=> console.log('Server running on', PORT));
}
start().catch(err => { console.error(err); process.exit(1) });
