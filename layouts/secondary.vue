<template>
  <div>
    <main
      :class="`device-${$store.state.device}`"
      class="main"
    >
      <Nuxt />
    </main>

    <SecondaryFooter />
  </div>
</template>

<script>
import SecondaryFooter from '~/components/SecondaryFooter.vue';

export default {
  components: { SecondaryFooter },
  methods: {
      setIsMobile() {
          if (process.client) {
              window.matchMedia("(max-width: 1024px)").matches
                  ? this.$store.dispatch("setIsMobile", true)
                  : this.$store.dispatch("setIsMobile", false);
          }
      }
  },
  created() {
      this.setIsMobile();
  }
}
</script>

<style lang="scss" scoped>
  body {
    overflow: hidden;
  }
</style>
