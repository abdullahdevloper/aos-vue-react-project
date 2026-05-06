// Authentication Pages

export default [
  {
    params: {
      path: "/dashboard/operational",
      name: "dashboard/Operational",
    },
    defaultComponentPath:
      "Dashboards/OperationalDashboard/OperationalDashboard",
    navs: true,
  },
  {
    params: {
      path: "/dashboard/analytical",
      name: "dashboard/Analytical",
    },
    defaultComponentPath: "Dashboards/AnalyticalDashboard/AnalyticalDashboard",
    navs: true,
  },
  //
  {
    params: {
      path: "/pages/profile",
      name: "ProfileView",
    },
    defaultComponentPath: "Pages/Profile/Profile",
    navs: true,
  },
  {
    params: {
      path: "/pages/authentication/login",
      name: "pages/authentication/LoginPage",
      meta: { layout: "auth" },
    },
    defaultComponentPath: "Pages/Authentication/Login/Login",
  },
  {
    params: {
      path: "/pages/authentication/forgot-password",
      name: "pages/authentication/ForgotPasswordPage",
      meta: { layout: "auth" },
    },
    defaultComponentPath: "Pages/Authentication/ForgotPassword/ForgotPassword",
  },
  {
    params: {
      path: "/pages/authentication/signup",
      name: "pages/authentication/SignupPage",
      meta: { layout: "auth" },
    },
    defaultComponentPath: "Pages/Authentication/Signup/Signup",
  },
  {
    params: {
      path: "/pages/authentication/lock-screen",
      name: "pages/authentication/LockScreenPage",
      meta: { layout: "auth" },
    },
    defaultComponentPath: "Pages/Authentication/LockScreen/LockScreen",
  },
  {
    params: {
      path: "/pages/coming-soon",
      name: "ComingSoon",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/ComingSoon",
  },
  {
    params: {
      path: "/pages/under-maintenance",
      name: "MaintenancePage",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/Maintenance",
  },
  {
    params: {
      path: "/pages/error/404",
      name: "pages/error/Error404",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/Errors/Error404",
  },
  {
    params: {
      path: "/pages/error/500",
      name: "pages/error/Error500",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/Errors/Error500",
  },
  {
    params: {
      path: "/charts/chartjs",
      name: "charts/ChartJs",
    },
    defaultComponentPath: "Charts/ChartJs",
    navs: true,
  },
  {
    params: {
      path: "/charts/spark-line",
      name: "charts/SparkLine",
    },
    defaultComponentPath: "Charts/SparkLine",
    navs: true,
  },
  {
    params: {
      path: "/widgets/lists",
      name: "widgets/ListWidgets",
    },
    defaultComponentPath: "Widgets/List/index",
    navs: true,
  },
  {
    params: {
      path: "/widgets/card",
      name: "widgets/CardWidgets",
    },
    defaultComponentPath: "Widgets/Card/index",
    navs: true,
  },
  {
    params: {
      path: "/widgets/document-cards",
      name: "widgets/DocumentWidgets",
    },
    defaultComponentPath: "Widgets/Documents/index",
    navs: true,
  },
  {
    params: {
      path: "/widgets/statistic",
      name: "widgets/StatisticWidgets",
    },
    defaultComponentPath: "Widgets/Stats/index",
    navs: true,
  },
  {
    params: {
      path: "/widgets/analytical",
      name: "widgets/ChartWidgets",
    },
    defaultComponentPath: "Widgets/Chart/index",
    navs: true,
  },
  {
    params: {
      path: "/forms",
      name: "Forms",
    },
    defaultComponentPath: "Forms/Forms",
    navs: true,
  },
  {
    params: {
      path: "*",
      name: "PageNotFound",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Pages/Errors/Error404",
  },
];
