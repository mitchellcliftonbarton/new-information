<template>
  <main class="p-8 lg:p-10 relative">
    <div class="h-text text-black whitespace-pre-wrap">
      <p @mouseleave="defText = null" class="break-words">
        <span
          v-for="(word, index) in text" 
          :key="index"
          @mouseenter="handleMouseEnter(word)"
          @click.prevent="handleClick(word)"
          class="cursor-default hover:text-blue whitespace-nowrap"
        >
          <a v-if="word.link" :href="word.link" class="whitespace-nowrap">{{ word.word }}&nbsp;</a>
          <span v-else class="whitespace-nowrap">{{ word.word }}&nbsp;</span>
        </span>
      </p>
    </div>

    <div 
      :class="{ 'active': showAbout }" 
      class="about fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <img 
        :src="require(`@/src/images/${about.img}`)" 
        :alt="about.imgAlt"
      >
    </div>

    <div class="bottom fixed bottom-0 left-0 p-8 lg:p-10 h-text text-black flex items-end w-full">
      <button @click.prevent="toggleAbout()" class="mr-10">?</button>
      <p v-if="defText" class="text-blue">{{ defText }}</p>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      defText: null,
      showAbout: false
    }
  },
  computed: {
    ...mapState(['text', 'about', 'isMobile'])
  },
  methods: {
    setDefText (obj) {
      this.showAbout = false
      this.defText = obj.definition
    },
    toggleAbout () {
      this.showAbout ? this.defText = null : this.defText = this.about.text
      this.showAbout = !this.showAbout
    },
    handleMouseEnter (word) {
      if (!this.isMobile) this.setDefText(word)
    },
    handleClick (word) {
      if (this.isMobile) this.setDefText(word)
    }
  }
}
</script>

<style lang="scss" scoped>
  .about {
    opacity: 0;
    pointer-events: none;
    z-index: -1;

    img {
      max-height: 60%;
    }

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
