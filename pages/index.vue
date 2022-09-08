<template>
  <div class="main relative">
    <Project />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Project from '~/components/Project.vue'

export default {
  components: { Project },
  computed: {
      ...mapState(["projects"]),
      firstProject() {
          return this.projects[0];
      }
  },
  mounted() {
      this.$store.dispatch("setCurrentProject", this.firstProject);
  }
}
</script>

<style lang="scss">
  
</style>
