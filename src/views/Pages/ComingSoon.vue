<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="6">
          <v-sheet class="neu-glow with-radius fill-height" height="100%">
            <v-img
              src="/static/illustator/the_moon.png"
              lazy-src="/static/illustator/the_moon.png"
              height="250"
              contain
            >
            </v-img>
            <v-row justify="end" class="fill-height">
              <v-col cols="12">
                <div class="text-h5 text-center">Lauching Very Soon</div>
              </v-col>
              <v-col cols="12" class="align-self-end">
                <count-down :deadline="deadline" />
              </v-col>
              <v-col class="text-center px-10" cols="12">
                <div class="text-body-1 mb-5">
                  Please <b>subscribe</b> us to get updates on our application
                </div>
                <v-form
                  @submit.prevent="$v.$invalid ? null : submit()"
                  ref="form"
                >
                  <v-text-field
                    solo
                    label="Email"
                    v-model="form.email"
                    required
                    :error-messages="fieldErrors('form.email')"
                    @blur="$v.form.email.$touch()"
                    class="max-width-400x margin-auto"
                  ></v-text-field>

                  <v-btn color="secondary" type="submit" :disabled="$v.$invalid"
                    >Notify Me!</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import CountDown from "@/components/CountDown";
import addYears from "date-fns/addYears";
import format from "date-fns/format";

const defaultForm = {
  email: "",
};
export default {
  components: { CountDown },
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
    },
  },
  validationMessages: {
    form: {
      email: {
        required: "Please enter email",
        email: "Email must be valid",
      },
    },
  },
  data() {
    return {
      title: "Coming Soon",
      form: Object.assign({}, defaultForm),
      snackbar: false,
    };
  },
  computed: {
    deadline() {
      return format(addYears(new Date(), 1), "MMM dd, yyyy");
    },
  },
  methods: {
    submit() {
      this.resetForm();
      this.$v.$reset();
    },
  },
};
</script>
