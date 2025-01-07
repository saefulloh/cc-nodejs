const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware komentar testing
app.use(bodyParser.json());

// Route utama
app.get('/', (req, res) => {
  res.send('Hello World! Ayo belajar CC. trigger action unit test');
});

// Fungsi untuk menghitung luas persegi panjang
function luas(length, width) {
  if (typeof length !== 'number' || typeof width !== 'number' || length <= 0 || width <= 0) {
    throw new Error('Invalid input');
  }
  return length * width;
}

// Endpoint untuk menghitung luas persegi panjang
app.post('/hitung-luas', (req, res) => {
  try {
    const { length, width } = req.body;
    const area = luas(length, width);
    res.json({ area });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
/*
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/

module.exports = app;
module.exports.luas = luas; // Ekspor fungsi untuk unit testing
