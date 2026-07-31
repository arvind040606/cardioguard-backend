const { spawn } = require('child_process');
const path = require('path');
const { getPythonExecutable } = require('../utils/python');
const { AppError } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

function runPrediction(vitals) {
  return new Promise((resolve, reject) => {
    const python = getPythonExecutable();
    const scriptPath = path.join(__dirname, '..', 'predict.py');
    const payload = JSON.stringify(vitals);

    const child = spawn(python, [scriptPath], {
      cwd: path.join(__dirname, '..', '..'),
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('error', (error) => {
      logger.error('Failed to spawn Python prediction process', { message: error.message });
      reject(new AppError('Prediction service is unavailable. Verify the Python environment is configured.', 503));
    });

    child.on('close', (code) => {
      if (code !== 0) {
        logger.error('Python prediction process failed', { code, stderr: stderr.trim() });
        reject(new AppError('Prediction service failed to process the request. Please verify patient vitals and try again.', 500));
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch {
        logger.error('Invalid JSON from prediction service', { stdout: stdout.trim() });
        reject(new AppError('Prediction service returned an invalid response.', 500));
      }
    });

    child.stdin.write(payload);
    child.stdin.end();
  });
}

module.exports = { runPrediction };
