import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'
import Loader from "@/components/app/Loader";
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)



firebase.initializeApp({
  apiKey: "AIzaSyDzB89HfbTO0fqcnkxZsLWgjs4_IU8lVB0",
  authDomain: "vue-crm-fd2a0.firebaseapp.com",
  databaseURL: "https://vue-crm-fd2a0-default-rtdb.firebaseio.com/",
  projectId: "vue-crm-fd2a0",
  storageBucket: "vue-crm-fd2a0.appspot.com",
  messagingSenderId: "988438075261",
  appId: "1:988438075261:web:f0e6c551d29306ede45e14",
  measurementId: "G-FPE91E2CRH"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


