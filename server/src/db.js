import initSqlJs from 'sql.js';
import fsExtra from 'fs-extra';
const { ensureDirSync, pathExistsSync, readFileSync, writeFileSync } = fsExtra;
import { dirname, join } from 'path';

const dbPath = join(process.cwd(), 'data', 'petshop.db');
const wasmLocate = (file) => {
  // sql.js expects to find sql-wasm.wasm in node_modules
  return join(process.cwd(), 'node_modules', 'sql.js', 'dist', file);
};

let SQL; // module
let db;  // database instance

export async function initDb() {
  ensureDirSync(dirname(dbPath));
  SQL = await initSqlJs({ locateFile: wasmLocate });
  if (pathExistsSync(dbPath)) {
    const buf = readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }
  initSchema();
}

function persist() {
  const data = db.export();
  writeFileSync(dbPath, Buffer.from(data));
}

export function initSchema() {
  db.run(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      address TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      category TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      price REAL,
      FOREIGN KEY (location_id) REFERENCES locations(id)
    );
  `);
  persist();
}

export function getAllLocations() {
  const res = db.exec('SELECT * FROM locations ORDER BY id DESC');
  const rows = res[0]?.values || [];
  const cols = res[0]?.columns || [];
  return rows.map((r) => Object.fromEntries(r.map((v, i) => [cols[i], v])));
}

export function getLocationById(id) {
  const res = db.exec(`SELECT * FROM locations WHERE id = ${id} LIMIT 1`);
  const rows = res[0]?.values || [];
  const cols = res[0]?.columns || [];
  return rows[0] ? Object.fromEntries(rows[0].map((v, i) => [cols[i], v])) : null;
}

export function insertLocation({ title, address, latitude, longitude, category, description }) {
  const stmt = db.prepare(`
    INSERT INTO locations (title, address, latitude, longitude, category, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run([title, address, latitude, longitude, category, description]);
  stmt.free();
  persist();
  const res = db.exec('SELECT last_insert_rowid() AS id');
  return res[0].values[0][0];
}

export function updateLocation(id, { title, address, latitude, longitude, category, description }) {
  const stmt = db.prepare(`
    UPDATE locations SET title = ?, address = ?, latitude = ?, longitude = ?, category = ?, description = ? WHERE id = ?
  `);
  stmt.run([title, address, latitude, longitude, category, description, id]);
  stmt.free();
  persist();
}

export function deleteLocation(id) {
  const stmt = db.prepare('DELETE FROM locations WHERE id = ?');
  stmt.run([id]);
  stmt.free();
  persist();
}