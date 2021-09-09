<template>
  <main class="p-8 lg:p-10 relative">
    <div class="h-text text-black whitespace-pre-wrap">
      <p @mouseleave="overrideText = null" class="break-words">
        <span
          v-for="(word, index) in text" 
          :key="index"
          ref="word"
          @mouseenter="handleMouseEnter(word)"
          @click.prevent="handleClick(word)"
          class="cursor-default hover:text-blue whitespace-nowrap"
          :class="{ 'text-blue': index === activeTextItem }"
        >
          <a v-if="word.link" :href="word.link" class="whitespace-nowrap">{{ word.word }}&nbsp;</a>
          <span v-else class="whitespace-nowrap">{{ word.word }}&nbsp;</span>
        </span>
      </p>
    </div>

    <div ref="proxy" class="hidden"></div>

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
      overrideText: null,
      showAbout: false,
      tl: null,
      tlIsPaused: false,
      activeTextItem: null
    }
  },
  computed: {
    ...mapState(['text', 'about', 'isMobile']),
    defText () {
      return this.overrideText ? this.overrideText : this.activeTextItem ? this.text[this.activeTextItem].definition : false
    }
  },
  methods: {
    setOverrideText (obj) {
      this.showAbout = false
      this.overrideText = obj.definition
    },
    toggleAbout () {
      if (this.showAbout) {
        this.overrideText = null
      } else {
        if (this.isMobile ) this.tl.pause()
        this.activeTextItem = null
        this.overrideText = this.about.text
      }
      this.showAbout = !this.showAbout
    },
    handleMouseEnter (word) {
      if (!this.isMobile) this.setOverrideText(word)
    },
    handleClick (word) {
      if (this.isMobile) {
        this.tl.pause()
        this.activeTextItem = null
        this.setOverrideText(word)
      }
    }
  },
  mounted () {
    if (this.isMobile) {
      this.tl = this.$gsap.timeline({ paused: true, repeat: -1 })

      this.$refs.word.forEach((textItem, index) => {
        this.tl.to(this.$refs.proxy, { 
          duration: 0, 
          color: 'blue',
          delay: 1,
          onComplete: () => {
            console.log(index)
            this.activeTextItem = index
          }
        })
      })

      this.tl.play()
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
