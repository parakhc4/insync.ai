const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Meal generation endpoint (LLM)
app.post('/generate-meal', (req, res) => {
  const { cuisines } = req.body;
  if (!cuisines || cuisines.length === 0) {
    return res.status(400).json({ error: 'No cuisines provided' });
  }

  const scriptPath = path.join(__dirname, 'generate_meal.py');
  const cmd = `python3 "${scriptPath}" "${cuisines.join(',')}"`;

  exec(cmd, { maxBuffer: 1024 * 5000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Python error:', stderr);
      return res.status(500).json({ error: 'Meal generation failed' });
    }
    try {
      const json = JSON.parse(stdout);
      res.json(json);
    } catch (err) {
      res.status(500).json({ error: 'Invalid JSON from Python' });
    }
  });
});

// Nutrition analysis endpoint (LVM)
app.post('/analyze-image', (req, res) => {
  const { base64 } = req.body;
  if (!base64) return res.status(400).json({ error: 'Missing image data' });

  const scriptPath = path.join(__dirname, 'analyze_image.py');
  const cmd = `python3 "${scriptPath}" "${base64}"`;

  exec(cmd, { maxBuffer: 1024 * 5000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Image script error:', stderr);
      return res.status(500).json({ error: 'Python script failed' });
    }
    try {
      const parsed = JSON.parse(stdout);
      res.json(parsed);
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse Python output' });
    }
  });
});

app.listen(5001, () => console.log('✅ Node server running at http://localhost:5001'));
