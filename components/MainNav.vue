<template>
  <header 
    id="nav" 
    class="fixed top-0 left-0 flex justify-between items-center p-6"
  >
    <div class="flex">
      <nuxt-link 
        to="/information" 
        class="h-text"
        :style="{ color: currentColor }"
      >New Information</nuxt-link>
      <p 
        v-if="currentProject" 
        class="h-text ml-8"
        :style="{ color: currentColor }"
      >{{ currentProject.title }}</p>
    </div>
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