<template>
  <v-img
    min-height="240"
    src="https://picsum.photos/id/823/851/315"
    class="unset-overflow profile-cover"
  >
    <!-- User Profile Img -->
    <v-row align="end" class="mx-0">
      <v-col class="pl-12 user-avatar-col" cols="6">
        <vuse-neu-avatar :src="user.avatar" glowClass="neu-glow-inset" />
      </v-col>
    </v-row>
    <!-- Other Features on Cover pic -->
    <v-row class="fill-height mx-0 with-radius">
      <!-- [Aligned-Start Item] Toolbar -->
      <v-col cols="12" class="align-self-start">
        <v-toolbar dense flat class="transparent" dark>
          <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">{{
            user.name
          }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>camera_alt</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>

      <!-- [Aligned-End Item] Add Button -->
      <v-col align="end" cols="12" class="align-self-end">
        <v-btn fab small class="mx-3">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-img>
</template>
<script>
export default {
  props: {
    user: Object,
  },
};
</script>
