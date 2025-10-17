import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({ filename: './server/tasks.db', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);
}

// CRUD
app.get('/api/tasks', async (req, res) => {
  const rows = await db.all('SELECT * FROM tasks ORDER BY id DESC');
  const tasks = rows.map(r => ({ id: r.id, title: r.title, completed: !!r.completed, createdAt: r.createdAt }));
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { title, completed = false, createdAt } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'Título inválido' });
  const created = createdAt || new Date().toISOString();
  const result = await db.run('INSERT INTO tasks (title, completed, createdAt) VALUES (?, ?, ?)', [title.trim(), completed ? 1 : 0, created]);
  res.status(201).json({ id: result.lastID, title: title.trim(), completed: !!completed, createdAt: created });
});

app.put('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const row = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
  if (!row) return res.status(404).json({ error: 'Tarefa não encontrada' });
  const newTitle = title !== undefined ? String(title).trim() : row.title;
  const newCompleted = completed !== undefined ? (completed ? 1 : 0) : row.completed;
  await db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [newTitle, newCompleted, id]);
  res.json({ id, title: newTitle, completed: !!newCompleted, createdAt: row.createdAt });
});

app.delete('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  await db.run('DELETE FROM tasks WHERE id = ?', [id]);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
initDb().then(() => {
  app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
});


