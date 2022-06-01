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
      campoUsuario: {
        nombre: '',
        email: '',
        admin: false,
      },
    };
  },
  methods: {
    onHomePageMounted,
    onChange,
    seleccionarUsuario,
    crearUsuario,
  },
};
