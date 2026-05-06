<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <basic-stats />
      <v-row>
        <sales-revenue />
        <orders-visits />
      </v-row>
      <v-row>
        <v-col>
          <latest-media-list />
        </v-col>
        <v-col>
          <blog-post-card class="mb-6" />
          <task-status />
        </v-col>
        <v-col>
          <ticket-check-list class="mb-6" />
          <members-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import BasicStats from "./Partials/BasicStats";
import SalesRevenue from "./Partials/SalesRevenue";
import OrdersVisits from "./Partials/OrdersVisits";
import TaskStatus from "@/views/Widgets/Stats/TaskStatus";
import LatestMediaList from "@/views/Widgets/List/LatestMediaList";
import BlogPostCard from "@/views/Widgets/Card/BlogPostCard";
import MembersList from "@/views/Widgets/List/MembersList";
import TicketCheckList from "@/views/Widgets/List/TicketCheckList";
export default {
  components: {
    BasicStats,
    SalesRevenue,
    TaskStatus,
    OrdersVisits,
    LatestMediaList,
    BlogPostCard,
    MembersList,
    TicketCheckList
  }
};
</script>
