<template>
  <div
    :class="`device-${device}`"
    class="main"
  >
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      device: null
    }
  },
  methods: {
    setIsMobile () {
      if (process.client) {
        window.matchMedia('(max-width: 1024px)').matches
        ? this.$store.dispatch('setIsMobile', true)
        : this.$store.dispatch('setIsMobile', false)
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
  mounted () {
    this.device = this.getDeviceType()
  }
}
</script>
