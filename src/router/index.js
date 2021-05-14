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
    component: () => import("../views/Admin"),
    children: [
      {
        path: "/",
        name: "admin.dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "/categorias",
        name: "admin.category",
        component: () => import("../views/Admin/Category/CategoryTable.vue"),
      },
      {
        path: "/users",
        name: "admin.user",
        component: () => import("../views/Admin/User/UserTable.vue"),
      },
      {
        path: "/coupons",
        name: "admin.coupon",
        component: () => import("../views/Admin/Coupon/CouponTable.vue"),
      },
      {
        path: "/products",
        name: "admin.product",
        component: () => import("../views/Admin/Product/ProductTable.vue"),
      },
      {
        path: "/brands",
        name: "admin.brand",
        component: () => import("../views/Admin/Brand/BrandTable.vue"),
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
