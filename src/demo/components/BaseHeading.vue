<template>
  <base-title>
    <template>
      <base-goto v-bind="$attrs"><slot /></base-goto>
    </template>
  </base-title>
</template>

<script>
export default {
  name: "BaseHeading"
};
</script>
