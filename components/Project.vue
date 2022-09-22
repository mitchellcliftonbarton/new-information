<template>
  <div class="project w-full h-screen relative">
    <NextLinks v-if="!isMobile" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NextLinks from '~/components/NextLinks.vue'

export default {
  name: 'Project',
  components: { NextLinks },
  computed: {
    ...mapState(['currentProject', 'isMobile']),
    ...mapGetters(['previousProject', 'nextProject', 'currentColor']),
  }
}
</script>