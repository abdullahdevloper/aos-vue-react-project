<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="card_giftcard"
      :breadcrumbs="breadcrumbs"
    />
    <v-container fluid>
      <v-row v-if="columnarStatsData">
        <v-col
          xs="12"
          sm="6"
          md="4"
          lg="2"
          v-for="(item, i) in columnarStatsData"
          :key="`${item.title}-single-col-${i}`"
        >
          <columnar-statistic v-bind="item" />
        </v-col>
      </v-row>
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
      <v-row v-if="basicStatisticArr">
        <v-col
          cols="12"
          sm="6"
          lg="3"
          v-for="(item, i) in basicStatisticArr"
          :key="`${item.title}-basicstats-${i}`"
        >
          <basic-statistic v-bind="item">
            <v-icon small>trending_up</v-icon>
            <span class="ml-2">+3.49<sup>&#37;</sup></span>
          </basic-statistic>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <basic-statistic
            title="Customers"
            heading="52K"
            :avatar="{
              icon: 'person',
              style: {
                color: 'blue accent-3',
              },
              avatarStyle: { class: 'neu-glow', size: 50 },
            }"
          >
            <div class="my-2">
              <span>48K more to goal</span>
            </div>
            <v-progress-linear
              value="52"
              color="blue accent-3"
            ></v-progress-linear>
          </basic-statistic>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <basic-statistic
            title="Closed Tickets"
            heading="78"
            :avatar="{
              icon: 'confirmation_number',
              style: {
                color: 'pink lighten-1',
              },
              avatarStyle: { size: 50, tile: true },
            }"
          >
            <div class="my-2">
              <span>32 To goal</span>
            </div>
            <v-progress-linear
              value="78"
              color="pink lighten-1"
            ></v-progress-linear>
          </basic-statistic>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <basic-statistic
            title="Downloads"
            heading="80K"
            :avatar="{
              icon: 'cloud_download',
              style: {
                color: 'cyan accent-3',
              },
              avatarStyle: { class: 'neu-glow', size: 50 },
            }"
          >
            <div class="my-2">
              <span>20K more to goal</span>
            </div>
            <v-progress-linear
              value="80"
              color="cyan accent-3"
            ></v-progress-linear>
          </basic-statistic>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <basic-statistic
            title="Visits"
            heading="68K"
            :avatar="{
              icon: 'outlined_flag',
              style: {
                color: 'green accent-3',
              },
              avatarStyle: { class: 'neu-glow', size: 50 },
            }"
          >
            <div class="my-2">
              <span>32K more to goal</span>
            </div>
            <v-progress-linear
              value="68"
              color="green accent-3"
            ></v-progress-linear>
          </basic-statistic>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <task-status />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ColumnarStatistic from "@/components/UI/Widgets/Cards/Statistics/ColumnarStatistic";
import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";
import TaskStatus from "./TaskStatus";
export default {
  components: { ColumnarStatistic, BasicStatistic, TaskStatus },
  data() {
    return {
      page: "Stats Widgets",
      breadcrumbs: [
        {
          text: "Widgets",
          disabled: false,
          to: {
            path: "/widgets/cards/basic",
          },
        },
        {
          text: "Stats",
          disabled: true,
        },
      ],
      columnarStatsData: [
        {
          title: "Total Orders",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "local_mall",
                style: {
                  color: "teal accent-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "36K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "teal accent-3", class: "mr-2" },
                },
                text: "+2.75<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Total Views",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "visibility",
                style: {
                  color: "purple accent-3",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "78K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "cyan accent-3", class: "mr-2" },
                },
                text: "+9.15<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Likes",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "favorite",
                style: {
                  color: "pink lighten-2",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "84K",
              subheading: {
                icon: {
                  name: "trending_up",
                  style: { color: "pink accent-3", class: "mr-2" },
                },
                text: "+7.75<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Comments",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "comment",
                style: {
                  color: "blue accent-2",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "60K",
              subheading: {
                icon: {
                  name: "trending_down",
                  style: { color: "blue accent-3", class: "mr-2" },
                },
                text: "-3.80<sup>&#37;</sup>",
              },
            },
          ],
        },
        {
          title: "Reviews",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "sentiment_satisfied_alt",
                style: {
                  color: "green accent-3",
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
          title: "Return",
          items: [
            {
              cols: 12,
              avatar: {
                icon: "assignment_return",
                style: {
                  color: "red lighten-2",
                },
                avatarStyle: { class: "neu-glow", size: 70 },
              },
              heading: "02",
              subheading: {
                icon: {
                  name: "trending_down",
                  style: { color: "red lighten-3", class: "mr-2" },
                },
                text: "0.12<sup>&#37;</sup>",
              },
            },
          ],
        },
      ],
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
      basicStatisticArr: [
        {
          title: "Users",
          heading: "106K",
          avatar: {
            icon: "person",
            style: {
              class: "blue--text text--accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
        },
        {
          title: "Orders",
          heading: "158K",
          avatar: {
            icon: "local_mall",
            style: {
              color: "teal accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
        },
        {
          title: "CUP Usage",
          heading: "78%",
          avatar: {
            icon: "memory",
            style: {
              color: "indigo accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
        },
        {
          title: "Weekly Income",
          heading: "$750",
          avatar: {
            icon: "monetization_on",
            style: {
              color: "amber darken-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 },
          },
        },
      ],
    };
  },
  beforeDestroy() {
    this.columnarStatsData = null;
    this.twoColumnarStatsData = null;
    this.basicStatisticArr = null;
    delete this.columnarStatsData;
    delete this.twoColumnarStatsData;
    delete this.basicStatisticArr;
  },
};
</script>
