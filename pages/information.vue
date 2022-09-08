<template>
  <div class="main relative">
    <p>Information</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['projects'])
  }
}
</script>

<style lang="scss">
  
</style>
