<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8" lg="6">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <v-col
                  cols="12"
                  md="6"
                  class="pa-0"
                  v-if="$vuetify.breakpoint.mdAndUp"
                >
                  <v-sheet height="100%" color="transparent">
                    <v-row
                      align="center"
                      justify="center"
                      class="fill-height ma-0"
                    >
                      <v-img
                        :src="stepDetail.img"
                        :lazy-src="stepDetail.img"
                      ></v-img>
                    </v-row>
                  </v-sheet>
                </v-col>
                <!-- 2 -->
                <v-col cols="12" md="6" class="px-5 pos-relative">
                  <div class="mt-8 text-center">
                    <div class="text-h4"><b>Vuse</b> Admin</div>
                    <div class="text-subtitle-1">{{ stepDetail.title }}</div>
                    <div class="text-body-2">{{ stepDetail.subtitle }}</div>
                  </div>

                  <v-stepper
                    v-model="recoveryStep"
                    class="transparent clear-shadow"
                  >
                    <v-stepper-header class="hide">
                      <v-stepper-step :complete="recoveryStep > 1" step="1"
                        >1</v-stepper-step
                      >
                      <v-stepper-step :complete="recoveryStep > 2" step="2"
                        >2</v-stepper-step
                      >
                      <v-stepper-step step="3">3</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                      <v-stepper-content step="1" class="pa-0 ">
                        <send-otp
                          @next="recoveryStep = 2"
                          v-if="recoveryStep === 1"
                        />
                      </v-stepper-content>

                      <v-stepper-content step="2" class="pa-0">
                        <verify-otp
                          @next="recoveryStep = 3"
                          v-if="recoveryStep === 2"
                        />
                      </v-stepper-content>

                      <v-stepper-content step="3">
                        <reset-password
                          @complete="completeProcess()"
                          v-if="recoveryStep === 3"
                        />
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>

                  <v-btn
                    icon
                    absolute
                    top
                    right
                    to="/pages/authentication/login"
                  >
                    <v-icon small>close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Password Reset Successfully</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  components: {
    SendOtp: () => import("./Partials/SendOtp"),
    VerifyOtp: () => import("./Partials/VerifyOtp"),
    ResetPassword: () => import("./Partials/ResetPassword"),
  },
  data() {
    return {
      snackbar: false,
      recoveryStep: 1,
      stepsDetails: [
        {
          title: "Recover Your Account",
          subtitle: "Provide your e-mail address to reset your password",
          img: "/static/illustator/forgot_password.png",
        },
        {
          title: "Enter 5- Digit Code.",
          subtitle:
            "We've sent a 5-digit code to your email address. Input code below.",
          img: "/static/illustator/my_passcode.png",
        },
        {
          title: "Set New Password",
          subtitle: null,
          img: "/static/illustator/password.png",
        },
      ],
    };
  },
  computed: {
    stepDetail() {
      const index = this.recoveryStep - 1;
      return this.stepsDetails[index];
    },
  },
  methods: {
    completeProcess() {
      this.snackbar = true;
      this.$router.push({
        name: "pages/authentication/LoginPage",
      });
    },
  },
};
</script>
