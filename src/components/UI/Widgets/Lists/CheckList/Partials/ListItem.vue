<template>
  <v-col class="d-flex neu-glow with-radius pos-relative flex-wrap" cols="12">
    <v-sheet
      width="5"
      max-height="50"
      height="100%"
      class="item-boarder align-self-center"
      v-if="tags.length"
      :color="tags[0].color"
    ></v-sheet>
    <div class="d-flex flex-1">
      <v-checkbox
        class="ma-0"
        :input-value="isChecked"
        @change="$emit('checked', $event)"
      ></v-checkbox>
      <div class="check-list-content">
        <div class="text-subtitle-2 mt-1">{{ title }}</div>
        <div class="text-body-2" v-html="body"></div>
        <div v-if="tags.length && showTags">
          <v-chip
            :class="i > 0 ? 'ma-2' : 'my-2 mr-2'"
            :color="tag.color"
            :text-color="tag.textColor"
            small
            v-for="(tag, i) in tags"
            :key="`${tag.name}-tag-${i}`"
          >
            {{ tag.name }}
          </v-chip>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list class="with-radius neu-glow" dense>
          <v-list-item v-for="(item, i) in menuItems" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-col>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    showTags: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isChecked: this.isCompleted,
      menuItems: [
        { title: "Edit" },
        { title: "Move to Archive" },
        { title: "Delete" },
      ],
    };
  },
};
</script>

<style scoped>
.item-boarder {
  position: absolute;
  left: 0;
}
</style>
