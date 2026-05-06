<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-text>
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="pa-0">{{ title }}</v-card-title>
        <div v-if="filterable">
          <v-btn
            x-small
            class="ml-2"
            rounded
            :color="isACtiveTaskList ? 'primary' : ''"
            @click="isACtiveTaskList = true"
            >{{ activeTasksCount }} Active Tasks</v-btn
          >
          <v-btn
            x-small
            class="ml-2"
            rounded
            @click="isACtiveTaskList = false"
            :color="!isACtiveTaskList ? 'primary' : ''"
            >{{ completedTasksCount }} Completed Tasks</v-btn
          >
        </div>
      </v-row>
    </v-card-text>
    <v-text-field
      v-if="enableCreateNew"
      :placeholder="inputPlaceholder"
      hide-details
      class="mx-4 neu-input"
      v-model="taskInput"
      v-on:keyup.enter="addTask"
    ></v-text-field>

    <v-card-text>
      <v-row class="mx-0" align="start" justify="space-between">
        <template v-for="(item, i) in renderList">
          <list-item
            v-bind="item"
            :key="`${item.title}-todo-${i}`"
            @checked="handleChecked($event, item)"
            :class="i < renderList.length - 1 ? 'mb-4' : ''"
            :showTags="showTags"
          />
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItem from "./Partials/ListItem";

const taskSchema = {
  title: "Gather API requirement",
  body: "",
  isCompleted: false,
  tags: [],
};

export default {
  components: { ListItem },
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    enableCreateNew: {
      type: Boolean,
      default: false,
    },
    inputPlaceholder: {
      type: String,
      default: "Add New",
    },
    showTags: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isACtiveTaskList: true,
      renderAll: this.filterable,
      tasks: this.list,
      taskInput: "",
    };
  },
  methods: {
    handleChecked(val, item) {
      item.isCompleted = val;
    },
    addTask() {
      if (this.taskInput.length) {
        this.tasks.unshift({
          ...taskSchema,
          title: this.taskInput,
        });
        this.taskInput = "";
      }
    },
  },
  computed: {
    completedTasksCount() {
      return this.tasks.filter((item) => item.isCompleted).length;
    },
    activeTasksCount() {
      return this.tasks.length - this.completedTasksCount;
    },
    renderList() {
      if (!this.renderAll) {
        return this.tasks;
      } else {
        return this.tasks.filter(
          (item) => item.isCompleted !== this.isACtiveTaskList
        );
      }
    },
  },
};
</script>
