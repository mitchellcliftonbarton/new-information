<template>
  <span 
    class="cursor-default" 
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
