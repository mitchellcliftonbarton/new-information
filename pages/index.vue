<template>
  <main class="p-8 lg:p-10 relative">
    <div 
      :class="{ 'hidden': showAbout && isMobile}"
      class="h-text text-black whitespace-pre-wrap pr-20"
    >
      <div 
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

        <!-- Begin Mailchimp Signup Form -->

        <div id="mc_embed_signup" class="inline">
          <form action="https://studio.us5.list-manage.com/subscribe/post?u=449e3187f98c4ba89d808f08d&amp;id=7463220291" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate inline" target="_blank" novalidate>
              <div id="mc_embed_signup_scroll" class="inline">
                <label class="hidden" for="mce-EMAIL">Subscribe</label>
                <input type="email" value="" name="EMAIL" class="email h-text" id="mce-EMAIL" required>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups -->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_449e3187f98c4ba89d808f08d_7463220291" tabindex="-1" value=""></div>
                <div class="clear inline h-text"><input type="submit" value="→" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
              </div>
          </form>
        </div>

        <!--End mc_embed_signup-->
      </div>
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
      this.showAsterisk = false
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
        this.showAbout = false
        this.overrideText = null
      } else {
        this.showAsterisk = true
        this.showAbout = false
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

  #mc_embed_signup {
    margin-left: -10px;

    input {
      border: 0;
      outline: none;
      box-shadow: none;
      background: none;
      border-radius: 0px;

      &[type="email"] {
        border-bottom: 2px solid black;
        width: 280px;

        .device-mobile & {
          width: auto;
        }

        &:active,
        &:focus {
          outline: none;
          box-shadow: none;
        }
      }

      &[type="submit"] {
        cursor: pointer;
      }
    }
  }
</style>
