<template>
  <main class="main relative">
    
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['text', 'about', 'email', 'isMobile', 'device', 'general'])
  }
}
</script>

<style lang="scss">
  
</style>
