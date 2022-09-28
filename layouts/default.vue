<template>
  <div :class="`device-${device}`">
    <MainNav />

    <main
      class="main relative"
    >
      <Nuxt />

      <div v-if="currentProject" class="fixed top-0 left-0 w-full h-screen">
        <ProjectImage 
          v-for="(project, index) in projects" 
          :key="index" 
          :project="project"
        />
      </div>

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
import ProjectImage from '~/components/ProjectImage.vue'

export default {
  components: { MainNav, MainFooter, PreviousArrow, NextArrow, ProjectImage },
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
    ...mapState(['projects', 'currentProject', 'isMobile', 'device']),
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
      if (this.device === 'desktop') {
        this.$store.dispatch('setNextLinkActive', false)
        this.$store.dispatch('setPreviousLinkActive', true)

        // this.leftCursor.show = true
      }
    },
    handleNextEnter() {
      if (this.device === 'desktop') {
        this.$store.dispatch('setPreviousLinkActive', false)
        this.$store.dispatch('setNextLinkActive', true)

        // this.rightCursor.show = true
      }
    },
    handlePrevLeave() {
      if (this.device === 'desktop') {
        this.$store.dispatch('setPreviousLinkActive', false)
        this.leftCursor.show = false
      }
    },
    handleNextLeave() {
      if (this.device === 'desktop') {
        this.$store.dispatch('setNextLinkActive', false)
        this.rightCursor.show = false
      }
    },
    handleMouseMove(e, side) {
      if (this.device === 'desktop') {
        if (!side.show) side.show = true
        side.x = e.clientX - e.target.getBoundingClientRect().left - 20
        side.y = e.clientY - e.target.getBoundingClientRect().top - 15
      }
    },
    getDeviceType () {
      if (process.client) {
        const ua = navigator.userAgent
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet"
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile"
        }
        return "desktop"
      }
    }
  },
  created () {
    this.setIsMobile()
  },
  mounted() {
    this.$store.dispatch('setDevice', this.getDeviceType())
    
    console.log('%c \nDevelopment by Cold Rice \n \ncold-rice.info \n \n', 'color: grey')
  }
}
</script>

<style lang="scss" scoped>
  body {
    overflow: hidden;
  }

  .project-image {
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }

  .prev,
  .next {
    cursor: none;
    -webkit-tap-highlight-color: transparent;

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
