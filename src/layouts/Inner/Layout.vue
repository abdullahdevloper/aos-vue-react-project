<template>
  <v-container
    fluid
    class="fill-vuse-container inner-container"
  >
    <v-sheet
      class="overflow-hidden flex-x x-height rounded"
      :class="baseLayerClass"
    >
      <slot name="sidebar"></slot>
      <v-container
        fluid
        class="vuse-inner-content"
        :class="innerContentClass"
      >
        <v-sheet
          class="vuse-inner-content-wrap mb-2"
          :class="innerContainerClass"
          :width="innerContainerWidth"
        >
          <div class="inner-section">

            <slot name="header"></slot>

            <div
              class="scrollable-content"
              :class="scrollableSectionClass"
              v-if="hasContentSlot"
            >
              <slot name="content"></slot>
            </div>
            <slot />
          </div>
        </v-sheet>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {
    baseLayerClass: {
      type: String,
      default: ""
    },
    innerContentClass: {
      type: String,
      default: ""
    },
    innerContainerClass: {
      type: String,
      default: ""
    },
    innerContainerWidth: {
      type: String,
      default: "100%"
    },
    scrollableSectionClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasContentSlot() {
      return !!this.$slots["content"];
    }
  }
};
</script>