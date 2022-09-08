<template>
  <div class="project w-full h-screen relative">
    <NextLinks />

    <img 
      v-if="currentProject" 
      :src="require(`/src/images/${currentProject.image}`)" 
      alt="" 
      class="object-cover object-center w-full h-full"
    >

    <div class="big-links absolute top-0 left-0 w-full h-full flex">
      <nuxt-link 
        :to="`/projects/${previousProject.slug}`" 
        @mouseenter.native="handlePrevEnter" 
        class="prev h-full w-1/2"
      ></nuxt-link>
      <nuxt-link 
        :to="`/projects/${nextProject.slug}`" 
        @mouseenter.native="handleNextEnter" 
        class="next h-full w-1/2"
      ></nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NextLinks from '~/components/NextLinks.vue'

export default {
  name: 'Project',
  components: { NextLinks },
  computed: {
    ...mapState(['currentProject']),
    ...mapGetters(['previousProject', 'nextProject']),
  },
  methods: {
    handlePrevEnter() {
      this.$store.dispatch('setNextLinkActive', false)
      this.$store.dispatch('setPreviousLinkActive', true)
    },
    handleNextEnter() {
      this.$store.dispatch('setPreviousLinkActive', false)
      this.$store.dispatch('setNextLinkActive', true)
    }
  }
}
</script>