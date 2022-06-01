import { to } from './to';

export async function onHomePageMounted() {
  const { data, error } = await to(fetch('http://localhost:5000/api/usuarios'));
  if (!error) {
    this.usuarios = await data.json();
  } else {
    alert('Error en servidor: ' + error);
  }
}
