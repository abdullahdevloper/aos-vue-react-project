<template>
  <v-row>
    <!-- Form Section -->
    <v-col md="6" cols="12" v-if="form">
      <v-card class="neu-glow">
        <v-snackbar v-model="snackbar" absolute top right color="success">
          <span>Registration successful!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>
        <v-card-title primary-title>
          <div class="text-h5">Reactive Form Example</div>
        </v-card-title>
        <v-form @submit.prevent="$v.$invalid ? () => {} : submit()" ref="form">
          <v-container grid-list-xl fluid>
            <v-row>
              <v-col md="6" cols="12">
                <v-text-field
                  color="primary"
                  label="First name"
                  solo
                  v-model="form.first"
                  :error-messages="fieldErrors('form.first')"
                  @blur="$v.form.first.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12">
                <v-text-field
                  color="purple darken-2"
                  label="Last name"
                  solo
                  v-model="form.last"
                  :error-messages="fieldErrors('form.last')"
                  @blur="$v.form.last.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="purple darken-2"
                  label="Email"
                  solo
                  v-model="form.email"
                  :error-messages="fieldErrors('form.email')"
                  @blur="$v.form.email.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea solo color="teal" multi-line v-model="form.bio">
                  <div slot="label">Bio <small>(optional)</small></div>
                </v-textarea>
              </v-col>
              <v-col md="6">
                <v-select
                  color="pink"
                  label="Favorite animal"
                  v-model="form.favoriteAnimal"
                  required
                  solo
                  :items="animals"
                  :error-messages="fieldErrors('form.favoriteAnimal')"
                  @blur="$v.form.favoriteAnimal.$touch()"
                ></v-select>
              </v-col>
              <v-col md="6">
                <v-slider
                  color="orange"
                  label="Age"
                  hint="Be honest"
                  min="1"
                  max="100"
                  thumb-label
                  v-model="form.age"
                  :error-messages="fieldErrors('form.age')"
                  @blur="$v.form.age.$touch()"
                ></v-slider>
              </v-col>
              <v-col sm="4">
                <v-text-field
                  color="purple darken-2"
                  label="City"
                  solo
                  v-model="form.city"
                  :error-messages="fieldErrors('form.city')"
                  @blur="$v.form.city.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-text-field
                  color="purple darken-2"
                  label="State"
                  solo
                  v-model="form.state"
                  :error-messages="fieldErrors('form.state')"
                  @blur="$v.form.state.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-text-field
                  color="purple darken-2"
                  label="Pincode"
                  solo
                  v-model="form.pincode"
                  :error-messages="fieldErrors('form.pincode')"
                  @blur="$v.form.pincode.$touch()"
                  @input="$v.form.pincode.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-checkbox
                  color="green"
                  v-model="form.terms"
                  required
                  :error-messages="fieldErrors('form.terms')"
                >
                  <div slot="label" @click.stop="null">
                    Do you accept the
                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                    and
                    <a href="javascript:;" @click.stop="conditions = true"
                      >conditions?</a
                    >
                  </div>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click.stop="resetForm">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" type="submit" :disabled="$v.$invalid"
              >Register</v-btn
            >
          </v-card-actions>
        </v-form>
        <v-dialog v-model="terms" max-width="70%">
          <v-card>
            <v-card-title class="text-h6">Terms</v-card-title>
            <v-card-text v-for="n in 5" :key="n">
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="terms = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="conditions" max-width="70%">
          <v-card>
            <v-card-title class="text-h6">Conditions</v-card-title>
            <v-card-text v-for="n in 5" :key="n">
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
    <!-- Code Review -->
    <v-col md="6" cols="12">
      <v-card class="neu-glow">
        <v-card-title primary-title>
          <div class="text-h5">Reactive Form Validation</div>
        </v-card-title>
        <v-card-text class="blue--text json-pre">
          <pre>{{ $v }}</pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  first: "",
  last: "",
  email: "",
  bio: "",
  favoriteAnimal: "",
  city: "",
  state: "",
  pincode: "",
  age: null,
  terms: false,
};

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      first: { required },
      last: { required },
      email: { required, email },
      favoriteAnimal: { required },
      age: { required },
      terms: { required },
      city: { required },
      state: { required },
      pincode: { required, maxLength: maxLength(5) },
    },
  },
  validationMessages: {
    form: {
      first: { required: "First name is required" },
      last: { required: "Last name is required" },
      favoriteAnimal: { required: "Choose your favorite animal" },
      age: { required: "Age is required" },
      city: { required: "City is required" },
      state: { required: "State is required" },
      email: {
        required: "Email is required",
        email: "Email must be valid",
      },
      pincode: {
        required: "Pincode is required",
        maxLength: "Max 5 characters",
      },
    },
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
      conditions: false,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
      snackbar: false,
      terms: false,
    };
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
      this.$v.$reset();
    },
  },
  beforeDestroy() {
    this.form = null;
    delete this.form;
  },
};
</script>
<style scoped>
.json-pre {
  min-height: 748px;
  max-height: 748px;
  height: 748px;
  overflow-y: auto;
}
</style>
