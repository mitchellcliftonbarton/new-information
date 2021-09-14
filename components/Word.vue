<template>
  <span 
    class="cursor-default whitespace-nowrap" 
    v-html="word.word"
  ></span>
</template>

<script>
export default {
  name: 'Word',
  props: {
    word: Object
  }
}
</script>
