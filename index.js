const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Set up MySQL connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'tasks',
});

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Parse JSON in request body
app.use(cors());
app.use(express.json());

// API endpoints

// Get all tasks
app.get('/api/todos', (req, res) => {
  const query = 'SELECT * FROM tasks';
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get a single task by ID
app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM tasks WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// Create a new task
app.post('/api/todos', (req, res) => {
  const { task, time } = req.body;
  const query = `INSERT INTO tasks (task, time) VALUES ('${task}', '${time}')`;
  console.log('task', `${task}`, 'time', `${time}`);
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send({message:`Tasks created`});
  });
});

// Update a task by ID
app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const { task, time } = req.body;
  const query = `UPDATE tasks SET task = '${task}', time = '${time}' WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send({message:`Task updated.`});
  });
});

// Delete a task by ID
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM tasks WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send({message:`Task deleted.`});
  });
});

// Start server
const PORT = 9090;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
