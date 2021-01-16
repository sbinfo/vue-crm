import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import currencyFilter from "./filters/currency.filter";
import messagePlugin from './plugins/message.plugin';
import Loader from "./components/app/Loader";
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('_date', dateFilter);
Vue.filter('_currency', currencyFilter);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyB8gLP6ZkVbhyfbeo6RxpggJU7dPyYveDw",
  authDomain: "vue-crm-e51ff.firebaseapp.com",
  databaseURL: "https://vue-crm-e51ff.firebaseio.com",
  projectId: "vue-crm-e51ff",
  storageBucket: "vue-crm-e51ff.appspot.com",
  messagingSenderId: "668345580096",
  appId: "1:668345580096:web:9ddfc18eefc4d1ffa93da5",
  measurementId: "G-S68D06V8FH"
});


let app;
firebase.auth().onAuthStateChanged(() => {
  
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }

});

