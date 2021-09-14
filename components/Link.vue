<template>
  <a 
    :href="word.link" 
    class="cursor-pointer whitespace-nowrap" 
    v-html="word.word"
  ></a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    word: Object
  }
}
</script>