import express from 'express';
import cors from 'cors';
import { Usuario } from './models/usuario/index.js';

let listo = false;
const app = express();
app.use(express.json());
app.use(cors({}));

const usuarios = [
  {
    nombre: 'Vue',
    id: '213912382193',
    email: 'vue@gmail.com',
    esAdmin: false,
  },
  {
    nombre: 'TypeScript',
    id: '435347574',
    email: 'typescript@gmail.com',
    esAdmin: false,
  },
  {
    nombre: 'Pinia',
    id: '3242384023',
    email: 'pinia@gmail.com',
    esAdmin: false,
  },
  {
    nombre: 'Express',
    id: '82883933',
    email: 'express@gmail.com',
    esAdmin: false,
  },
  {
    nombre: 'Mongoose',
    id: '435345345',
    email: 'mongoose@gmail.com',
    esAdmin: false,
  },
];

app.get('/api', (req, res) => {
  res.send({
    listo,
  });
});

app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((item) => item.id === id);
  if (usuario) {
    return res.status(200).send(usuario);
  } else {
    return res.status(404).send('Usuario no encontrado.');
  }
});

app.get('/api/usuarios', (req, res) => {
  res.send(usuarios);
});

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  console.log(`ID: ${id}`);
  const body = req.body;
  const usuario = usuarios.find((item) => item.id === id);

  if (usuario) {
    const index = usuarios.indexOf(usuario);

    usuarios[index] = {
      ...usuario,
      ...body,
    };
    return res.status(200).send(usuarios[index]);
  } else {
    return res.status(404).send('Usuario no encontrado.');
  }
});

app.listen(5000, async () => {
  listo = true;
  console.log('Servidor esta escuchando en puerto 5000...');
  await Usuario.sync();
  const usuario = await Usuario.findOne({
    where: { nombre: 'Angel' },
  });

  console.log(usuario);
});
