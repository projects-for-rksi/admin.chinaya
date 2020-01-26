import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      meta: {
        layout: "login"
      },
      component: () => import("../views/admin/Login.vue")
    },
    {
      path: "/panel",
      name: "panel",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/Main.vue")
    },
    {
      path: "/goods",
      name: "goods",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/Goods.vue")
    },
    {
      path: "/goods/:id",
      name: "about-goods",
      props: true,
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/AboutGoods.vue")
    },
    {
      path: "/orders",
      name: "orders",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/Orders.vue")
    },
    {
      path: "/sales",
      name: "sales",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/Sales.vue")
    },
    {
      path: "/about-order/:id",
      name: "about-order",
      props: true,
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/AboutOrder.vue")
    },
    {
      path: "/admin-control",
      name: "admin-control",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/AdminControl.vue")
    },
    {
      path: "/categories",
      name: "categories",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/Categories.vue")
    },
    {
      path: "/create-goods",
      name: "create-foods",
      meta: {
        layout: "panel",
        auth: true
      },
      component: () => import("../views/admin/CreateGoods.vue")
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/admin/404.vue")
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem("auth");
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authUser) {
    next("/");
  }
  if (to.path === "/" && authUser) {
    return next("/panel");
  }
  next();
});

export default router;
