import Vue from "vue";
import Vuex from "vuex";
import userModule from "./userModule";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vueXPersistLocal = new VuexPersistence({
  key: "claims-portal",
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    user: userModule,
  },
  plugins: [vueXPersistLocal.plugin],
});
