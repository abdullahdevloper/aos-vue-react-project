<template>
  <v-sheet max-width="380" class="mx-auto" color="transparent">
    <v-form
      @submit.prevent="$v.$invalid ? null : submit()"
      ref="form"
      class="my-10"
    >
      <v-text-field
        :error-messages="fieldErrors('email')"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        prepend-inner-icon="email"
        v-model="email"
        label="Email"
        solo
        flat
      />

      <v-btn block type="submit" :disabled="$v.$invalid" :loading="loader"
        >Send OTP</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  validationMessages: {
    email: {
      required: "Please enter email",
      email: "Email must be valid",
    },
  },
  data() {
    return {
      errors: null,
      email: null,
      loader: false,
    };
  },
  methods: {
    submit() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$emit("next", { email: this.email });
      }, 2000);
    },
  },
};
</script>
