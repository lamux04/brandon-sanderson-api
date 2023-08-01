const express = require('express');
const app = express();

const path = require('node:path');

// Midlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use(require('./routes/api.routes'));

app.use((req, res) => {
  res.status(404).json({
    error: '404 - Not Found'
  });
});

app.listen(1234, () => {
  console.log('Server listening on http://localhost:1234');
});
