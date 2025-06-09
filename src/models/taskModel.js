const client = require('../config/db');

async function getAllTasks() {
  const res = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
  return res.rows;
}

async function getTaskById(id) {
  const res = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return res.rows[0];
}

async function createTask(title, description) {
  const res = await client.query(
    'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );
  return res.rows[0];
}

async function updateTask(id, title, description, completed) {
  const res = await client.query(
    `UPDATE tasks 
     SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $4 RETURNING *`,
    [title, description, completed, id]
  );
  return res.rows[0];
}

async function deleteTask(id) {
  await client.query('DELETE FROM tasks WHERE id = $1', [id]);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
