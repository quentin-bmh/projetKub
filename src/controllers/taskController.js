const taskModel = require('../models/taskModel');

async function getTasks(req, res) {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getTask(req, res) {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Le titre est requis' });

    const task = await taskModel.createTask(title, description || null);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateTask(req, res) {
  try {
    const { title, description, completed } = req.body;
    const id = req.params.id;

    const existing = await taskModel.getTaskById(id);
    if (!existing) return res.status(404).json({ error: 'Tâche non trouvée' });

    // Permettre update partiel
    const updatedTask = await taskModel.updateTask(
      id,
      title ?? existing.title,
      description ?? existing.description,
      completed ?? existing.completed
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const existing = await taskModel.getTaskById(id);
    if (!existing) return res.status(404).json({ error: 'Tâche non trouvée' });

    await taskModel.deleteTask(id);
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
