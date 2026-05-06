<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="card_giftcard"
      :breadcrumbs="breadcrumbs"
    />
    <v-container fluid>
      <v-row>
        <v-col
          lg="3"
          md="6"
          v-for="(component, i) in row1Components"
          :key="`${component}-r1-${i}`"
        >
          <component :is="component" />
        </v-col>
        <v-col
          md="6"
          v-for="(component, i) in row2Components"
          :key="`${component}-r2-${i}`"
        >
          <component :is="component" />
        </v-col>
      </v-row>
      <!-- <expense-stats /> -->
    </v-container>
  </div>
</template>
<script>
import RevenueProfileBar from "./Bar/RevenueProfileBar";
import AnalyticIncomeExpense from "./Bar/AnalyticIncomeExpense";
import ProductComparisonBar from "./Bar/ProductComparisonBar";
import ProductSalesHorizBar from "./Bar/ProductSalesHorizBar";
import OrdersStackedLine from "./Line/OrdersStackedLine";
import NetProfitLine from "./Line/NetProfitLine";
// import Revenue from "./Revenue";
// import ExpenseStats from "./ExpenseStats/ExpenseStats";

export default {
  components: {
    // ExpenseStats,
    // Revenue,
    RevenueProfileBar,
    AnalyticIncomeExpense,
    ProductComparisonBar,
    ProductSalesHorizBar,
    OrdersStackedLine,
    NetProfitLine,
  },
  data() {
    return {
      page: "Analytical Widgets",
      breadcrumbs: [
        {
          text: "Widgets",
          disabled: false,
          to: {
            path: "/widgets/cards/basic",
          },
        },
        {
          text: "Analytical",
          disabled: true,
        },
      ],
      row1Components: [
        AnalyticIncomeExpense,
        RevenueProfileBar,
        ProductComparisonBar,
        ProductSalesHorizBar,
      ],
      row2Components: [OrdersStackedLine, NetProfitLine],
    };
  },
};
</script>
