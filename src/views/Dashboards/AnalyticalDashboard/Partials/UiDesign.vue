<template>
  <v-col md="5">
    <v-card class="neu-glow">
      <v-card-text>
        <v-row class="flex-column my-5" justify="center" align="center">
          <v-progress-circular
            :rotate="90"
            :size="180"
            :width="20"
            :value="progress"
            color="pink lighten-3"
          >
            <v-row class="flex-column" justify="center" align="center">
              <v-btn fab class="neu-glow">
                <v-icon color="secondary">flash_on</v-icon>
              </v-btn>
              <span class="title mt-2">{{ progress }}</span>
            </v-row>
          </v-progress-circular>
          <v-sheet class="neu-glow mt-5 rounded">
            <v-list-item>
              <v-list-item-avatar class="neu-glow" :size="45">
                <v-icon color="cyan">emoji_events</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>UI Design Progress</v-list-item-title>
                <v-list-item-subtitle>Good progress!</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-sheet>
        </v-row>
        <v-sheet class=" py-3 neu-glow rounded">
          <v-row class="mx-0" v-if="ongoingTasks">
            <v-col
              cols="12"
              v-for="(task, i) in ongoingTasks"
              :key="`task-${task.title}-${i}`"
            >
              <linear-progress-content
                upside
                :value="task.completedPercentage"
                color="secondary"
              >
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
  </v-col>
</template>
<script>
import LinearProgressContent from "@/components/UI/ProgressBar/LinearProgressContent";
export default {
  components: { LinearProgressContent },
  data: () => {
    return {
      progress: 60,
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
    };
  },
  beforeDestroy() {
    this.ongoingTasks = null;
    delete this.ongoingTasks;
  },
};
</script>
