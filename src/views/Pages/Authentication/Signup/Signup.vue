<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
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
                      src="/static/illustator/welcome.png"
                      lazy-src="/static/illustator/welcome.png"
                    ></v-img>
                  </v-row>
                </v-col>
                <!-- 2 -->
                <v-col cols="12" md="6">
                  <div class="my-8 text-center">
                    <div class="text-h4"><b>Vuse</b> Admin</div>
                    <div class="text-subtitle-1">Create Account</div>
                  </div>
                  <v-sheet max-width="380" class="mx-auto" color="transparent">
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-text-field
                        color="purple darken-2"
                        label="Name"
                        v-model="form.name"
                        required
                        :error-messages="fieldErrors('form.name')"
                        @blur="$v.form.name.$touch()"
                        prepend-inner-icon="person"
                        solo
                        flat
                      ></v-text-field>
                      <v-text-field
                        :error-messages="fieldErrors('form.email')"
                        @input="$v.form.email.$touch()"
                        @blur="$v.form.email.$touch()"
                        prepend-inner-icon="email"
                        v-model="form.email"
                        label="Email"
                        solo
                        flat
                      />
                      <v-text-field
                        :error-messages="fieldErrors('form.password')"
                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPwd ? 'text' : 'password'"
                        @input="$v.form.password.$touch()"
                        @blur="$v.form.password.$touch()"
                        prepend-inner-icon="lock"
                        v-model="form.password"
                        label="Password"
                        @click:append="showPwd = !showPwd"
                        solo
                        flat
                      />
                      <v-text-field
                        type="password"
                        label="Confirm Password"
                        v-model="form.repeatPassword"
                        :error-messages="fieldErrors('form.repeatPassword')"
                        @input="$v.form.repeatPassword.$touch()"
                        @blur="$v.form.repeatPassword.$touch()"
                        prepend-inner-icon="enhanced_encryption"
                        required
                        solo
                        flat
                      ></v-text-field>
                      <v-checkbox
                        color="primary"
                        v-model="form.agreeToPolicy"
                        required
                      >
                        <div slot="label" @click.stop="() => {}">
                          Agree to
                          <v-btn-toggle
                            class="transparent blue--text"
                            @click.native.stop="dialog = !dialog"
                            >terms & privacy policy</v-btn-toggle
                          >.
                        </div>
                      </v-checkbox>
                      <v-btn block type="submit" :disabled="$v.$invalid"
                        >Sign Up</v-btn
                      >
                      <div class="text-center my-5">
                        Already have account ?
                        <router-link
                          to="/pages/authentication/login"
                          class="py-1 no-text-decoration"
                          >Login</router-link
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
// Validations
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  agreeToPolicy: false,
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      repeatPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      agreeToPolicy: { required },
    },
  },
  validationMessages: {
    form: {
      name: {
        required: "Name is required.",
      },
      email: {
        required: "Please enter email",
        email: "Email must be valid",
      },
      password: {
        required: "Please enter password",
        minLength: "Password must be of 6 characters",
      },
      repeatPassword: {
        sameAsPassword: "Password does not match",
      },
    },
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      showPwd: false,
      snackbar: false,
      dialog: false,
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
