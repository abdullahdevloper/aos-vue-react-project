<template>
  <v-sheet max-width="380" class="mx-auto" color="transparent">
    <v-form
      @submit.prevent="$v.$invalid ? null : submit()"
      ref="form"
      class="my-10"
    >
      <v-text-field
        :error-messages="fieldErrors('code')"
        @input="$v.code.$touch()"
        @blur="$v.code.$touch()"
        v-model="code"
        placeholder="000-00"
        v-mask="'###-##'"
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
import { mask } from "vue-the-mask";
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
export default {
  directives: { mask },
  mixins: [validationMixin],
  validations: {
    code: { required },
  },
  validationMessages: {
    code: {
      required: "Please enter code",
      code: "Email must be valid",
    },
  },
  created() {},
  data() {
    return {
      errors: null,
      code: null,
      loader: false,
    };
  },
  methods: {
    submit() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$emit("next", { code: this.code });
      }, 2000);
    },
    resetForm() {
      // this.form = Object.assign({}, defaultForm)
      // this.$refs.sendpasscode.reset()
      // this.$v.$reset()
    },
  },
};
</script>
