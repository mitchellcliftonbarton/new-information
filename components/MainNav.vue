<template>
  <header
    id="nav"
    class="fixed top-0 left-0 w-full flex justify-between items-start"
    :class="device === 'desktop' ? 'p-6' : 'p-4 lg:p-6'"
  >
    <div
      class="main-link flex flex-col md:flex-row md:justify-start items-start"
    >
      <nuxt-link
        to="/about"
        class="home-link h-text w-3/4 md:w-auto md:mr-16"
        :style="{ color: currentColor }"
        ><span>New</span> Information</nuxt-link
      >
      <p
        v-if="currentProject"
        class="h-text w-3/4 md:w-auto"
        :style="{ color: currentColor }"
      >
        with {{ currentProject.title }}
      </p>
    </div>

    <nuxt-link to="/about" class="h-text" :style="{ color: currentColor }">
      About
    </nuxt-link>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "MainNav",
  computed: {
    ...mapState([
      "currentProject",
      "nextLinkActive",
      "previousLinkActive",
      "device"
    ]),
    ...mapGetters(["currentColor", "previousProject", "nextProject"])
  }
};
</script>

<style lang="scss" scoped>
#nav {
  z-index: 500;

  .main-link {
    flex: 1;
  }

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
