<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
      icon="color_lens"
    ></vuse-section-definition>
    <v-container fluid>
      <v-text-field
        v-model="search"
        append-icon="mdi-palette"
        prepend-inner-icon="mdi-magnify"
        solo
        label="Search"
        single-line
        class="neu-input"
        hide-details
      />
      <v-row v-if="colors">
        <v-col
          v-for="(color, key) in computedColors"
          :key="key"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card :color="key" outlined tile>
            <v-card-text>
              <span class="text-h6" v-text="key" />
            </v-card-text>
          </v-card>

          <v-card
            v-for="(subColor, key2) in color"
            :key="key2"
            :color="`${key} ${convertToClass(key2)}`"
            flat
            tile
          >
            <v-card-text :class="getColorClass(key2)">
              <v-row>
                <v-col cols="8" class="text-caption">
                  <span v-if="key !== 'shades'">{{ key }}&nbsp;</span>

                  <span v-if="key2 !== 'base'">{{
                    key2.replace(/(.*)(\d)/, "$1-$2")
                  }}</span>
                </v-col>

                <v-col cols="4" class="text-right">
                  <span
                    v-if="subColor !== 'transparent'"
                    v-text="subColor.toUpperCase()"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <base-markdown
            :namespace="namespace"
            :page="page"
            source="javascriptPackHeader"
          />
          <base-markdown
            :namespace="namespace"
            :page="page"
            source="javascriptPackText"
          />
          <doc-markup value="js_vuetify_color_pack"></doc-markup>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <base-markdown
            :namespace="namespace"
            :page="page"
            source="sassPackHeader"
          />
          <base-markdown
            :namespace="namespace"
            :page="page"
            source="sassPackText"
          />
          <doc-markup value="sass_vuetify_color_pack"></doc-markup>
        </v-col>
      </v-row>

      <example
        :namespace="namespace"
        :page="page"
        value="classes"
        :heading="`${namespace}.${page}.classesHeader`"
        hashid="classes"
        hideGitCodepan
      />
      <doc-text>{{ $t(`${namespace}.${page}.classesText2`) }}</doc-text>
    </v-container>
  </div>
</template>
<script>
import kebabCase from "lodash/kebabCase";
import colors from "vuetify/es5/util/colors";

export default {
  data() {
    return {
      namespace: "Styles",
      page: "Colors",
      examples: ["text-classes", "classes"],
      breadcrumbs: [
        {
          text: "Style & User Interface",
          disabled: false,
        },
        {
          text: "Color",
          disabled: true,
        },
      ],
      colors,
      search: "",
      // colorPackText
    };
  },
  computed: {
    computedColors() {
      const colors = {};
      const search = this.search.toLowerCase();

      Object.keys(this.colors).forEach((key) => {
        const kebabKey = kebabCase(key).toLowerCase();

        if (kebabKey.indexOf(search) > -1) {
          colors[kebabKey] = this.colors[key];
        }
      });

      return colors;
    },
  },

  methods: {
    endStr(str) {
      return str[str.length - 1];
    },
    convertToClass(str) {
      const end = this.endStr(str);
      const sub = str.substr(0, str.length - 1);

      if (isNaN(parseInt(end))) return str;

      return `${sub}-${end}`;
    },
    getColorClass(key) {
      if (
        ["white", "transparent"].includes(key) ||
        key.indexOf("light") > -1 ||
        key.indexOf("accent") > -1
      )
        return "black--text";

      return "white--text";
    },
  },
  beforeDestroy() {
    this.colors = null;
    this.search = null;
    delete this.colors;
    delete this.search;
  },
};
</script>
