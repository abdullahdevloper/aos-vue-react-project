import colors from "vuetify/lib/util/colors";

export default {
  data: {
    labels: ["Cash", "Online", "SuperMarkets", "Restaurants", "Hotels"],
    datasets: [
      {
        label: "This Month",
        data: [15, 10, 8, 14, 12],
        barThickness: 10,
        backgroundColor: [
          colors.green.base,
          colors.red.base,
          colors.purple.base,
          colors.amber.base,
          colors.blue.base,
        ],
      },
      {
        label: "Last Month",
        data: [10, 8, 10, 8, 9],
        barThickness: 10,
        backgroundColor: [
          colors.green.lighten4,
          colors.red.lighten4,
          colors.purple.lighten4,
          colors.amber.lighten4,
          colors.blue.lighten4,
        ],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 15,
          },
        },
      ],
    },
  },
};
