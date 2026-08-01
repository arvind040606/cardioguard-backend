const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const { getPythonExecutable } = require('../utils/python');
const { AppError } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

let worker = null;
let rl = null;
const queue = [];

function initWorker() {
  if (worker && !worker.killed) return;

  const python = getPythonExecutable();
  const scriptPath = path.join(__dirname, '..', 'predict_worker.py');

  logger.info('Initializing persistent ML prediction worker in memory...');
  worker = spawn(python, ['-u', scriptPath], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  rl = readline.createInterface({ input: worker.stdout });
  rl.on('line', (line) => {
    if (queue.length > 0) {
      const { resolve, reject } = queue.shift();
      try {
        const data = JSON.parse(line);
        if (data.error) {
          reject(new AppError(`ML Worker Error: ${data.error}`, 500));
        } else {
          resolve(data);
        }
      } catch (err) {
        logger.error('Invalid JSON from ML worker', { output: line });
        reject(new AppError('Prediction service returned an invalid response.', 500));
      }
    }
  });

  worker.stderr.on('data', (data) => {
    logger.warn(`ML Worker stderr: ${data.toString().trim()}`);
  });

  worker.on('exit', (code) => {
    logger.warn(`ML Worker exited with code ${code}. Reinitializing on next request...`);
    worker = null;
    while (queue.length > 0) {
      const { reject } = queue.shift();
      reject(new AppError('ML prediction worker terminated abruptly.', 503));
    }
  });
}

function runPrediction(vitals) {
  return new Promise((resolve, reject) => {
    try {
      initWorker();
      if (!worker || worker.killed) {
        return reject(new AppError('Prediction service worker is unavailable.', 503));
      }
      queue.push({ resolve, reject });
      worker.stdin.write(JSON.stringify(vitals) + '\n');
    } catch (err) {
      logger.error('Error sending data to ML worker', { message: err.message });
      reject(new AppError('Failed to process prediction request.', 500));
    }
  });
}

// Pre-load ML worker on backend initialization
initWorker();

module.exports = { runPrediction };
