<template>
  <v-card class="neu-glow">
    <v-card-title>Task Status</v-card-title>
    <v-card-text>
      <v-card-subtitle class="pa-0">On Going</v-card-subtitle>
      <v-sheet class="py-3 neu-glow rounded">
        <v-row class="mx-0">
          <v-col
            cols="12"
            v-for="(task, i) in ongoingTasks"
            :key="`task-${task.title}-${i}`"
          >
            <linear-progress-content upside :value="task.completedPercentage">
              <v-col class="pa-0 text-caption" align-self="start" cols="6">
                {{ task.title }}
              </v-col>
              <v-col
                align-self="end"
                cols="6"
                class="text-right pa-0 text-caption"
              >
                {{ task.timeline }}
              </v-col>
            </linear-progress-content>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <v-card-subtitle class="pa-0">Upcomig</v-card-subtitle>
      <v-sheet class="py-3 neu-glow rounded">
        <v-row class="mx-0">
          <v-col
            cols="12"
            v-for="(task, i) in upcomingTasks"
            :key="`task-${task.title}-${i}`"
          >
            <linear-progress-content upside :value="task.completedPercentage">
              <v-col class="pa-0 text-caption" align-self="start" cols="6">
                {{ task.title }}
              </v-col>
              <v-col
                align-self="end"
                cols="6"
                class="text-right pa-0 text-caption"
              >
                {{ task.timeline }}
              </v-col>
            </linear-progress-content>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import LinearProgressContent from "@/components/UI/ProgressBar/LinearProgressContent";
export default {
  components: { LinearProgressContent },
  data() {
    return {
      ongoingTasks: [
        {
          title: "Sketch File",
          timeline: "4 weeks",
          completedPercentage: 80,
        },
        {
          title: "Adobe XD File",
          timeline: "3 weeks",
          completedPercentage: 70,
        },
        {
          title: "UI Implementation",
          timeline: "6 weeks",
          completedPercentage: 86,
        },
      ],
      upcomingTasks: [
        {
          title: "Upgrade Vuetify",
          timeline: "5 weeks",
          completedPercentage: 25,
        },
        {
          title: "Update Vue.js Version",
          timeline: "3 weeks",
          completedPercentage: 33,
        },
        {
          title: "Deployment",
          timeline: "2 weeks",
          completedPercentage: 2,
        },
      ],
    };
  },
};
</script>
