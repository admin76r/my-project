const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const visitRoutes = require('./routes/visits');
const sampleRoutes = require('./routes/samples');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/samples', sampleRoutes);

const PORT = process.env.PORT || 4000;
async function start(){
  await sequelize.authenticate();
  console.log('DB connected');
  app.listen(PORT, ()=> console.log('Server running on', PORT));
}
start().catch(err => { console.error(err); process.exit(1) });
