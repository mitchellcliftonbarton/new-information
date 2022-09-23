<template>
  <div 
    class="main relative min-h-screen w-full p-4 lg:p-6 flex pb-32 lg:pb-0" 
    :style="{ backgroundColor: currentColor }"
  >
    <div class="left lg:mr-8">
      <div class="flex flex-col items-start h-text">
        <nuxt-link :to="backLink" class="h-text text-white inline-block">New Information</nuxt-link>

        <br>
        
        <a 
          v-if="information.address && information.addressLink" 
          class="h-text text-white inline-block lg:hover:underline" 
          v-html="information.address"
          :href="information.addressLink"
          target="_blank"
          rel="noreferrer"
        ></a>

        <div 
          v-else-if="information.address && !information.addressLink" 
          class="h-text text-white" 
          v-html="information.address"
        ></div>

        <br>

        <div v-if="information.email || information.instagram">
          <p>
            <a 
              v-if="information.email" 
              :href="`mailto:${information.email}`" 
              class="h-text text-white break-word lg:hover:underline"
              v-html="information.emailString ? information.emailString : information.email"
            ></a>
          </p>
          <p>
            <a 
              v-if="information.instagram" 
              :href="information.instagram" 
              class="h-text text-white lg:hover:underline"
            >Instagram</a>
          </p>
        </div>
      </div>
    </div>

    <div class="w-1/3 lg:mr-8 max-w-3xl">
      <div 
        v-if="information.textColumn1" 
        class="h-text text-white rich-text lg:mb-0" 
        v-html="information.textColumn1"
      ></div>

      <br class="lg:hidden">

      <div 
        v-if="information.textColumn2" 
        class="h-text text-white rich-text lg:hidden" 
        v-html="information.textColumn2"
      ></div>
    </div>

    <div 
      v-if="information.textColumn2" 
      class="w-1/3 h-text text-white rich-text hidden lg:block max-w-3xl" 
      v-html="information.textColumn2"
    ></div>

    <div class="closer w-auto">
      <div class="flex justify-end items-start">
        <nuxt-link :to="backLink">
          <XIcon />
        </nuxt-link>
      </div>
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
  .closer {
    flex: 1;

    a {
      transform: translateX(8px) translateY(-8px);
    }
  }

  .closer div {
    position: sticky;
    top: 1rem;
    flex: 1 0 auto;

    @media screen and (min-width: theme('screens.lg')) {
      top: 1.5rem;
    }
  }

  .closer svg {
    width: 3.4rem;

    @media screen and (min-width: theme('screens.lg')) {
      width: 4.8rem;
    }
  }

  .left {
    width: 173px;

    & > div {
      position: sticky;
      top: 1rem;

      @media screen and (min-width: theme('screens.lg')) {
        top: 1.5rem;
      }
    }
  }

  a {
    text-decoration-thickness: 2px;
  }
</style>
