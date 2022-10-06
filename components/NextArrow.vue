<template>
  <svg class="next-arrow" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M39.25 18.9277L48.0889 10.0889L39.25 1.25003" :stroke="color" stroke-width="2"/>
    <line x1="47.5" y1="10.0889" x2="-2.5" y2="10.0889" :stroke="color" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: 'NextArrow',
  props: {
    color: String
  }
}
</script>

<style scoped>
  .next-arrow {
    width: 5rem;
  }
</style>