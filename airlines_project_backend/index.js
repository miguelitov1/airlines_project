const express = require('express');
const app = express();

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});