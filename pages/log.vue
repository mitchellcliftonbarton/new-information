<template>
  <div 
    class="main relative min-h-screen w-full p-4 lg:p-6 grid grid-cols-8 lg:grid-cols-6 gap-4 lg:gap-6 pb-32 lg:pb-0" 
    :style="{ backgroundColor: currentColor }"
  >
    <div class="col-span-8 md:col-span-7 lg:col-span-5">
      <p 
        v-for="(item, index) in log" 
        :key="index"
        class="item h-text text-black flex md:block"
      >
        <span class="date mr-16 hidden lg:inline">On {{ item.date }}</span>
        <span class="md:mr-16 title flex-1">New Information</span>
        <span class="w-1/2 md:w-full text pr-16 md:pr-0 pl-3 md:pl-0">{{ item.text }}</span>
      </p>
    </div>

    <div class="closer col-span-1 flex justify-end items-start">
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
      ...mapState(["log", "backLink"]),
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
    }
  }

  .closer > div {
    position: sticky;
    top: 1rem;
  }

  .closer a {
    transform: translateX(6px) translateY(-6px);

    @media screen and (min-width: theme('screens.lg')) {
      transform: translateX(8px) translateY(-8px);
    }
  }

  .closer svg {
    width: 3.4rem;

    @media screen and (min-width: theme('screens.lg')) {
      width: 4.8rem;
    }
  }

  .item {
    @media screen and (min-width: theme('screens.md')) {
      text-indent: -212px;
      padding-left: 212px;
    }

    @media screen and (min-width: theme('screens.lg')) {
      text-indent: -212px;
      padding-left: 212px;
    }

    .date {
      display: none;
      flex: 0 0 auto;

      @media screen and (min-width: theme('screens.lg')) {
        flex: 0 0 auto;
      }
    }

    .title {
      flex: 1;
      width: 50%;

      @media screen and (min-width: theme('screens.md')) {
        width: 155px;
        flex: 0 0 auto;
        flex: none;
      }

      @media screen and (min-width: theme('screens.lg')) {
        width: 173px;
      }
    }

    .text {
      // flex: 1;
      width: 50%;

      @media screen and (min-width: theme('screens.md')) {
        flex: none;
      }
    }

    .device-desktop & {
      &:hover {
        .date {
          display: inline;
        }

        .title {
          flex: 0 0 auto;
          width: auto;
          margin-right: 4rem;
        }

        .text {
          width: auto;
          flex: 1;
        }
      }
    }
  }
</style>

