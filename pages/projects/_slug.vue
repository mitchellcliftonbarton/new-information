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
      current() {
          return this.projects.find(project => project.slug === this.$route.params.slug)
      }
  },
  mounted() {
      this.$store.dispatch("setCurrentProject", this.current);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('setBackLink', '/')
    })
  }
}
</script>

<style lang="scss">
  
</style>

