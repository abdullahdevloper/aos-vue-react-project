<template>
  <v-card max-width="374" class="neu-glow">
    <v-card-title>Expense Stats</v-card-title>
    <v-sheet class="pa-3 transparent">
      <v-row class="mx-0" justify="center">
        <div class="text-h4 font-weight-bold">$ 5823</div>
      </v-row>
      <bar-chart
        :data="chartData.data"
        :options="chartData.options"
        style="height:100px"
      />
    </v-sheet>

    <v-card-text>
      <v-list rounded class="transparent" v-if="items">
        <v-list-item
          :class="item.color"
          v-for="(item, i) in items"
          :key="`${item.type}-${i}`"
        >
          <v-list-item-content>
            <div class="d-flex">
              <v-list-item-title>{{ item.type }}</v-list-item-title>
              <div>{{ item.amount }}</div>
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn rounded small>{{ item.stat }}</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from "@/components/ChartJS/BarChart";
import chartData from "./data";

export default {
  components: { BarChart },
  data() {
    return {
      items: [
        {
          type: "Cash",
          amount: "$750",
          stat: "+30%",
          color: "green lighten-4",
        },
        {
          type: "Online Shopping",
          amount: "$300",
          stat: "+20%",
          color: "red lighten-4",
        },
        {
          type: "Super Markets",
          amount: "$275",
          stat: "-10%",
          color: "purple lighten-4",
        },
        {
          type: "Restaurants",
          amount: "$145",
          stat: "+23%",
          color: "amber lighten-4",
        },
        {
          type: "Hotel",
          amount: "$142",
          stat: "+19%",
          color: "blue lighten-4",
        },
      ],
      chartData,
    };
  },
  beforeDestroy() {
    this.items = null;
    delete this.items;
  },
};
</script>
