const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

// ✅ Enable CORS for all origins (dev-safe)
app.use(cors());

// ✅ Parse JSON bodies
app.use(express.json());

app.post('/generate-meal', (req, res) => {
  const { cuisines } = req.body;
  if (!cuisines || cuisines.length === 0) {
    return res.status(400).json({ error: 'No cuisines provided' });
  }

  const path = require('path');
  const scriptPath = path.join(__dirname, 'generate_meal.py');
  const cmd = `python3 "${scriptPath}" "${cuisines.join(',')}"`;

  exec(cmd, (error, stdout, stderr) => {
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

app.listen(5001, () => console.log('✅ Node server running at http://localhost:5001'));
