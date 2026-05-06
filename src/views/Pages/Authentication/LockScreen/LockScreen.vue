<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <!-- 1 -->
                <v-col
                  cols="12"
                  md="6"
                  class="pa-0"
                  v-if="$vuetify.breakpoint.mdAndUp"
                >
                  <v-row
                    align="center"
                    justify="center"
                    class="fill-height ma-0"
                  >
                    <v-img
                      src="/static/illustator/unlock.png"
                      lazy-src="/static/illustator/unlock.png"
                    ></v-img>
                  </v-row>
                </v-col>
                <!-- 2 -->
                <v-col cols="12" md="6">
                  <div
                    class="my-8 d-flex justify-center flex-column align-center"
                  >
                    <div class="text-h4"><b>Vuse</b> Admin</div>
                    <div class="text-subtitle-1">Hello, Welcome Back</div>
                    <div class="title primary--text">{{ user.name }}</div>
                    <vuse-neu-avatar
                      :src="user.avatar"
                      glowClass="neu-glow-inset"
                    />
                  </div>
                  <v-sheet max-width="380" class="mx-auto" color="transparent">
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-text-field
                        :error-messages="fieldErrors('form.password')"
                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPwd ? 'text' : 'password'"
                        @input="$v.form.password.$touch()"
                        @blur="$v.form.password.$touch()"
                        prepend-inner-icon="vpn_key"
                        v-model="form.password"
                        label="Password"
                        @click:append="showPwd = !showPwd"
                        solo
                        flat
                      />

                      <v-btn block type="submit" :disabled="$v.$invalid"
                        >Sign In</v-btn
                      >
                      <div class="text-center my-5">
                        Not {{ user.name }} ?
                        <router-link
                          to="/pages/authentication/login"
                          class="py-1 no-text-decoration"
                          >Login with different account</router-link
                        >
                      </div>
                    </v-form>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Signed In Successfully</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { authUser } from "@/data/dummyData";
const defaultForm = {
  password: "",
  rememberMe: false,
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  validationMessages: {
    form: {
      password: {
        required: "Please enter password",
        minLength: "Password must be of 6 characters",
      },
    },
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      showPwd: false,
      snackbar: false,
      user: authUser,
    };
  },
  methods: {
    submit() {
      this.snackbar = true;
      this.resetForm();
      this.$v.$reset();
      setTimeout(() => {
        this.$router.push({
          name: "dashboard/operational",
        });
      }, 2000);
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
    },
  },
};
</script>
