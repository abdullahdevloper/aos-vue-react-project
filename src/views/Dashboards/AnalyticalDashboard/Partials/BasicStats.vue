<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <basic-statistic
        title="Customers"
        heading="52K"
        :avatar='{
            icon: "person",
            style: {
              color: "blue accent-3"
            },
            avatarStyle: { class: "neu-glow", size: 50 }
          }'
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

    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <basic-statistic
        title="Closed Tickets"
        heading="78"
        :avatar='{
            icon: "confirmation_number",
            style: {
              color: "pink lighten-1",
            },
            avatarStyle: { class: "neu-glow", size: 50 }
          }'
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

    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <basic-statistic
        title="Downloads"
        heading="80K"
        :avatar='{
            icon: "cloud_download",
            style: {
              color: "cyan accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 }
          }'
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

    <v-col
      cols="12"
      sm="6"
      lg="3"
    >
      <basic-statistic
        title="Visits"
        heading="68K"
        :avatar='{
            icon: "outlined_flag",
            style: {
              color: "green accent-3",
            },
            avatarStyle: { class: "neu-glow", size: 50 }
          }'
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
</template>
<script>
import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";
export default {
  components: { BasicStatistic }
};
</script>