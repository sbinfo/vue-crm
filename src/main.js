import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFiler from './filters/date.filter'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip - false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFiler)

const config = {
  apiKey: "AIzaSyB8gLP6ZkVbhyfbeo6RxpggJU7dPyYveDw",
  authDomain: "vue-crm-e51ff.firebaseapp.com",
  databaseURL: "https://vue-crm-e51ff.firebaseio.com",
  projectId: "vue-crm-e51ff",
  storageBucket: "vue-crm-e51ff.appspot.com",
  messagingSenderId: "668345580096",
  appId: "1:668345580096:web:dc1c9050b56e6f1da93da5",
  measurementId: "G-T498NQ3QJC"
}
firebase.initializeApp(config)

let app

firebase.auth().onAuthStateChanged(() => {

  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')  
  }
  
})


