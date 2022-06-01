import express from 'express';
import cors from 'cors';
import { Usuario } from './models/usuario/index.js';

let listo = false;
const app = express();
app.use(express.json());
app.use(cors({}));

async function middleware(req, res, next) {
  await Usuario.sync();
  setTimeout(() => next(), 1000);
}

app.get('/api', [middleware], (req, res) => {
  res.send({
    listo,
  });
});

app.get('/api/usuarios/:id', [middleware], async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ where: { id } });
  if (usuario) {
    return res.status(200).send(usuario);
  } else {
    return res.status(404).send('Usuario no encontrado.');
  }
});

app.post('/api/usuarios', [middleware], async (req, res) => {
  const body = req.body;
  const usuario = await Usuario.create(body);
  if (usuario) {
    return res.status(200).send(usuario);
  }
  return res.status(400).send('No se pudo crear usuario.');
});

app.get('/api/usuarios', [middleware], async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.send(usuarios);
});

app.put('/api/usuarios/:id', [middleware], async (req, res) => {
  const { id } = req.params;
  console.log(`ID: ${id}`);
  const body = req.body;
  const usuario = await Usuario.find({ where: { id } });

  if (usuario) {
    const usuarioActualizado = await usuario.update(body);
    return res.status(200).send(usuarioActualizado);
  } else {
    return res.status(404).send('Usuario no encontrado.');
  }
});

app.listen(5000, async () => {
  listo = true;
  console.log('Servidor esta escuchando en puerto 5000...');
});
