const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const dbFilePath = path.join(__dirname, 'db.json');

async function ensureDbFile() {
  try {
    await fs.access(dbFilePath);
  } catch {
    const initialData = { users: [], predictions: [], resetTokens: [] };
    await fs.writeFile(dbFilePath, JSON.stringify(initialData, null, 2));
  }
}

async function readDb() {
  await ensureDbFile();
  try {
    const content = await fs.readFile(dbFilePath, 'utf8');
    const data = JSON.parse(content);
    return {
      users: data.users || [],
      predictions: data.predictions || [],
      resetTokens: data.resetTokens || [],
    };
  } catch (error) {
    console.error('Error reading jsonDb:', error);
    return { users: [], predictions: [], resetTokens: [] };
  }
}

async function writeDb(data) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing jsonDb:', error);
    throw error;
  }
}

function generateId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

module.exports = {
  users: {
    async findOne({ email }) {
      const db = await readDb();
      return db.users.find((u) => u.email === email) || null;
    },
    async findById(id) {
      const db = await readDb();
      return db.users.find((u) => u.id === id || u._id === id) || null;
    },
    async create(userData) {
      const db = await readDb();
      const newUser = {
        id: generateId('u'),
        createdAt: new Date().toISOString(),
        ...userData,
      };
      db.users.push(newUser);
      await writeDb(db);
      return newUser;
    },
    async updatePassword(email, newHashedPassword) {
      const db = await readDb();
      const index = db.users.findIndex((u) => u.email === email);
      if (index !== -1) {
        db.users[index].password = newHashedPassword;
        await writeDb(db);
        return true;
      }
      return false;
    },
    async find() {
      const db = await readDb();
      return db.users;
    },
    async deleteOne({ id }) {
      const db = await readDb();
      const index = db.users.findIndex((u) => u.id === id || u._id === id);
      if (index !== -1) {
        db.users.splice(index, 1);
        await writeDb(db);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    },
  },

  predictions: {
    async find(filter = {}) {
      const db = await readDb();
      let results = db.predictions;
      if (filter.createdBy) {
        results = results.filter((p) => p.createdBy === filter.createdBy);
      }
      return [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    async findById(id) {
      const db = await readDb();
      return db.predictions.find((p) => p.id === id || p._id === id) || null;
    },
    async create(predData) {
      const db = await readDb();
      const newPred = {
        id: generateId('p'),
        createdAt: new Date().toISOString(),
        ...predData,
      };
      db.predictions.push(newPred);
      await writeDb(db);
      return newPred;
    },
    async deleteOne({ id, createdBy }) {
      const db = await readDb();
      const index = db.predictions.findIndex(
        (p) => (p.id === id || p._id === id) && (!createdBy || p.createdBy === createdBy)
      );
      if (index !== -1) {
        db.predictions.splice(index, 1);
        await writeDb(db);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    },
  },

  resetTokens: {
    async create({ userId, tokenHash, expiresAt }) {
      const db = await readDb();
      db.resetTokens = db.resetTokens.filter((t) => t.userId !== userId);
      const token = {
        id: generateId('rt'),
        userId,
        tokenHash,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      };
      db.resetTokens.push(token);
      await writeDb(db);
      return token;
    },
    async findByTokenHash(tokenHash) {
      const db = await readDb();
      return db.resetTokens.find((t) => t.tokenHash === tokenHash) || null;
    },
    async deleteByUserId(userId) {
      const db = await readDb();
      db.resetTokens = db.resetTokens.filter((t) => t.userId !== userId);
      await writeDb(db);
    },
    async deleteExpired() {
      const db = await readDb();
      const now = new Date();
      db.resetTokens = db.resetTokens.filter((t) => new Date(t.expiresAt) > now);
      await writeDb(db);
    },
  },
};
