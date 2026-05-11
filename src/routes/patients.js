const express = require('express');
const router = express.Router();
const { Patient } = require('../models');

router.post('/', async (req,res)=>{
  const p = await Patient.create(req.body);
  res.status(201).json(p);
});
router.get('/', async (req,res)=>{
  const q = req.query.q || '';
  const patients = await Patient.findAll({
    where: { name: { [require('sequelize').Op.iLike]: `%${q}%` } },
    limit: 50
  });
  res.json(patients);
});

module.exports = router;
