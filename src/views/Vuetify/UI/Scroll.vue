<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid>
      <doc-page :namespace="namespace" :page="page" :usage="usage" />
      <base-markdown
        :namespace="namespace"
        :page="page"
        source="routerHeading"
      />
      <base-markdown :namespace="namespace" :page="page" source="routerText1" />
      <doc-markup value="js_import_goto_router"></doc-markup>

      <base-markdown
        :namespace="namespace"
        :page="page"
        source="firstHeader"
        id="first"
      />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />

      <base-markdown
        :namespace="namespace"
        :page="page"
        source="secondHeader"
        id="second"
      />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />

      <base-markdown
        :namespace="namespace"
        :page="page"
        source="thirdHeader"
        id="third"
      />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
      <base-markdown :namespace="namespace" :page="page" source="loremIpsum" />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Styles",
      page: "Scroll",
      usage: "usage",
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Scroll",
          disabled: true,
        },
      ],
    };
  },
};
</script>
