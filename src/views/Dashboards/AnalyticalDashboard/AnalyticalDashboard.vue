<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <basic-stats />

      <v-row>
        <sales-revenue />
        <ui-design />
      </v-row>
      <v-row>
        <v-col cols="12">
          <two-cols-stats />
        </v-col>
        <v-col cols="12">
          <project-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import BasicStats from "./Partials/BasicStats";
import SalesRevenue from "./Partials/SalesRevenue";
import UiDesign from "./Partials/UiDesign";
import ProjectTable from "./Partials/ProjectTable";
import TwoColsStats from "./Partials/TwoColsStats";
export default {
  components: {
    BasicStats,
    SalesRevenue,
    UiDesign,
    ProjectTable,
    TwoColsStats
  }
};
</script>
