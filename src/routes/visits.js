const express = require('express');
const router = express.Router();
const { Visit, Sample, SampleTest, Test } = require('../models');

// Create a visit and associated sample(s) with tests
// POST /api/visits
// body: { patient_id: string, tests: [test_code_or_id,...] }
router.post('/', async (req, res) => {
  try {
    const { patient_id, tests } = req.body;
    if (!patient_id) return res.status(400).json({ error: 'patient_id required' });

    const visit = await Visit.create({ patient_id });

    // create a single sample per visit (simple model). You can extend for multiple samples.
    const barcode = 'SAMP-' + Date.now().toString().slice(-8);
    const sample = await Sample.create({ visit_id: visit.id, sample_barcode: barcode });

    // resolve tests (allow passing codes or ids). Create sample_test rows
    const sampleTests = [];
    if (Array.isArray(tests)) {
      for (const t of tests) {
        let testObj = null;
        if (t.match && t.match(/^[0-9a-fA-F-]{36}$/)) {
          testObj = await Test.findByPk(t);
        } else {
          testObj = await Test.findOne({ where: { code: t } });
        }
        if (testObj) {
          const st = await SampleTest.create({ sample_id: sample.id, test_id: testObj.id });
          sampleTests.push(st);
        }
      }
    }

    res.status(201).json({ visit, sample, sampleTests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
