import pinia from './plugins/pinia';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import './assets/styles/global.css';

const vuetify = createVuetify({
  components,
  directives,
})

export default (app) => {
  app.use(vuetify);
  app.use(pinia);
  app.use(Vue3Toastify, {
    autoClose: 2000,
  });
};