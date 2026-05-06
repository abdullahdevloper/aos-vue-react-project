<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="card_giftcard"
      :breadcrumbs="breadcrumbs"
    />
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <latest-media-list class="mb-6" />
          <ticket-check-list class="mb-6" />
        </v-col>
        <v-col cols="12" md="4">
          <author-list class="mb-6" />
          <transactions-list class="mb-6" />
          <todo-list />
        </v-col>
        <v-col cols="12" md="4">
          <members-list class="mb-6" />
          <best-seller-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AuthorList from "./AuthorList";
import BestSellerList from "./BestSellerList";
import LatestMediaList from "./LatestMediaList";
import MembersList from "./MembersList";
import TodoList from "./TodoList";
import TransactionsList from "./TransactionsList";
import TicketCheckList from "./TicketCheckList";
export default {
  components: {
    AuthorList,
    BestSellerList,
    LatestMediaList,
    MembersList,
    TodoList,
    TicketCheckList,
    TransactionsList,
  },
  data() {
    return {
      page: "List Widgets",
      breadcrumbs: [
        {
          text: "Widgets",
          disabled: false,
          to: {
            path: "/widgets/cards/basic",
          },
        },
        {
          text: "List",
          disabled: true,
        },
      ],
    };
  },
};
</script>
