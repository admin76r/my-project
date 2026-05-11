const express = require('express');
const router = express.Router();
const { Sample, SampleTest, TestResult, Test } = require('../models');

// Enter results for a sample
// POST /api/samples/:id/results
// body: [ { test_id or test_code, value, remarks } ]
router.post('/:id/results', async (req, res) => {
  try {
    const sampleId = req.params.id;
    const entries = req.body;
    if (!Array.isArray(entries)) return res.status(400).json({ error: 'array expected' });

    const saved = [];
    for (const e of entries) {
      let testId = e.test_id;
      if (!testId && e.test_code) {
        const testObj = await Test.findOne({ where: { code: e.test_code } });
        if (testObj) testId = testObj.id;
      }
      if (!testId) continue;
      const sampleTest = await SampleTest.findOne({ where: { sample_id: sampleId, test_id: testId } });
      if (!sampleTest) continue;

      const tr = await TestResult.create({
        sample_test_id: sampleTest.id,
        value: e.value,
        remarks: e.remarks || null,
        entered_by: e.entered_by || null,
        entered_at: new Date()
      });
      saved.push(tr);

      // update sample_test status
      sampleTest.status = 'completed';
      await sampleTest.save();
    }

    res.json({ saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
