<template>
  <div>
    <MainNav />

    <main
      :class="`device-${$store.state.device}`"
      class="main"
    >
      <Nuxt />
    </main>

    <MainFooter />
  </div>
</template>

<script>
import MainNav from '~/components/MainNav.vue'
import MainFooter from '~/components/MainFooter.vue'

export default {
  components: { MainNav, MainFooter },
  methods: {
    setIsMobile () {
      if (process.client) {
        window.matchMedia('(max-width: 1024px)').matches
        ? this.$store.dispatch('setIsMobile', true)
        : this.$store.dispatch('setIsMobile', false)
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
</style>
