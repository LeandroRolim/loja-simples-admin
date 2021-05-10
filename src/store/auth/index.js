import http from "../../plugins/http";

const store = {
  state: {
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    setAuthenticated: (state, value) => (state.isAuthenticated = value),
    setUser: (state, value) => (state.user = value),
  },
  actions: {
    checkUser(context) {
      http.get("api/user").then((res) => {
        if (res.status === 200) {
          context.commit("setUser", res.data);
          context.commit("setAuthenticated", true);
        }
      });
    },
    async login(context, payload) {
      await http.get("sanctum/csrf-cookie").then(() => {
        http
          .post("login", {
            email: payload.email,
            password: payload.password,
          })
          .then((res) => {
            if (res.status === 200) {
              context.commit("setAuthenticated", true);
              context.dispatch("checkUser");
            } else {
              context.commit("setAuthenticated", false);
            }
          })
          .catch((error) => (this.errors = error.response.data.errors || {}));
      });
    },
    logout(context) {
      http.post("logout").then(({ status }) => {
        if (status >= 200 && status < 300) {
          context.commit("setAuthenticated", false);
          context.commit("setUser", {});
        }
      });
    },
  },
};
export default store;
