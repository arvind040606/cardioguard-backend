const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const dbFilePath = path.join(__dirname, 'db.json');

async function ensureDbFile() {
  try {
    await fs.access(dbFilePath);
  } catch {
    const initialData = { predictions: [] };
    await fs.writeFile(dbFilePath, JSON.stringify(initialData, null, 2));
  }
}

async function readDb() {
  await ensureDbFile();
  try {
    const content = await fs.readFile(dbFilePath, 'utf8');
    const data = JSON.parse(content);
    return {
      predictions: data.predictions || [],
    };
  } catch (error) {
    console.error('Error reading jsonDb:', error);
    return { predictions: [] };
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


};
