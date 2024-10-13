const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Configura la dirección IP del ESP32 (ajusta según tu red)
const ESP32_IP = 'http://192.168.1.100'; // Cambia por la IP del ESP32 en tu red local

// Middleware para servir archivos estáticos
app.use(express.static('views'));

// Ruta para cambiar el color de un píxel
app.get('/set_pixel', async (req, res) => {
  const { x, y, r, g, b } = req.query;

  try {
    // Enviar una petición GET al ESP32 para actualizar el color del LED
    await axios.get(`${ESP32_IP}/set_pixel`, {
      params: { x, y, r, g, b }
    });

    res.send('LED actualizado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al controlar el LED');
  }
});

// Ruta para mostrar el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Ruta para activar el modo dinámico
app.get('/modo_dinamico', async (req, res) => {
  try {
    // Hacer una petición al ESP32 para activar el modo dinámico
    await axios.get(`${ESP32_IP}/modo_dinamico`);
    res.send('Modo dinámico activado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al activar el modo dinámico');
  }
});

// Servir archivos estáticos desde la carpeta "public"
app.use('/media', express.static('media'));

// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
