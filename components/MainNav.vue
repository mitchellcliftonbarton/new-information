<template>
  <header 
    id="nav" 
    class="fixed top-0 left-0 flex lg:justify-start items-start p-4 lg:p-6 w-full lg:w-auto"
  >
    <nuxt-link 
      to="/information" 
      class="h-text w-1/2 lg:w-auto"
      :style="{ color: currentColor }"
    >New Information</nuxt-link>
    <p 
      v-if="currentProject" 
      class="h-text w-1/2 lg:w-auto lg:ml-8"
      :style="{ color: currentColor }"
    >{{ currentProject.title }}</p>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MainNav',
  computed: {
    ...mapState(['currentProject']),
    ...mapGetters(['currentColor'])
  }
}
</script>

<style lang="scss" scoped>
  #nav {
    z-index: 500;
  }
</style>