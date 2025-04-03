const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());

// Python script'i çalıştır ve JSON dosyasını oku
const runPythonScript = (pythonScript, jsonFile, res) => {
  // Doğru Python komutunu bul
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';

  // Python script'ini çalıştır
  exec(`${pythonCommand} ${pythonScript}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Python script çalıştırılırken hata oluştu (${pythonScript}):`, stderr || err.message);
      return res.status(500).send({ error: `Python script çalıştırılamadı: ${stderr || err.message}` });
    }

    console.log(`Python script çıktısı (${pythonScript}):`, stdout);

    // JSON dosyasını oku ve yanıt olarak gönder
    const jsonFilePath = path.resolve(__dirname, jsonFile);
    fs.readFile(jsonFilePath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(`JSON dosyası okunurken hata oluştu (${jsonFile}):`, readErr);
        return res.status(500).send({ error: 'JSON dosyası okunamadı' });
      }

      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseErr) {
        console.error(`JSON dosyası parse edilirken hata oluştu (${jsonFile}):`, parseErr);
        return res.status(500).send({ error: 'JSON dosyası hatalı formatta' });
      }
    });
  });
};

// Film öneri endpoint'i
app.get('/run-python/film', (req, res) => {
  runPythonScript('filmReco.py', 'outputFilm.json', res);
});

// Müzik öneri endpoint'i
app.get('/run-python/music', (req, res) => {
  runPythonScript('musicReco.py', 'outputMusic.json', res);
});

// Dizi öneri endpoint'i
app.get('/run-python/series', (req, res) => {
  runPythonScript('seriesReco.py', 'outputSeries.json', res);
});

// Kitap öneri endpoint'i
app.get('/run-python/book', (req, res) => {
  runPythonScript('bookReco.py', 'outputBooks.json', res);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
