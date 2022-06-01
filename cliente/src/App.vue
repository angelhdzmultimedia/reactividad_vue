<script setup lang="ts">
import { ref, onMounted } from 'vue';

const usuarios = ref([]);
const mensaje = ref('');
const usuarioSeleccionado = ref(null);

onMounted(async () => {
  const respuesta = await fetch('http://localhost:5000/api/usuarios');
  usuarios.value = await respuesta.json();
});

function seleccionarUsuario(usuario) {
  usuarioSeleccionado.value = usuario;
}
function esperar(segundos) {
  return new Promise((resolve) => {
    const temporizador = setTimeout(() => resolve(), segundos);
  });
}

async function onChange(usuario) {
  mensaje.value = 'Actualizando la base de datos...';
  // Esperar 2 segundos para apreciar la reactividad.
  // Eliminarlo para verlo en tiempo real.
  await esperar(2000);
  const respuesta = await fetch(
    `http://localhost:5000/api/usuarios/${usuario.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ esAdmin: usuario.esAdmin }),
    }
  );
  mensaje.value = 'Base de datos actualizada.';
  await esperar(2000);
  mensaje.value = '';
}
</script>

<template>
  <span style="color: green"> {{ mensaje }}</span>
  <h3>Usuarios</h3>
  <ul class="lista">
    <li
      @click="seleccionarUsuario(usuario)"
      class="usuario"
      v-for="usuario in usuarios"
      :key="usuario.id"
    >
      <span> {{ usuario.nombre }} </span>
      <span>{{ usuario.email }}</span>

      <div class="acciones">
        <label>Admin</label>
        <input
          @change="onChange(usuario)"
          v-model="usuario.esAdmin"
          type="checkbox"
        />
      </div>
    </li>
  </ul>
  <div class="usuario-seleccionado">
    <h3>Usuario Seleccionado</h3>
    <span v-if="!usuarioSeleccionado">No hay un usuario seleccionado.</span>
    <li class="usuario" v-if="usuarioSeleccionado !== null">
      <span> {{ usuarioSeleccionado.nombre }} </span>
      <span>{{ usuarioSeleccionado.email }}</span>

      <div class="acciones">
        <label>Admin</label>
        <input
          @change="onChange(usuarioSeleccionado)"
          v-model="usuarioSeleccionado.esAdmin"
          type="checkbox"
        />
      </div>
    </li>
    <button
      @click="usuarioSeleccionado = null"
      :disabled="!usuarioSeleccionado"
    >
      Deseleccionar
    </button>
  </div>
</template>

<style>
* {
  font-family: sans-serif;
}
.lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.usuario {
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: space-between;
  cursor: pointer;
}

.acciones {
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.6);
  padding: 4px;
}

.usuario-seleccionado {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
