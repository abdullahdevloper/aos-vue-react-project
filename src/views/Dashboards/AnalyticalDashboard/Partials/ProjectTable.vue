<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Projects</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow">
          <v-icon color="secondary">add</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-card-text class="pt-0">
      <v-data-table
        :headers="headers"
        :items="projects"
        hide-default-footer
        class="neu-glow-inset"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-avatar size="36px">
                <img :src="item.avatar" :alt="item.username" />
              </v-avatar>
            </td>
            <td>{{ item.name }}</td>
            <td class="text-xs-left">{{ item.deadline }}</td>
            <td class="text-xs-left">
              <v-progress-linear
                :value="item.progress"
                height="5"
                :color="item.color"
              >
              </v-progress-linear>
            </td>
            <td class="text-xs-left">
              <template v-for="(member, index) in item.members">
                <v-avatar size="25" :key="`member-${index}`">
                  <img :src="member.avatar" :alt="member.firstname" />
                </v-avatar>
              </template>
              <v-avatar color="grey" size="25" v-if="item.membesCount > 3">
                <span class="white--text">+{{ item.membesCount - 3 }}</span>
              </v-avatar>
            </td>
            <td class="text-xs-right">
              <v-btn icon color="grey">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { Projects } from "@/data/widgets/project";
export default {
  data() {
    return {
      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "avatar",
        },
        {
          text: "Name",
          align: "left",
          value: "name",
        },
        { text: "Deadline", value: "deadline" },
        { text: "Progress", value: "progress" },
        { text: "Members", value: "members", sortable: false },
        { text: "Action", value: "action", align: "right" },
      ],
    };
  },
  computed: {
    projects() {
      return Projects;
    },
  },
};
</script>
