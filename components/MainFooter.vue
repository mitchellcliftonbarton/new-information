<template>
  <footer 
    id="footer" 
    class="fixed bottom-0 left-0 flex justify-start items-end"
    :class="device === 'desktop' ? 'p-6' : 'p-4 lg:p-6'"
  >
    <nuxt-link 
      to="/log" 
      class="h-text" 
      :style="{ color: currentColor }"
    >?</nuxt-link>

    <p 
      v-if="currentProject" 
      class="h-text ml-6 md:ml-16" 
      :style="{ color: currentColor }"
      v-html="currentProject.caption"
    ></p>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MainFooter',
  computed: {
    ...mapState(['currentProject', 'device']),
    ...mapGetters(['currentColor'])
  }
}
</script>

<style lang="scss" scoped>
  #footer {
    z-index: 500;
  }
</style>