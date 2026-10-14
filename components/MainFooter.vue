<template>
  <footer
    id="footer"
    class="fixed bottom-0 left-0 flex justify-start items-end"
    :class="device === 'desktop' ? 'p-6' : 'p-4 lg:p-6'"
  >
    <p
      v-if="currentProject"
      class="h-text whitespace-nowrap mr-4 md:mr-16"
      :style="{ color: currentColor }"
    >
      {{ currentIndex + 1 }} of {{ projects.length }}
    </p>
    <p
      v-if="currentProject"
      class="h-text"
      :style="{ color: currentColor }"
      v-html="currentProject.caption"
    ></p>
  </footer>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "MainFooter",
  computed: {
    ...mapState(["currentProject", "projects", "device"]),
    ...mapGetters(["currentColor"]),
    currentIndex() {
      return this.projects.findIndex(
        project => project.slug === this.currentProject.slug
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#footer {
  z-index: 500;
}
</style>
