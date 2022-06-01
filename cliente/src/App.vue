<script>
export default {
  name: 'App',
  async mounted() {
    alert('mounted');
      const respuesta = await fetch('http://localhost:5000/api/usuarios');
    this.usuarios = await respuesta.json();
  },
  data() {
    return {
      usuarios: [],
      usuarioSeleccionado: null,
      mensaje: '',
    };
  },
  methods: {
    seleccionarUsuario(usuario) {
      this.usuarioSeleccionado = usuario;
    },
    esperar(segundos) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), segundos);
      });
    },
    async onChange(usuario) {
      this.mensaje = 'Actualizando la base de datos...';
      // Esperar 2 segundos para apreciar la reactividad.
      // Eliminarlo para verlo en tiempo real.
      await this.esperar(2000);
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
      this.mensaje = 'Base de datos actualizada.';
      await this.esperar(2000);
      this.mensaje = '';
    },
  },
};
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
