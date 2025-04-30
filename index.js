const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     // sesuaikan dengan password MySQL Anda
  database: 'sekolah'
});

db.connect(err => {
  if (err) throw err;
  console.log('Terhubung ke database!');
});

// Endpoint: Get semua siswa
app.get('/siswa', (req, res) => {
  db.query('SELECT * FROM siswa', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint: Tambah siswa
app.post('/siswa', (req, res) => {
  const { no_induk_siswa, nama, alamat, tanggal_lahir } = req.body;
  const sql = 'INSERT INTO siswa (no_induk_siswa, nama, alamat, tanggal_lahir) VALUES (?, ?, ?, ?)';
  db.query(sql, [no_induk_siswa, nama, alamat, tanggal_lahir], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Siswa ditambahkan', id: result.insertId });
  });
});

// Endpoint: Ambil siswa berdasarkan ID
app.get('/siswa/:id', (req, res) => {
  const sql = 'SELECT * FROM siswa WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Endpoint: Update siswa
app.put('/siswa/:id', (req, res) => {
  const { no_induk_siswa, nama, alamat, tanggal_lahir } = req.body;
  const sql = 'UPDATE siswa SET no_induk_siswa=?, nama=?, alamat=?, tanggal_lahir=? WHERE id=?';
  db.query(sql, [no_induk_siswa, nama, alamat, tanggal_lahir, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Siswa diperbarui' });
  });
});

// Endpoint: Hapus siswa
app.delete('/siswa/:id', (req, res) => {
  const sql = 'DELETE FROM siswa WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Siswa dihapus' });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`API berjalan di http://localhost:${port}`);
});
