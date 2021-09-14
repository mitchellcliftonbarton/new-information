<template>
  <main class="p-8 lg:p-10 relative">
    <div class="h-text text-black whitespace-pre-wrap pr-20">
      <p 
        @mouseleave="overrideText = null" 
        class="break-words"
      >
        <component 
          v-for="(word, index) in text"
          :ref="word.definition ? 'word' : 'not-word'"
          :key="index"
          :is="word.link ? 'Link' : 'Word'"
          :word="word"
          @mouseenter.native="handleMouseEnter(word)"
          @click.native="handleClick(word)"
          :class="{ 'text-blue': index === activeTextItem }"
          class="hover:text-blue whitespace-nowrap inline-block lg:inline"
        ></component>
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
      <button 
        ref="aboutButton"
        class="mr-10"
        :class="{ 'text-blue': showAbout }"
      >?</button>
      <p v-if="defText" class="text-blue">{{ defText }}</p>
    </div>

    <button 
      @click.prevent="handleAsterisk()" 
      :class="{ 'text-blue': showAsterisk }"
      class="h-text text-black absolute top-10 right-10 hover:text-blue"
    >*</button>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Link from '@/components/Link'
import Word from '@/components/Word'

export default {
  data () {
    return {
      overrideText: null,
      showAbout: false,
      tl: null,
      tlIsPaused: false,
      activeTextItem: null,
      showAsterisk: false
    }
  },
  components: { Link, Word },
  computed: {
    ...mapState(['text', 'about', 'isMobile']),
    defText () {
      return this.overrideText !== null ? this.overrideText : this.activeTextItem !== null ? this.text[this.activeTextItem].definition : false
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
      if (!this.isMobile && word.definition) this.setOverrideText(word)
    },
    handleClick (word) {
      if (this.isMobile && word.definition) {
        this.tl.pause()
        this.activeTextItem = null
        this.setOverrideText(word)
      }
    },
    handleAsterisk () {
      if (this.showAsterisk) {
        this.showAsterisk = false
        this.overrideText = null
      } else {
        this.showAsterisk = true
        this.overrideText = 'All definitions are pulled directly from Merriam-Webster\'s dictionary.*'
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
            this.activeTextItem = index
            console.log(this.activeTextItem)
          }
        })
      })

      this.tl.play()
    }

    if (!this.isMobile) {
      this.$refs.aboutButton.addEventListener('mouseenter', () => {
        this.toggleAbout()
      })

      this.$refs.aboutButton.addEventListener('mouseleave', () => {
        this.toggleAbout()
      })
    } else {
      this.$refs.aboutButton.addEventListener('click', () => {
        this.toggleAbout()
      })
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
