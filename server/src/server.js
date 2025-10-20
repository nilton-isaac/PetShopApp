import express from 'express';
import cors from 'cors';
import { initDb, getAllLocations, getLocationById, insertLocation, updateLocation, deleteLocation } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

await initDb();

// Seed minimal demo if empty
app.post('/seed', (req, res) => {
  const existing = getAllLocations();
  if (existing.length > 0) return res.json({ seeded: false, count: existing.length });

  const demo = [
    { title: 'Clínica Vet Centro', address: 'Av. Central, 123', latitude: -23.5505, longitude: -46.6333, category: 'vet', description: 'Atendimento 24h' },
    { title: 'Banho & Tosa Estilo', address: 'Rua Flores, 77', latitude: -23.558, longitude: -46.64, category: 'grooming', description: 'Agendamento online' },
    { title: 'Loja Pet & Hotel', address: 'Alameda Suave, 45', latitude: -23.5591, longitude: -46.6281, category: 'hotel', description: 'Diárias e ração premium' }
  ];

  demo.forEach((loc) => insertLocation(loc));
  return res.json({ seeded: true, count: demo.length });
});

// Locations CRUD
app.get('/locations', (req, res) => {
  res.json(getAllLocations());
});

app.get('/locations/:id', (req, res) => {
  const row = getLocationById(Number(req.params.id));
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.post('/locations', (req, res) => {
  const id = insertLocation(req.body);
  res.status(201).json({ id });
});

app.put('/locations/:id', (req, res) => {
  updateLocation(Number(req.params.id), req.body);
  res.status(204).end();
});

app.delete('/locations/:id', (req, res) => {
  deleteLocation(Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`SQLite (sql.js) API listening on http://localhost:${PORT}`);
});