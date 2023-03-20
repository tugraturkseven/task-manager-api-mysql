const express = require('express');
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
app.use(express.json());

// API endpoints

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM tasks WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { text, time } = req.body;
  const query = `INSERT INTO tasks (text, time) VALUES ('${text}', '${time}')`;
  console.log('text',`${text}`,'time',`${time}`);
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Task created');
  });
});

// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { text, time } = req.body;
  const query = `UPDATE tasks SET text = '${text}', time = '${time}' WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Task updated');
  });
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM tasks WHERE id = ${id}`;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Task deleted');
  });
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
