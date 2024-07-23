import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FormView from "@/views/FormView.vue";
import { getUserDataById } from "@/core/getUserDataById";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:userId",
    name: "form",
    component: FormView,
    beforeEnter: (to, from, next) => {
      // TODO load the user data from getUserDataById and store it with VueX
      const userId = to.params.userId;
      getUserDataById(userId)
        .then((res) => {
          const user = res[0];
          store.commit("user/SET_USER", user);
        })
        .catch((err) => {
          console.log(err, "error");
        });
      next();
    },
  },
  {
    path: "/",
    name: "form",
    component: FormView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
