<template>
  <div 
    class="main relative min-h-screen w-full flex" 
    :class="device === 'desktop' ? 'px-6 pt-6 pb-0' : 'px-4 pt-4 pb-32'"
    :style="{ backgroundColor: currentColor }"
  >
    <div class="left lg:mr-16">
      <div class="flex flex-col items-start h-text">
        <nuxt-link :to="backLink" class="h-text text-black inline-block">New Information</nuxt-link>

        <br>
        
        <a 
          v-if="information.address && information.addressLink" 
          class="h-text text-black inline-block" 
          v-html="information.address"
          :href="information.addressLink"
          target="_blank"
          rel="noreferrer"
        ></a>

        <div 
          v-else-if="information.address && !information.addressLink" 
          class="h-text text-black" 
          v-html="information.address"
        ></div>

        <br>

        <div v-if="information.email || information.instagram">
          <p class="md:pr-4 lg:pr-0">
            <a 
              v-if="information.email" 
              :href="`mailto:${information.email}`" 
              class="h-text text-black break-word"
              v-html="information.emailString ? information.emailString : information.email"
            ></a>
          </p>
          <p>
            <a 
              v-if="information.instagram" 
              :href="information.instagram" 
              class="h-text text-black"
            >Instagram</a>
          </p>
        </div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/3 lg:mr-16 lg:max-w-3xl pl-3 md:pl-0 pr-16 md:pr-0">
      <div 
        v-if="information.textColumn1" 
        class="h-text text-black rich-text lg:mb-0" 
        v-html="information.textColumn1"
      ></div>

      <br class="lg:hidden">

      <div 
        v-if="information.textColumn2" 
        class="h-text text-black rich-text lg:hidden" 
        v-html="information.textColumn2"
      ></div>
    </div>

    <div 
      v-if="information.textColumn2" 
      class="w-1/3 h-text text-black rich-text hidden lg:block max-w-3xl" 
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
      ...mapState(["information", "backLink", "device"]),
      ...mapGetters(["currentColor"])
  },
  components: { XIcon },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'index' || from.name === 'projects-slug') {
        vm.$store.dispatch('setBackLink', from.path)
        console.log(from.path)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.closer {
    position: fixed;
    top: 8px;
    right: 8px;

    @media screen and (min-width: theme('screens.md')) {
      position: relative;
      top: auto;
      right: auto;
      flex: 1;
    }

    a {
      transform: translateX(6px) translateY(-6px);

      @media screen and (min-width: theme('screens.lg')) {
        transform: translateX(8px) translateY(-8px);
      }
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
    width: 4.8rem;

    .device-mobile & {
      width: 3.4rem;
    }
  }

  .left {
    width: 50%;

    @media screen and (min-width: theme('screens.md')) {
      width: 217px;
    }

    @media screen and (min-width: theme('screens.lg')) {
      width: 173px;
    }

    & > div {
      position: sticky;
      top: 1rem;

      @media screen and (min-width: theme('screens.lg')) {
        top: 1.5rem;
      }
    }
  }

  // a {
  //   text-decoration-thickness: 2px;

  //   &:hover {
  //     text-decoration-line: underline;
  //   }
  // }
</style>
