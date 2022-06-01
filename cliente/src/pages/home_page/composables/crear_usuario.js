import { to } from './to';

export async function crearUsuario() {
  const { data, error } = await to(
    fetch('http://localhost:5000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.campoUsuario),
    })
  );

  if (!error) {
  } else {
    alert(error);
  }
}
