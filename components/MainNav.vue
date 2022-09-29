<template>
  <header
    id="nav"
    class="fixed top-0 left-0 p-4 lg:p-6 w-full lg:w-auto"
  >
    <div class="flex md:justify-start items-start">
      <nuxt-link
        to="/information"
        class="home-link h-text w-1/2 md:w-auto md:mr-16"
        :style="{ color: currentColor }"
        ><span>New</span> Information</nuxt-link
      >
      <p
        v-if="currentProject"
        class="h-text w-1/2 md:w-auto"
        :style="{ color: currentColor }"
      >
        with {{ currentProject.title }}
      </p>
    </div>

    <div class="flex justify-end md:justify-start lg:hidden">
      <nuxt-link 
        v-if="previousLinkActive" 
        :to="`/projects/${previousProject.slug}`" 
        class="h-text w-1/2 md:w-auto"
        :style="{ color: currentColor }"
      >
        <span class="mr-8 md:mr-16">Previous</span>
        <span>{{ previousProject.title }}</span>
      </nuxt-link>
      <nuxt-link 
        v-if="nextLinkActive" 
        :to="`/projects/${nextProject.slug}`" 
        class="h-text w-1/2 md:w-auto"
        :style="{ color: currentColor }"
      >
        <span class="mr-8 md:mr-16">Next</span>
        <span>{{ nextProject.title }}</span>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "MainNav",
  computed: {
    ...mapState(['currentProject', 'nextLinkActive', 'previousLinkActive']),
    ...mapGetters(['currentColor', 'previousProject', 'nextProject'])
  }
};
</script>

<style lang="scss" scoped>
#nav {
  z-index: 500;

  .home-link {
    .device-desktop & {
      &:hover {
        span {
          opacity: 0;
        }
      }
    }
  }
}
</style>
