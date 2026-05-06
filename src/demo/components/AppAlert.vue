<template>
  <v-alert
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
    :type="value"
    border="left"
    class="application-alert mb-4"
    colored-border
    value
  >
    <base-markdown>
      <slot />
    </base-markdown>
  </v-alert>
</template>

<script>
export default {
  name: "AppAlert",

  props: {
    value: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.application-alert {
  p {
    margin: 0 !important;
  }
}
</style>
