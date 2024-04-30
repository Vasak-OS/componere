import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faUserPlus,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

const startApp = (channel: any) => {
  const app = createApp(App);
  library.add(faAngleLeft, faAngleRight, faUserPlus, faDownload);

  app.component('font-awesome-icon', FontAwesomeIcon);
  app.provide('vsk', channel.objects.vsk);
  app.use(createPinia());

  app.mount('#app');
};

// @ts-ignore
new QWebChannel(qt.webChannelTransport, startApp);
