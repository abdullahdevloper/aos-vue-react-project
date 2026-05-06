<template>
  <v-list-item @click="onEdit(item)">
    <v-list-item-action @click.stop class="mr-5">
      <v-checkbox
        color="sidebar"
        hide-details
        v-model="item.selected"
      ></v-checkbox>
    </v-list-item-action>

    <v-list-item-avatar>
      <img v-bind:src="item.avatar" />
    </v-list-item-avatar>

    <v-list-item-content @click="onEdit(item)" class="ml-5">
      <v-list-item-title
        >{{ item.firstname }} {{ item.lastname }}</v-list-item-title
      >
    </v-list-item-content>

    <v-list-item-content @click="() => {}" class="hidden-sm-and-down">
      <v-list-item-title>{{ item.email }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-content @click="() => {}" class="hidden-md-and-down">
      <v-list-item-title>{{ item.phone }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action
      @click.stop="item.is_favourite = !item.is_favourite"
      class="compact-action"
    >
      <v-icon :color="item.is_favourite ? 'amber' : ''">{{
        item.is_favourite ? "star" : "star_border"
      }}</v-icon>
    </v-list-item-action>
    <v-list-item-action class="compact-action" @click.prevent>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon small class="content-ma-0" v-on="on">
            <v-icon small>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="onDelete(item)">
            <v-list-item-title>
              <v-icon left>delete</v-icon>Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: Object,
    onDelete: Function,
    onEdit: Function,
  },
};
</script>
