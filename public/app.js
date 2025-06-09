const apiBase = '/api/tasks';

async function fetchTasks() {
  const res = await fetch(apiBase);
  return res.json();
}

async function addTask(title, description) {
  const res = await fetch(apiBase, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title, description }),
  });
  return res.json();
}

async function updateTask(id, updates) {
  const res = await fetch(`${apiBase}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updates),
  });
  return res.json();
}

async function deleteTask(id) {
  await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task' + (task.completed ? ' completed' : '');

  const details = document.createElement('div');
  details.className = 'details';

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = task.title;

  const desc = document.createElement('div');
  desc.className = 'description';
  desc.textContent = task.description || '';

  details.appendChild(title);
  details.appendChild(desc);

  const actions = document.createElement('div');
  actions.className = 'actions';

  // Bouton toggle completed
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = task.completed ? '✔️' : '❌';
  toggleBtn.title = task.completed ? 'Marquer non fait' : 'Marquer fait';
  toggleBtn.onclick = async () => {
    await updateTask(task.id, { completed: !task.completed });
    loadTasks();
  };

  // Bouton supprimer
  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.title = 'Supprimer';
  delBtn.onclick = async () => {
    if (confirm('Supprimer cette tâche ?')) {
      await deleteTask(task.id);
      loadTasks();
    }
  };

  actions.appendChild(toggleBtn);
  actions.appendChild(delBtn);

  li.appendChild(details);
  li.appendChild(actions);

  return li;
}

async function loadTasks() {
  const list = document.getElementById('tasks-list');
  list.innerHTML = '';
  const tasks = await fetchTasks();
  if (tasks.length === 0) {
    list.innerHTML = '<li>Aucune tâche</li>';
    return;
  }
  tasks.forEach(task => {
    const li = createTaskElement(task);
    list.appendChild(li);
  });
}

document.getElementById('task-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  if (!title) return alert('Le titre est requis');
  await addTask(title, description);
  e.target.reset();
  loadTasks();
});

window.onload = () => {
  loadTasks();
};
