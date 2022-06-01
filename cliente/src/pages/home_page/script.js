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
  created() {
    this.campoUsuario = this.campoUsuarioDefault;
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
      campoUsuario: null,
    };
  },
  methods: {
    onHomePageMounted,
    onChange,
    seleccionarUsuario,
    crearUsuario,
  },
};
