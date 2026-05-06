<template>
  <v-card class="confirm-box">
    <v-card-title class="pb-0">
      <span class="margin-auto">{{title}}</span>
    </v-card-title>
    <v-card-text class="text-xs-center py-2">{{subtitle}}</v-card-text>
    <v-card-text class="py-0">
      <v-row>
        <v-col
          cols
          v-if="leftBtnTxt"
        >
          <v-btn
            block
            text
            @click.stop="leftBtnEvent"
          >{{leftBtnTxt}}</v-btn>
        </v-col>
        <v-col
          cols
          v-if="rightBtnTxt"
        >
          <v-btn
            block
            text
            @click.stop="rightBtnEvent"
            color="error"
          >{{rightBtnTxt}}</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: String,
    leftBtnTxt: String,
    rightBtnTxt: String,
    leftBtnEvent: Function,
    rightBtnEvent: Function,
  }
}
</script>