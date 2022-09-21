<template>
  <div class="project w-full h-screen relative">
    <NextLinks v-if="!isMobile" />

    <video 
      v-if="currentProject && currentProject.video" 
      :src="require(`/src/images/${currentProject.video}`)"
      class="object-cover object-center w-full h-full"
      autoplay
      muted
      playsinline
      preload
      loop
    ></video>
    
    <img 
      v-else-if="currentProject && currentProject.image" 
      :src="!isMobile ? require(`/src/images/${currentProject.image}`) : currentProject.mobileImage ? require(`/src/images/${currentProject.mobileImage}`) : require(`/src/images/${currentProject.image}`)" 
      alt="" 
      class="object-cover object-center w-full h-full"
    >
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NextLinks from '~/components/NextLinks.vue'

export default {
  name: 'Project',
  components: { NextLinks },
  computed: {
    ...mapState(['currentProject', 'isMobile']),
    ...mapGetters(['previousProject', 'nextProject', 'currentColor']),
  }
}
</script>

<style lang="scss" scoped>
  
</style>