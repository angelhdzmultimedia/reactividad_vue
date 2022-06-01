import fetch from 'node-fetch';
import { exec } from 'child_process';

const temporizador = setInterval(async () => {
  try {
    const respuesta = await fetch('http://localhost:5000/api');
    const datos = await respuesta.json();
    if (datos.listo) {
      console.log('Levantando cliente...');
      clearInterval(temporizador);
      exec('npm run connect:cliente');
    }
  } catch (error) {
    // Ignorar
  }
}, 1000);
