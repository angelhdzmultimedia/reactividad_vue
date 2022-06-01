import {
  onChange,
  seleccionarUsuario,
  onHomePageMounted,
  crearUsuario,
} from './composables';

export default {
  name: 'HomePage',
  async mounted() {
    this.onHomePageMounted();
  },
  data() {
    return {
      usuarios: [],
      usuarioSeleccionado: null,
      mensaje: '',
      campoUsuarioDefault: {
        nombre: '',
        email: '',
        admin: false,
      },
      campoUsuario: this.campoUsuarioDefault,
    };
  },
  methods: {
    onHomePageMounted,
    onChange,
    seleccionarUsuario,
    crearUsuario,
  },
};
