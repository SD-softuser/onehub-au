const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/api/testing', (req, res) => {
  res.status(200).json({ message: 'Hello JB' });
})


app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});