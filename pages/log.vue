<template>
  <div 
    class="main relative h-screen w-full p-6 grid grid-cols-6 gap-6" 
    :style="{ backgroundColor: currentColor }"
  >
    <div class="col-span-5">
      <p 
        v-for="(item, index) in log" 
        :key="index"
        class="item h-text text-white"
      >
        <span class="date mr-8">On {{ item.date }}</span>
        <span class="mr-8">New Information</span>
        <span>{{ item.text }}</span>
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
    width: 4.8rem;
  }

  .item {
    .date {
      display: none;
    }

    &:hover {
      .date {
        display: inline;
      }
    }
  }
</style>

