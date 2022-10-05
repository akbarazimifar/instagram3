import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import moment from 'moment';
import ResizeTextarea from 'resize-textarea-vue3';
import { Preferences } from '@capacitor/preferences';

import users from './services/UserService';
import posts from './services/PostService';

/* Components */
import BaseLayout from './components/basics/BaseLayout.vue';
import LoadSpinner from './components/basics/LoadSpinner.vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.scss';
import './theme/connect.scss';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(ResizeTextarea);

  app.component('base-layout', BaseLayout);
  app.component('load-spinner', LoadSpinner);

  moment.locale('fr');
  app.config.globalProperties.$moment = moment;
  app.config.globalProperties.$Preferences = Preferences;
  app.config.globalProperties.$users = users;
  app.config.globalProperties.$posts = posts;
  
router.isReady().then(() => {
  app.mount('#app');
});