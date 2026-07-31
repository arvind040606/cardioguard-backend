const VITAL_FIELDS = [
  'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
  'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal',
];

const VITAL_RANGES = {
  age: [1, 120],
  sex: [0, 1],
  cp: [0, 3],
  trestbps: [50, 250],
  chol: [80, 600],
  fbs: [0, 1],
  restecg: [0, 2],
  thalach: [50, 250],
  exang: [0, 1],
  oldpeak: [0, 10],
  slope: [0, 2],
  ca: [0, 3],
  thal: [1, 3],
};

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeString(value, maxLength = 200) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validateRegistration(body) {
  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!name || name.length < 2) {
    return { error: 'Name must be at least 2 characters.' };
  }
  if (!isValidEmail(email)) {
    return { error: 'A valid email address is required.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  return { data: { name, email, password } };
}

function validateLogin(body) {
  const email = sanitizeString(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email) || !password) {
    return { error: 'Email and password are required.' };
  }

  return { data: { email, password } };
}

function validateForgotPassword(body) {
  const email = sanitizeString(body.email, 254).toLowerCase();

  if (!isValidEmail(email)) {
    return { error: 'A valid registered email address is required.' };
  }

  return { data: { email } };
}

function validateResetPassword(body) {
  const token = sanitizeString(body.token, 128);
  const password = typeof body.password === 'string' ? body.password : '';

  if (!token) {
    return { error: 'Reset token is required.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  return { data: { token, password } };
}

function validatePredictionInput(body) {
  const patientName = sanitizeString(body.patientName, 100);
  const patientId = sanitizeString(body.patientId, 50);

  if (!patientName || patientName.length < 2) {
    return { error: 'Patient name is required (minimum 2 characters).' };
  }
  if (!patientId || patientId.length < 2) {
    return { error: 'Patient identifier is required (minimum 2 characters).' };
  }

  const vitals = {};

  for (const field of VITAL_FIELDS) {
    const raw = body[field];
    const num = Number(raw);

    if (raw === undefined || raw === null || Number.isNaN(num)) {
      return { error: `Missing or invalid value for ${field}.` };
    }

    const [min, max] = VITAL_RANGES[field];
    if (num < min || num > max) {
      return { error: `${field} must be between ${min} and ${max}.` };
    }

    vitals[field] = num;
  }

  return { data: { patientName, patientId, vitals } };
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validatePredictionInput,
};
