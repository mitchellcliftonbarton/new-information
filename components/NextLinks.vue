<template>
  <div class="pointer-events-none next fixed top-0 right-0 p-6 hidden lg:block">
    <nuxt-link 
      v-if="previousLinkActive" 
      :to="`/projects/${previousProject.slug}`" 
      class="h-text"
      :style="{ color: currentColor }"
    >
      <span class="mr-16">Previous</span>
      <span>{{ previousProject.title }}</span>
    </nuxt-link>
    <nuxt-link 
      v-if="nextLinkActive" 
      :to="`/projects/${nextProject.slug}`" 
      class="h-text"
      :style="{ color: currentColor }"
    >
      <span class="mr-16">Next</span>
      <span>{{ nextProject.title }}</span>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['nextLinkActive', 'previousLinkActive']),
    ...mapGetters(['currentColor', 'previousProject', 'nextProject']),
  }
}
</script>

<style lang="scss" scoped>
  .next {
    z-index: 300;
  }
</style>