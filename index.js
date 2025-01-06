const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://mongo:rrUsUzLgjGKQoOoaoixaDkcZzDVnlWfj@junction.proxy.rlwy.net:34598', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema dan Model
const kelasSchema = new mongoose.Schema({
  nama_kelas: { type: String, required: true }
});

const Kelas = mongoose.model('Kelas', kelasSchema);

// CREATE - Menambahkan data kelas baru
app.post('/classes', async (req, res) => {
  try {
    const newClass = new Kelas({
      nama_kelas: req.body.nama_kelas
    });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Mendapatkan semua data kelas
app.get('/classes', async (req, res) => {
  try {
    const classes = await Kelas.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Mendapatkan data kelas berdasarkan ID
app.get('/classes/:id', async (req, res) => {
  try {
    const kelas = await Kelas.findById(req.params.id);
    if (kelas) {
      res.json(kelas);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Memperbarui data kelas berdasarkan ID
app.put('/classes/:id', async (req, res) => {
  try {
    const updatedClass = await Kelas.findByIdAndUpdate(
      req.params.id,
      { nama_kelas: req.body.nama_kelas },
      { new: true, runValidators: true }
    );
    if (updatedClass) {
      res.json(updatedClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Menghapus data kelas berdasarkan ID
app.delete('/classes/:id', async (req, res) => {
  try {
    const deletedClass = await Kelas.findByIdAndDelete(req.params.id);
    if (deletedClass) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
