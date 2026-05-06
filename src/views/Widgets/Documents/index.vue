<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="card_giftcard"
      :breadcrumbs="breadcrumbs"
    />
    <v-container fluid>
      <v-sheet max-width="1180" color="transparent">
        <v-row justify="space-between">
          <v-col cols="12" md="4">
            <word-document class="mb-6" />
            <picture-document />
          </v-col>
          <v-col
            cols="
            12"
            md="4"
          >
            <pdf-document class="mb-6" />
            <audio-document />
          </v-col>
          <v-col cols="12" md="4">
            <video-document />
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import WordDocument from "./WordDocument";
import PdfDocument from "./PdfDocument";
import PictureDocument from "./PictureDocument";
import VideoDocument from "./VideoDocument";
import AudioDocument from "./AudioDocument";
export default {
  components: {
    WordDocument,
    PdfDocument,
    PictureDocument,
    VideoDocument,
    AudioDocument,
  },
  data() {
    return {
      page: "Document Widgets",
      breadcrumbs: [
        {
          text: "Widgets",
          disabled: false,
          to: {
            path: "/widgets/cards/basic",
          },
        },
        {
          text: "Document",
          disabled: true,
        },
      ],
    };
  },
};
</script>
