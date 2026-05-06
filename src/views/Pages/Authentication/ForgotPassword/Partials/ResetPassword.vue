<template>
  <v-sheet
    max-width="380"
    class="mx-auto"
    color="transparent"
  >
    <v-form
      @submit.prevent="$v.$invalid ? null : submit()"
      ref="form"
      class="my-10"
    >
      <v-text-field
        :error-messages="fieldErrors('password')"
        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPwd ? 'text' : 'password'"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        prepend-inner-icon="lock"
        v-model="password"
        label="Password"
        @click:append="showPwd = !showPwd"
        solo
        flat
      />
      <v-text-field
        type="password"
        label="Confirm Password"
        v-model="repeatPassword"
        :error-messages="fieldErrors('repeatPassword')"
        @input="$v.repeatPassword.$touch()"
        @blur="$v.repeatPassword.$touch()"
        prepend-inner-icon="enhanced_encryption"
        required
        solo
        flat
      ></v-text-field>

      <v-btn
        block
        type="submit"
        :disabled="$v.$invalid"
        :loading="loader"
      >Reset Password</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
export default {
  mixins: [validationMixin],
  validations: {
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: { required: "Password is required field." },
    repeatPassword: {
      sameAsPassword: "Must needs to match with Password"
    }
  },
  data () {
    return {
      errors: null,
      password: null,
      repeatPassword: null,
      loader: false,
      showPwd: false
    };
  },
  methods: {
    submit () {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$emit("complete", true);
      }, 2000);
    },
  },
};
</script>
