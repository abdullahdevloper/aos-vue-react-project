<template>
  <v-toolbar
    flat
    color="transparent"
  >

    <v-checkbox
      :value="selectionAll"
      v-model="selectionAll"
      hide-details
      @change="handleSelectAll($event)"
    ></v-checkbox>
    <v-scale-transition>
      <v-app-bar-nav-icon
        @click.stop="onToggleDrawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-scale-transition>
    <v-scale-transition>
      <v-text-field
        :value="search"
        label="Search Contact"
        solo
        clear-icon="clear_all"
        :append-icon="$vuetify.breakpoint.smAndDown ? 'close' : ''"
        prepend-inner-icon="search"
        class="input-width-3x mr-3"
        dense
        @input="$emit('onSearch', $event)"
        @click:append="handleSearchVisibility()"
        hide-details
        clearable=""
        v-if="isSearchVisible"
      ></v-text-field>
    </v-scale-transition>

    <v-spacer></v-spacer>
    <v-scale-transition>
      <v-btn
        icon
        @click="onBulkDelete"
        v-if="showBulkActionOptions"
      >
        <v-icon color="error">delete</v-icon>
      </v-btn>
    </v-scale-transition>
    <v-slide-y-transition>
      <v-btn
        class="box-glow mx-2"
        fab
        x-small
        dark
        @click="handleSearchVisibility()"
        v-if="!isSearchVisible"
      >
        <v-icon>search</v-icon>
      </v-btn>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <v-btn
        class="box-glow"
        fab
        x-small
        dark
        @click="addContactDialog"
        v-if="!hideBtnWhileSearch"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-slide-y-transition>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
    search: {
      type: String,
      default: null,
    },
    showBulkActionOptions: Boolean,
    onSelectAll: Function,
    onUnselectAll: Function,
    onBulkDelete: Function,
    addContactDialog: Function,
    onToggleDrawer: Function
  },
  data () {
    return {
      selectionAll: false,
      showSearch: false,
    }
  },
  computed: {
    isSearchVisible: {
      get () {
        return !this.$vuetify.breakpoint.smAndDown || this.showSearch
      },
      set (val) {
        this.showSearch = val;
      }
    },
    hideBtnWhileSearch () {
      return this.$vuetify.breakpoint.smAndDown && this.showSearch
    }
  },
  methods: {
    handleSelectAll () {
      if (this.selectionAll) {
        this.onSelectAll();
      } else {
        this.onUnselectAll();
      }
    },
    handleSearchVisibility () {
      this.showSearch = !this.showSearch;
    }
  }
}
</script>