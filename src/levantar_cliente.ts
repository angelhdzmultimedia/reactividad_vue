import fetch from 'node-fetch';
import { exec } from 'child_process';

const temporizador = setInterval(async () => {
  try {
    const respuesta = await fetch('http://localhost:5000/api');
    const datos: any = await respuesta.json();
    if (datos.listo) {
      clearInterval(temporizador);
      exec('npm run start:cliente');
    }
  } catch (error) {
    // Ignorar
  }
}, 1000);
