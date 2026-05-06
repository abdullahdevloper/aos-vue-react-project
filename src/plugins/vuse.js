import Vue from "vue";
import format from "date-fns/format";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  // The relative path of the components folder
  "../components/Stock",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Vuse[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

Vue.filter("twoDigits", (value) => {
  if (value.toString().length <= 1) {
    return "0" + value.toString();
  }
  return value.toString();
});

Vue.filter("firstChar", function(str) {
  return str.charAt(0).toUpperCase();
});
Vue.filter("first2Char", function(str) {
  return str !== undefined && str.substring(0, 2).toUpperCase();
});

Vue.filter("fulldate", function(value) {
  return format(value, "MMM dd, yyyy HH:mm");
});
Vue.filter("date", function(value) {
  return format(value, "MMM dd, yyyy");
});
