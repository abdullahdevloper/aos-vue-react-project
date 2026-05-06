<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="6">
          <v-sheet class="neu-glow with-radius fill-height pa-3" height="100%">
            <v-img
              src="/static/illustator/under_construction.png"
              lazy-src="/static/illustator/under_construction.png"
              height="250"
              contain
            >
            </v-img>
            <v-row justify="end" class="fill-height">
              <v-col cols="12">
                <div class="text-h4 text-center">Under Maintenance!</div>
              </v-col>
              <v-col class="text-center px-10" cols="12">
                <div class="text-body-1 mb-5">
                  Scheduled maintenance is currently in progress. <br />Please
                  check back soon We apologize for any inconvenience.
                </div>
                <v-btn color="secondary" to="/dashboard/operational"
                  >Back To Home</v-btn
                >
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

import addYears from "date-fns/addYears";
import format from "date-fns/format";

const defaultForm = {
  email: "",
};
export default {
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
