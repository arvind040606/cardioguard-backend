const { spawn } = require('child_process');
const path = require('path');
const { getPythonExecutable } = require('../utils/python');
const logger = require('../utils/logger');

let benchmarkCache = null;
let promiseCache = null;

function getBenchmarkData() {
  if (benchmarkCache) {
    return Promise.resolve(benchmarkCache);
  }
  if (promiseCache) {
    return promiseCache;
  }

  promiseCache = new Promise((resolve, reject) => {
    const python = getPythonExecutable();
    const scriptPath = path.join(__dirname, '..', 'benchmark.py');

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
      logger.error('Failed to spawn Python benchmark process', { message: error.message });
      promiseCache = null;
      reject(error);
    });

    child.on('close', (code) => {
      promiseCache = null;
      if (code !== 0) {
        logger.error('Python benchmark process failed', { code, stderr: stderr.trim() });
        reject(new Error(`Benchmark service failed with code ${code}: ${stderr.trim()}`));
        return;
      }

      try {
        const data = JSON.parse(stdout);
        benchmarkCache = data;
        resolve(data);
      } catch (err) {
        logger.error('Invalid JSON from benchmark service', { stdout: stdout.trim() });
        reject(new Error('Benchmark service returned invalid response'));
      }
    });
  });

  return promiseCache;
}

function initBenchmarkCache() {
  logger.info('Initializing Benchmark Dataset Analytics cache...');
  getBenchmarkData()
    .then((data) => {
      logger.info(`Benchmark analytics cached successfully for dataset: ${data.dataset_name}`);
    })
    .catch((err) => {
      logger.error('Failed to pre-cache benchmark analytics:', { error: err.message });
    });
}

module.exports = {
  getBenchmarkData,
  initBenchmarkCache,
};
