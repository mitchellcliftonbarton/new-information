<template>
  <footer id="footer" class="fixed bottom-0 left-0 p-4 lg:p-6 flex justify-start items-end">
    <nuxt-link 
      to="/information" 
      class="h-text" 
      :style="{ color: currentColor }"
    >?</nuxt-link>

    <p 
      v-if="currentProject" 
      class="h-text ml-6 lg:ml-8" 
      :style="{ color: currentColor }"
    >{{ currentProject.caption }}</p>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MainFooter',
  computed: {
    ...mapState(['currentProject']),
    ...mapGetters(['currentColor'])
  }
}
</script>

<style lang="scss" scoped>
  #footer {
    z-index: 500;
  }
</style>