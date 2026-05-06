<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      lg="3"
      v-for="(item, i) in basicStatisticArr"
      :key="`${item.title}-basicstats-${i}`"
    >
      <basic-statistic v-bind="item">
        <v-icon
          small
          v-bind="item.info.icon.style"
          v-text="item.info.icon.value"
        />
        <span
          class="ml-2"
          v-html="item.info.text.value"
          v-bind="item.info.text.style"
        ></span>
        <div v-if="item.info.text.subtext !== undefined">
          {{ item.info.text.subtext }}
        </div>
      </basic-statistic>
    </v-col>
  </v-row>
</template>
<script>
import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";

export default {
  data: () => {
    return {
      basicStatisticArr: [
        {
          title: "Sales",
          heading: "106K",
          avatar: {
            icon: "storefront",
            style: {
              color: "blue",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
          info: {
            icon: {
              value: "arrow_upward",
              style: {
                color: "teal accent-4",
              },
            },
            text: {
              value: `+4.25<sup>&#37;</sup>`,
              style: {
                class: "teal--text text--accent-4",
              },
              subtext: "Since last month",
            },
          },
        },
        {
          title: "New Users",
          heading: "3214",
          avatar: {
            icon: "people",
            style: {
              color: "amber darken-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
          info: {
            icon: {
              value: "arrow_upward",
              style: {
                color: "teal accent-4",
              },
            },
            text: {
              value: `+2.25<sup>&#37;</sup>`,
              style: {
                class: "teal--text text--accent-4",
              },
              subtext: "Since last month",
            },
          },
        },
        {
          title: "Traffic",
          heading: "350K",
          avatar: {
            icon: "import_export",
            style: {
              color: "pink accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
          info: {
            icon: {
              value: "arrow_upward",
              style: {
                color: "teal accent-4",
              },
            },
            text: {
              value: `+4.75<sup>&#37;</sup>`,
              style: {
                class: "teal--text text--accent-4",
              },
              subtext: "Since last month",
            },
          },
        },
        {
          title: "Performance",
          heading: "78.67%",
          avatar: {
            icon: "insert_chart_outlined",
            style: {
              color: "cyan",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
          info: {
            icon: {
              value: "arrow_upward",
              style: {
                color: "teal accent-4",
              },
            },
            text: {
              value: `+4.75<sup>&#37;</sup>`,
              style: {
                class: "teal--text text--accent-4",
              },
              subtext: "Since last month",
            },
          },
        },
      ],
    };
  },
  components: { BasicStatistic },
  beforeDestroy() {
    this.basicStatisticArr = null;
    delete this.basicStatisticArr;
  },
};
</script>
