import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehviour(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
