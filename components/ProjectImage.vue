<template>
  <div
    class="project-image absolute top-0 left-0 w-full h-full"
    :class="{ 'active': isCurrent }"
  >
    <img 
      v-if="project.mobileImage && device === 'mobile'" 
      :src="shouldLoad ? require(`/src/images/${project.mobileImage}`) : null" 
      :alt="project.imageAlt"
      class="object-cover object-center w-full h-full"
    >

    <video 
      v-else-if="project.video" 
      ref="video"
      :src="shouldLoad ? require(`/src/images/${project.video}`) : null"
      class="object-cover object-center w-full h-full"
      autoplay
      muted
      playsinline
      preload
      loop
    ></video>

    <img 
      v-else-if="image"
      :src="shouldLoad ? require(`/src/images/${image}`) : null" 
      :alt="project.imageAlt"
      class="object-cover object-center w-full h-full"
    >
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProjectImage',
  props: {
    project: Object
  },
  computed: {
    ...mapState(['projects', 'currentProject', 'isMobile', 'device']),
    ...mapGetters(['previousProject', 'nextProject', 'currentColor']),
    isPrevious() {
      return this.project.slug === this.previousProject.slug
    },
    isNext() {
      return this.project.slug === this.nextProject.slug
    },
    isCurrent() {
      return this.project.slug === this.currentProject.slug
    },
    shouldLoad() {
      return this.isPrevious || this.isNext || this.isCurrent
    },
    image() {
      if (this.device === 'desktop') {
        return this.project.image
      } else {
        if (this.project.mobileImage) {
          return this.project.mobileImage
        } else {
          return this.project.image
        }
      }
    }
  },
  watch: {
    currentProject(newVal) {
      if (newVal.slug === this.project.slug) {
        if (this.project.video) {
          this.$refs.video.currentTime = 0
        }
      }
    }
  }
}
</script>