const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/login', async (req,res)=>{
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username }});
  if(!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.password_hash || '');
  if(!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'changeme', { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
