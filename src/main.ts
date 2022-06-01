import express, { Application, Request, Response } from 'express';
import cors from 'cors';

let listo = false;
const app: Application = express();
app.use(express.json());
app.use(cors({}));

interface Usuario {
  nombre: string;
  email: string;
  id: string;
  esAdmin?: boolean;
}

app.use(express.static('public'));

const usuarios: Usuario[] = [
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

app.get('/api', (req: Request, res: Response) => {
  res.send({
    listo,
  });
});

app.get('/api/usuarios/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario: Usuario | undefined = usuarios.find((item) => item.id === id);
  if (usuario) {
    return res.status(200).send(usuario);
  } else {
    return res.status(404).send('Usuario no encontrado.');
  }
});

app.get('/api/usuarios', (req: Request, res: Response) => {
  res.send(usuarios);
});

app.put('/api/usuarios/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`ID: ${id}`);
  const body = req.body;
  const usuario: Usuario | undefined = usuarios.find((item) => item.id === id);

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

app.listen(5000, () => {
  listo = true;
  console.log('Servidor esta escuchando en puerto 5000...');
});
