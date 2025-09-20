const express = require('express');
const app = express();
const port = 3000;

// Middleware para trabajar con JSON
app.use(express.json());

// Datos temporales simulando la BD
const usuarios = [];
const ejercicios = [
  { id: 1, nombre: 'Sentadillas', descripcion: 'Ejercicio de piernas', categoria: 'fuerza' },
  { id: 2, nombre: 'Correr', descripcion: 'Ejercicio de cardio', categoria: 'cardio' },
  { id: 3, nombre: 'Plancha', descripcion: 'Ejercicio de core', categoria: 'flexibilidad' }
];

const entrenamientos = [];

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a Workout Tracker API!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Listar todos los ejercicios
app.get('/ejercicios', (req, res) => {
  res.json(ejercicios);
});

// Obtener un ejercicio por ID
app.get('/ejercicios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ejercicio = ejercicios.find(e => e.id === id);

  if (!ejercicio) {
    return res.status(404).send('Ejercicio no encontrado');
  }
  res.json(ejercicio);
});

// Registro de usuario
app.post('/auth/register', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send('Faltan datos');
  }

  const nuevoUsuario = { id: usuarios.length + 1, nombre, email, password };
  usuarios.push(nuevoUsuario);

  res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
});

// Login simulado
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    return res.status(401).send('Credenciales incorrectas');
  }

  // Luego aquí generaremos JWT
  res.json({ mensaje: 'Login exitoso', usuario });
});

// Crear entrenamiento
app.post('/entrenamientos', (req, res) => {
  const { usuarioId, ejerciciosPlan, fecha, hora } = req.body;

  const nuevoEntrenamiento = {
    id: entrenamientos.length + 1,
    usuarioId,
    ejerciciosPlan, // [{ejercicioId, series, repeticiones, peso}]
    fecha,
    hora
  };

  entrenamientos.push(nuevoEntrenamiento);

  res.status(201).json({ mensaje: 'Entrenamiento creado', entrenamiento: nuevoEntrenamiento });
});

// Listar entrenamientos
app.get('/entrenamientos', (req, res) => {
  res.json(entrenamientos);
});

// Obtener entrenamiento por ID
app.get('/entrenamientos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entrenamiento = entrenamientos.find(e => e.id === id);

  if (!entrenamiento) {
    return res.status(404).send('Entrenamiento no encontrado');
  }
  res.json(entrenamiento);
});

// Actualizar entrenamiento
app.put('/entrenamientos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entrenamiento = entrenamientos.find(e => e.id === id);

  if (!entrenamiento) {
    return res.status(404).send('Entrenamiento no encontrado');
  }

  Object.assign(entrenamiento, req.body);
  res.json({ mensaje: 'Entrenamiento actualizado', entrenamiento });
});

// Eliminar entrenamiento
app.delete('/entrenamientos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = entrenamientos.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).send('Entrenamiento no encontrado');
  }

  entrenamientos.splice(index, 1);
  res.json({ mensaje: 'Entrenamiento eliminado' });
});

