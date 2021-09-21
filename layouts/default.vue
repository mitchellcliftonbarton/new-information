<template>
  <div
    :class="`device-${$store.state.device}`"
    class="main"
  >
    <Nuxt />
  </div>
</template>

<script>
export default {
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
