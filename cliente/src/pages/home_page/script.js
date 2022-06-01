import { onChange, seleccionarUsuario, onHomePageMounted } from './composables';

export default {
  name: 'HomePage',
  async mounted() {
    this.onHomePageMounted();
  },
  data() {
    return {
      onHomePageMounted,
      usuarios: [],
      usuarioSeleccionado: null,
      mensaje: '',
    };
  },
  methods: {
    onChange,
    seleccionarUsuario,
  },
};
