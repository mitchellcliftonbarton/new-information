<template>
  <div class="project w-full h-full relative"></div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Project",
  computed: {
    ...mapState(["currentProject", "isMobile"]),
    ...mapGetters(["previousProject", "nextProject", "currentColor"])
  }
};
</script>
