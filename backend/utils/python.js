const path = require('path');
const fs = require('fs');
const { config } = require('../config/env');

function getPythonExecutable() {
  if (config.pythonBin) return config.pythonBin;

  const possiblePaths = [
    path.join(__dirname, '..', '..', '.venv', 'Scripts', 'python.exe'),
    path.join(__dirname, '..', '..', 'venv', 'Scripts', 'python.exe'),
    path.join(__dirname, '..', '..', '.venv', 'bin', 'python'),
    path.join(__dirname, '..', '..', 'venv', 'bin', 'python'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }

  return process.platform === 'win32' ? 'python' : 'python3';
}

module.exports = { getPythonExecutable };
