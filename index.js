const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World! Ayo belajar CC.')
})

// Data dummy
let classes = [
  { id: 1, nama_kelas: 'Matematika' },
  { id: 2, nama_kelas: 'Fisika' }
];

// READ - Get all classes
app.get('/classes', (req, res) => {
  res.json(classes);
});

// READ - Get a single class by ID
app.get('/classes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const kelas = classes.find(c => c.id === id);
  if (kelas) {
    res.json(kelas);
  } else {
    res.status(404).send('Class not found');
  }
});

// CREATE - Add a new class
app.post('/classes', (req, res) => {
  const newClass = {
    id: classes.length + 1,
    nama_kelas: req.body.nama_kelas
  };
  classes.push(newClass);
  res.status(201).json(newClass);
});

// UPDATE - Update a class by ID
app.put('/classes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const kelas = classes.find(c => c.id === id);
  if (kelas) {
    kelas.nama_kelas = req.body.nama_kelas;
    res.json(kelas);
  } else {
    res.status(404).send('Class not found');
  }
});

// DELETE - Delete a class by ID
app.delete('/classes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = classes.findIndex(c => c.id === id);
  if (index !== -1) {
    classes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Class not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
