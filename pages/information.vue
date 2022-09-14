<template>
  <div 
    class="main relative min-h-screen w-full p-4 lg:p-6 grid grid-cols-8 lg:grid-cols-6 gap-4 lg:gap-6 pb-32 lg:pb-0" 
    :style="{ backgroundColor: currentColor }"
  >
    <div class="col-span-4 lg:col-span-1 flex flex-col items-start">
      <nuxt-link :to="backLink" class="h-text text-white mb-12 inline-block">New Information</nuxt-link>

      <a 
        v-if="information.address && information.addressLink" 
        class="h-text text-white inline-block mb-12 lg:hover:underline" 
        v-html="information.address"
        :href="information.addressLink"
        target="_blank"
        rel="noreferrer"
      ></a>

      <div 
        v-else-if="information.address && !information.addressLink" 
        class="h-text text-white mb-12" 
        v-html="information.address"
      ></div>

      <div v-if="information.email || information.instagram">
        <a 
          v-if="information.email" 
          :href="`mailto:${information.email}`" 
          class="h-text text-white break-all lg:hover:underline"
        >{{ information.email }}</a>
        <a 
          v-if="information.instagram" 
          :href="information.instagram" 
          class="h-text text-white lg:hover:underline"
        >Instagram</a>
      </div>
    </div>

    <div class="col-span-3 lg:col-span-2">
      <div 
        v-if="information.textColumn1" 
        class="h-text text-white rich-text mb-12 lg:mb-0" 
        v-html="information.textColumn1"
      ></div>

      <div 
        v-if="information.textColumn2" 
        class="h-text text-white rich-text lg:hidden" 
        v-html="information.textColumn2"
      ></div>
    </div>

    <div 
      v-if="information.textColumn2" 
      class="col-span-2 h-text text-white rich-text hidden lg:block" 
      v-html="information.textColumn2"
    ></div>

    <div class="closer col-span-1 flex justify-end items-start">
      <nuxt-link :to="backLink">
        <XIcon />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import XIcon from '~/components/XIcon.vue';

export default {
  layout: "secondary",
  computed: {
      ...mapState(["information", "backLink"]),
      ...mapGetters(["currentColor"])
  },
  components: { XIcon },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'index' || from.name === 'projects-slug') {
        vm.$store.dispatch('setBackLink', from.path)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .closer svg {
    width: 3.4rem;

    @media screen and (min-width: theme('screens.lg')) {
      width: 4.8rem;
    }
  }
</style>
