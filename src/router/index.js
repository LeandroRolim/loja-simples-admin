import Vue from "vue";
import VueRouter from "vue-router";
// import Store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Auth/LoginBase.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "categorias",
        name: "Category.list",
        component: () => import("../views/Admin/Category/CategoryTable.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.name !== "Login" && !Store.state.auth.isAuthenticated)
//     next({ name: "Login" });
//   else next();
// });
export default router;
