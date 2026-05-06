<template>
  <v-row v-if="twoColumnarStatsData">
    <v-col
      cols="12"
      sm="6"
      lg="3"
      v-for="(item, i) in twoColumnarStatsData"
      :key="`${item.title}-two-col-${i}`"
    >
      <columnar-statistic v-bind="item" />
    </v-col>
  </v-row>
</template>
<script>
import ColumnarStatistic from "@/components/UI/Widgets/Cards/Statistics/ColumnarStatistic";
export default {
  components: { ColumnarStatistic },
  data: () => {
    return {
      twoColumnarStatsData: [
        {
          title: "Users",
          items: [
            {
              cols: 6,
              avatar: {
                icon: "phone_iphone",
                style: {
                  color: "purple lighten-1",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "46K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "green accent-3", class: "mr-2" },
                },
                text: "+2.75<sup>&#37;</sup>",
              },
            },
            {
              cols: 6,
              avatar: {
                icon: "desktop_mac",
                style: {
                  color: "yellow darken-2",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "42K",
              subheading: {
                icon: {
                  name: "trending_down",
                  style: { color: "red accent-3", class: "mr-2" },
                },
                text: "-3.25<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Happy Customers",
          items: [
            {
              cols: 6,
              avatar: {
                icon: "favorite",
                style: {
                  color: "pink accent-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "84K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "pink accent-3", class: "mr-2" },
                },
                text: "+2.75<sup>&#37;</sup>",
              },
            },
            {
              cols: 6,
              avatar: {
                icon: "sentiment_satisfied_alt",
                style: {
                  color: "yellow darken-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "35K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "green accent-3", class: "mr-2" },
                },
                text: "+9.10<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Tickets",
          items: [
            {
              cols: 6,
              avatar: {
                icon: "playlist_add",
                style: {
                  color: "light-blue accent-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "12K",
              subheading: {
                text: "Created",
              },
            },
            {
              cols: 6,
              avatar: {
                icon: "playlist_add_check",
                style: {
                  color: "green accent-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "35K",
              subheading: {
                text: "Completed",
              },
            },
          ],
        },
        {
          title: "UI Users",
          items: [
            {
              cols: 6,
              avatar: {
                src: "/static/brands/sketch.png",
                avatarStyle: { size: 70, tile: true },
              },
              heading: "82K",
              subheading: {
                icon: {
                  name: "favorite",
                  style: {
                    color: "pink",
                    class: "mr-2",
                  },
                },
                text: "Likes",
              },
            },
            {
              cols: 6,
              avatar: {
                src: "/static/brands/AdobeXD.png",
                avatarStyle: { size: 70, tile: true },
              },
              heading: "78K",
              subheading: {
                icon: {
                  name: "favorite",
                  style: {
                    color: "pink",
                    class: "mr-2",
                  },
                },
                text: "Likes",
              },
            },
          ],
        },
      ],
    };
  },
  beforeDestroy() {
    this.twoColumnarStatsData = null;
    delete this.twoColumnarStatsData;
  },
};
</script>
