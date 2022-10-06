<template>
  <svg class="previous-arrow" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3388 1.25003L1.5 10.0889L10.3388 18.9277" :stroke="color" stroke-width="2"/>
    <line x1="2.08887" y1="10.0889" x2="52.0889" y2="10.0889" :stroke="color" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: 'PreviousArrow',
  props: {
    color: String
  }
}
</script>

<style scoped>
  .previous-arrow {
    width: 5rem;
  }
</style>