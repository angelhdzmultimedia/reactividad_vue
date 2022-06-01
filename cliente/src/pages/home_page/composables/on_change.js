import { to } from './to';
import { esperar } from './esperar';

export async function onChange(usuario) {
  this.mensaje = 'Actualizando la base de datos...';
  // Esperar 2 segundos para apreciar la reactividad.
  // Eliminarlo para verlo en tiempo real.
  await esperar(2000);
  const { data, error } = await to(
    fetch(`http://localhost:5000/api/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ esAdmin: usuario.esAdmin }),
    })
  );

  if (!error) {
    this.mensaje = 'Base de datos actualizada.';
    await esperar(2000);
    this.mensaje = '';
  } else {
    this.mensaje = 'Error en servidor: ' + error;
  }
}
