<template>
  <div 
    class="main relative min-h-screen w-full p-4 lg:p-6 grid grid-cols-8 lg:grid-cols-6 gap-4 lg:gap-6 pb-32 lg:pb-0" 
    :style="{ backgroundColor: currentColor }"
  >
    <div class="col-span-7 lg:col-span-5">
      <p 
        v-for="(item, index) in log" 
        :key="index"
        class="item h-text text-white grid grid-cols-7 gap-4 lg:block"
      >
        <span class="date mr-8 hidden lg:inline">On {{ item.date }}</span>
        <span class="lg:mr-8 col-span-4">New Information</span>
        <span class="col-span-3">{{ item.text }}</span>
      </p>
    </div>

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
      ...mapState(["log", "backLink"]),
      ...mapGetters(["currentColor"])
  },
  components: { XIcon },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to, from)
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

  .item {
    .date {
      display: none;
    }

    &:hover {
      @media screen and (min-width: theme('screens.lg')) {
        .date {
          display: inline;
        }
      }
    }
  }
</style>

