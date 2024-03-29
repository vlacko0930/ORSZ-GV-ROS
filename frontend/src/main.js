import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFrown, faFlag, faHeading, faCity, faMars, faVenus, faPaw, faLeaf, faToolbox, faDoorOpen, faPlus, faSignature, faGamepad, faTerminal, faPlay, faInfo, faStar, faPoll } from "@fortawesome/free-solid-svg-icons";

library.add(faFrown, faFlag, faHeading, faCity, faMars, faVenus, faPaw, faLeaf, faToolbox, faDoorOpen, faPlus, faSignature, faGamepad, faTerminal, faPlay, faInfo, faStar, faPoll);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy,{
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  defaultFirstDayOfWeek: 1,
  defaultMonthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
  defaultDayNames: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  defaultToastPosition: 'is-bottom'
})

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
    debug: true,
    connection: '/',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: { } //Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
