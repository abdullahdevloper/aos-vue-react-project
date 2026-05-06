<template>
  <v-card
    :loading="loading"
    :min-height="loading ? 200 : undefined"
    class="mb-10 neu-glow-inset"
  >
    <v-toolbar light dense flat class="transparent">
      <v-toolbar-title>
        <base-heading :id="hashid">{{ heading }}</base-heading>
      </v-toolbar-title>

      <v-spacer v-if="heading" />

      <v-chip v-if="newIn" color="warning" small>
        <v-icon left>mdi-star</v-icon>
        <span
          >New in <strong>{{ newIn }}</strong></span
        >
      </v-chip>

      <v-spacer />

      <v-tooltip v-if="!$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="Invert example colors"
            icon
            small
            @click="dark = !dark"
            v-on="on"
          >
            <v-icon small>mdi-invert-colors</v-icon>
          </v-btn>
        </template>

        Invert example colors
      </v-tooltip>

      <v-tooltip bottom v-if="!hideGitCodepan">
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="View on Github"
            :href="
              `https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/examples/${file}.vue`
            "
            icon
            small
            target="_blank"
            v-on="on"
          >
            <v-icon small>mdi-github</v-icon>
          </v-btn>
        </template>

        View on Github
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="View source"
            icon
            small
            @click="expand = !expand"
            v-on="on"
          >
            <v-icon small>mdi-code-tags</v-icon>
          </v-btn>
        </template>

        View source
      </v-tooltip>
    </v-toolbar>

    <v-expand-transition v-if="parsed">
      <v-card v-show="expand" color="#2d2d2d" dark flat tile>
        <v-item-group v-model="selected" class="pa-2" mandatory>
          <template v-for="(section, i) in sections">
            <v-item :key="`item-${i}`" :value="section">
              <v-btn
                slot-scope="{ active, toggle }"
                :color="!active ? 'transparent' : ''"
                :input-value="active"
                active-class="grey darken-2 white--text"
                class="mr-2"
                depressed
                rounded
                @click="toggle"
              >
                {{ section }}
              </v-btn>
            </v-item>
          </template>
        </v-item-group>

        <v-divider />

        <v-window v-model="selected">
          <template v-for="(section, i) in sections">
            <v-window-item :key="`window-${i}`" :value="section" eager>
              <div
                :class="
                  $vuetify.breakpoint.smAndUp ? 'v-example__container' : ''
                "
              >
                <doc-markup :filename="false" :value="file" class="mb-0">{{
                  parsed[section]
                }}</doc-markup>
              </div>
            </v-window-item>
          </template>
        </v-window>
      </v-card>
    </v-expand-transition>
    <v-fade-transition>
      <v-sheet
        v-if="component"
        tile
        flat
        :class="!dark ? 'transparent' : ''"
        :dark="dark"
      >
        <v-card-text>
          <div data-app="true">
            <doc-text :dark="dark">{{ desc }}</doc-text>
            <component :is="component" />
          </div>
        </v-card-text>
      </v-sheet>
    </v-fade-transition>
  </v-card>
</template>

<script>
// Utilities
import kebabCase from "lodash/kebabCase";

export default {
  props: {
    eager: Boolean,
    value: {
      type: [Object, String],
      default: undefined,
    },
    namespace: {
      type: String,
      default: "",
    },
    page: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    heading: {
      type: String,
      default: "",
    },
    hashid: {
      type: String,
      default: "",
    },
    hideGitCodepan: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    branch: "master",
    component: undefined,
    dark: false,
    expand: false,
    loading: false,
    observer: null,
    parsed: undefined,
    selected: "template",
  }),

  computed: {
    internalValue() {
      if (this.value === Object(this.value)) return this.value;

      return { file: this.value };
    },
    file() {
      return `${this.kebabCase(this.page)}/${this.internalValue.file}`;
    },
    newIn() {
      return this.internalValue.newIn;
    },
    sections() {
      return ["template", "style", "script"].filter(
        (section) => this.parsed[section]
      );
    },
  },

  created() {
    this.expand = Boolean(this.internalValue.show);
  },

  beforeDestroy() {
    this.unobserve();
  },

  mounted() {
    this.importComponent();
    if (this.eager) return this.getFiles();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.importTemplate();
        });
      },
      { threshold: 0 }
    );

    this.observer.observe(this.$el);
  },

  methods: {
    boot(res) {
      const template = this.parseTemplate("template", res);
      const style = this.parseTemplate("style", res);
      const script = this.parseTemplate("script", res);
      const codepenResources = this.parseTemplate("codepen-resources", res);
      const codepenAdditional = this.parseTemplate("codepen-additional", res);

      this.parsed = {
        template,
        style,
        script,
        codepenResources,
        codepenAdditional,
      };
    },
    async getFiles() {
      this.loading = true;
      await this.importTemplate();
      this.loading = false;
    },
    getLang(tab) {
      if (tab === "script") return "js";
      if (tab === "style") return "css";
      return "vue";
    },
    importComponent() {
      return import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../examples/${this.file}.vue`
      ).then((comp) => (this.component = comp.default));
    },
    importTemplate() {
      return import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../examples/${this.file}.vue`
      )
        .then((comp) => this.boot(comp.default))
        .then(this.unobserve);
    },
    kebabCase,
    parseTemplate(target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`;
      const regex = new RegExp(string, "g");
      const parsed = regex.exec(template) || [];
      return parsed[1] || "";
    },
    sendToCodepen() {
      this.$refs.codepen.submit();
    },
    togglePanel() {
      const panel = this.$refs.panel.items[0]._uid;

      this.$refs.panel.panelClick(panel);
    },
    unobserve() {
      this.observer && this.observer.unobserve(this.$el);
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/settings/_variables.scss'

.component-example .application--example
  z-index: auto

.v-example__container
  height: 100%
  max-height: calc(100vh - 275px)
  overflow-y: auto

// .v-example:not(:first-child) .v-example__container
  // border-left: 1px solid rgba(#FFF, .12)

// .component-example
  // margin-bottom: 32px

.application--example
  position: relative
  transition: .3s map-get($transition, 'swing')
  overflow: hidden
  z-index: 0

  > div,
  > form,
  > footer
    width: 100%

.component-example__panel
  .v-expansion-panel__body
    border: none

    .v-tab, .markup
      height: 100%

    .v-tabs
      border: none
      max-height: 500px
      overflow-y: auto

    > li
      border: none

.justify
  text-align: justify

aside.v-navigation-drawer,
.v-overlay
  z-index: 1

nav.v-toolbar
  z-index: 0
</style>
