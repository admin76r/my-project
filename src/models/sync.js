const { sequelize } = require('.');
async function sync(){
  await sequelize.sync({ alter: true });
  console.log('DB synced');
  process.exit(0);
}
sync().catch(e=>{ console.error(e); process.exit(1) });
