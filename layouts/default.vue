<template>
  <div>
    <MainNav />

    <main
      :class="`device-${$store.state.device}`"
      class="main relative"
    >
      <Nuxt />

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
            :color="previousProject.color"
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
            :color="nextProject.color"
            class="hidden lg:block"
          />
        </nuxt-link>
      </div>
    </main>

    <MainFooter />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainNav from '~/components/MainNav.vue'
import MainFooter from '~/components/MainFooter.vue'
import PreviousArrow from '~/components/PreviousArrow.vue'
import NextArrow from '~/components/NextArrow.vue'

export default {
  components: { MainNav, MainFooter, PreviousArrow, NextArrow },
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
    setIsMobile () {
      if (process.client) {
        window.matchMedia('(max-width: 1024px)').matches
        ? this.$store.dispatch('setIsMobile', true)
        : this.$store.dispatch('setIsMobile', false)
      }
    },
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
        this.$store.dispatch('setPreviousLinkActive', false)
        this.leftCursor.show = false
      }
    },
    handleNextLeave() {
      if (!this.isMobile) {
        this.$store.dispatch('setNextLinkActive', false)
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
  },
  created () {
    this.setIsMobile()
  },
  mounted () {
    console.log('%c \nDevelopment by Cold Rice \n \ncold-rice.info \n \n', 'color: grey')
  }
}
</script>

<style lang="scss" scoped>
  body {
    overflow: hidden;
  }

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
