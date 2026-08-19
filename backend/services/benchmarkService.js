const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { getPythonExecutable } = require('../utils/python');
const logger = require('../utils/logger');

let benchmarkCache = null;
let promiseCache = null;

const CACHE_FILE_PATH = path.join(__dirname, '..', 'benchmark_cache.json');

function getBenchmarkData() {
  if (benchmarkCache) {
    return Promise.resolve(benchmarkCache);
  }

  // 1. Instant loading from pre-computed static JSON cache file (<5ms)
  if (fs.existsSync(CACHE_FILE_PATH)) {
    try {
      const rawData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const data = JSON.parse(rawData);
      if (data && data.model_evaluation) {
        benchmarkCache = data;
        logger.info('Loaded Benchmark Analytics instantly from static cache JSON file');
        return Promise.resolve(data);
      }
    } catch (err) {
      logger.warn('Failed to parse benchmark static cache JSON, falling back to python generation:', err.message);
    }
  }

  if (promiseCache) {
    return promiseCache;
  }

  // 2. Fallback to Python execution if static cache is missing
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
        try {
          fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        } catch (e) {
          logger.warn('Failed to save benchmark cache to disk:', e.message);
        }
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
