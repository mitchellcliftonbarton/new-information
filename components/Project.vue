<template>
  <div class="project w-full h-screen relative">
    <NextLinks v-if="!isMobile" />

    <img 
      v-if="currentProject" 
      :src="!isMobile ? require(`/src/images/${currentProject.image}`) : currentProject.mobileImage ? require(`/src/images/${currentProject.mobileImage}`) : require(`/src/images/${currentProject.image}`)" 
      alt="" 
      class="object-cover object-center w-full h-full"
    >

    <div class="big-links absolute top-0 left-0 w-full h-full flex">
      <nuxt-link 
        :to="`/projects/${previousProject.slug}`" 
        @mouseenter.native="handlePrevEnter" 
        @mouseleave.native="handlePrevLeave"
        @mousemove.native="handleMouseMove($event, leftCursor)"
        class="prev h-full w-1/2 relative"
        :class="{ 'active': leftCursor.show }"
      >
        <PreviousArrow 
          :style="{
            transform: `translate3d(${leftCursor.x}px, ${leftCursor.y}px, 0px)`
          }"
          :color="currentColor"
          class="hidden lg:block"
        />
      </nuxt-link>

      <nuxt-link 
        :to="`/projects/${nextProject.slug}`" 
        @mouseenter.native="handleNextEnter"
        @mouseleave.native="handleNextLeave" 
        @mousemove.native="handleMouseMove($event, rightCursor)"
        class="next h-full w-1/2 relative"
        :class="{ 'active': rightCursor.show }"
      >
        <NextArrow 
          :style="{
            transform: `translate3d(${rightCursor.x}px, ${rightCursor.y}px, 0px)`
          }"
          :color="currentColor"
          class="hidden lg:block"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NextLinks from '~/components/NextLinks.vue'
import PreviousArrow from './PreviousArrow.vue'
import NextArrow from './NextArrow.vue'

export default {
  name: 'Project',
  components: { NextLinks, PreviousArrow, NextArrow },
  data() {
    return {
      leftCursor: {
        show: false,
        x: 0,
        y: 0
      },
      rightCursor: {
        show: false,
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapState(['currentProject', 'isMobile']),
    ...mapGetters(['previousProject', 'nextProject', 'currentColor']),
  },
  methods: {
    handlePrevEnter() {
      if (!this.isMobile) {
        this.$store.dispatch('setNextLinkActive', false)
        this.$store.dispatch('setPreviousLinkActive', true)

        // this.leftCursor.show = true
      }
    },
    handleNextEnter() {
      if (!this.isMobile) {
        this.$store.dispatch('setPreviousLinkActive', false)
        this.$store.dispatch('setNextLinkActive', true)

        // this.rightCursor.show = true
      }
    },
    handlePrevLeave() {
      if (!this.isMobile) {
        this.leftCursor.show = false
      }
    },
    handleNextLeave() {
      if (!this.isMobile) {
        this.rightCursor.show = false
      }
    },
    handleMouseMove(e, side) {
      if (!this.isMobile) {
        if (!side.show) side.show = true
        side.x = e.clientX - e.target.getBoundingClientRect().left - 20
        side.y = e.clientY - e.target.getBoundingClientRect().top - 15
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .prev,
  .next {
    cursor: none;

    svg {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }

    &.active {
      svg {
        opacity: 1;
      }
    }
  }
</style>