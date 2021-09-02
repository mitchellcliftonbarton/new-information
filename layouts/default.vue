<template>
  <div
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
  }
}
</script>

<style lang="scss" scoped>
  
</style>
