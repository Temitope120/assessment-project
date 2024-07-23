import { User } from "@/types";

export default {
  namespaced: true,
  state: () => ({
    user: {} as User,
  }),

  getters: {
    user: (state: any) => state.user,
  },
  mutations: {
    SET_USER: (state: any, data: User) => {
      state.user = data;
    },
  },
  actions: {},
};
