import LazyLoad from "@/utils/AsyncRouteHelper";
import ApplicationRoutes from "./routes/applications";
import VuseRoutes from "./routes/vuse";
import VuetifyRoutes from "./routes/vuetify";
const AppSidebar = () =>
  import(
    /* webpackChunkName: "Vusenavs", webpackPreload: true */ "@/layouts/App/Sidebar"
  );
const AppToolbar = () =>
  import(
    /* webpackChunkName: "Vusenavs", webpackPreload: true */ "@/layouts/App/Toolbar"
  );
const AppFooter = () =>
  import(
    /* webpackChunkName: "Vusenavs",  webpackPreload: true */ "@/layouts/App/Footer"
  );

const AllRoutes = [...ApplicationRoutes, ...VuetifyRoutes, ...VuseRoutes];
const routes = AllRoutes.map((route) => {
  const { params, defaultComponentPath, navs } = route;
  const componentObj = navs
    ? {
        components: {
          default: LazyLoad(defaultComponentPath),
          sidebar: AppSidebar,
          header: AppToolbar,
          footer: AppFooter,
        },
      }
    : {
        component: LazyLoad(defaultComponentPath),
      };
  return {
    ...params,
    ...componentObj,
  };
});

export default [{ path: "/", redirect: "/dashboard/operational" }, ...routes];
