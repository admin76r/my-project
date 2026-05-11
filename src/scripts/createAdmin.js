// usage: node src/scripts/createAdmin.js <username> <password> "<Full Name>" [email]
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../models');

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node src/scripts/createAdmin.js <username> <password> "<Full Name>" [email]');
    process.exit(1);
  }
  const [username, password, full_name, email] = args;
  await sequelize.authenticate();
  const hash = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    where: { username },
    defaults: { username, password_hash: hash, full_name, email }
  });
  if (!created) {
    console.log('User exists — updating password & name/email');
    user.password_hash = hash;
    user.full_name = full_name;
    if (email) user.email = email;
    await user.save();
  }
  console.log('Admin user ready:', username);
  process.exit(0);
}
main().catch(err => { console.error(err); process.exit(1) });
