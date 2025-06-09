const express = require('express');
const app = express();
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

// API - attention tu as mis /api (sans /tasks), assure-toi que taskRoutes utilise bien les routes /tasks
app.use('/api/tasks', taskRoutes);

// Frontend statique
app.use(express.static(path.join(__dirname, '..', 'public')));


module.exports = app;

