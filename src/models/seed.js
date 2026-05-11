require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sequelize, User } = require('.');

async function main() {
  await sequelize.authenticate();
  // ensure tables exist
  await sequelize.sync();

  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;
  const envName = process.env.ADMIN_FULLNAME || 'Clinic Admin';
  const envEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

  // If ADMIN_USERNAME provided, create or update that user
  if (envUser) {
    const hash = await bcrypt.hash(envPass || crypto.randomBytes(8).toString('hex'), 10);
    const [user, created] = await User.findOrCreate({
      where: { username: envUser },
      defaults: { username: envUser, password_hash: hash, full_name: envName, email: envEmail }
    });
    if (!created) {
      user.password_hash = hash;
      user.full_name = envName;
      user.email = envEmail;
      await user.save();
      console.log(`Updated admin user: ${envUser}`);
    } else {
      console.log(`Created admin user: ${envUser}`);
    }
    console.log('Note: If you did not provide ADMIN_PASSWORD env var a generated password was used.');
    process.exit(0);
  }

  // Otherwise, if no users in DB, create default admin
  const count = await User.count();
  if (count === 0) {
    const username = 'admin';
    const password = envPass || crypto.randomBytes(12).toString('hex');
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password_hash: hash, full_name: envName, email: envEmail });
    console.log('No users found. Created default admin:');
    console.log(`  username: ${username}`);
    console.log(`  password: ${password}`);
  } else {
    console.log('Users already exist in DB. No default admin created.');
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
