export default (view) => {
  return () =>
    import(/* webpackChunkName: "[request]" */ `@/views/${view}.vue`);
};
