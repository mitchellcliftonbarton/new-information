<template>
  <main class="main relative">
    <div 
      class="h-text text-black"
    >
      <div 
        @mouseleave="overrideText = null" 
        class="break-words"
      >
        <div class="asterisk-container flex justify-end items-start float-right w-10 h-10">
          <button
            ref="asterisk"
            :class="{ 'text-blue': showAsterisk }"
            class="asterisk h-text text-black absolute hover:text-blue"
          >*</button>
        </div>

        <component 
          v-for="(word, index) in text"
          :key="index"
          :is="word.link ? 'Link' : 'Word'"
          :word="word"
          :data-index="index"
          @mouseenter.native="handleMouseEnter(word)"
          @click.native="handleClick(word)"
          :class="{ 'text-blue': index === activeTextItem && word.definition, 'word-item hover:text-blue': word.definition }"
          class="whitespace-nowrap inline-block lg:inline"
        ></component>

        <!-- Begin Mailchimp Signup Form -->

        <div id="mc_embed_signup" class="inline">
          <form ref="form" action="https://studio.us5.list-manage.com/subscribe/post?u=449e3187f98c4ba89d808f08d&amp;id=7463220291" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate inline whitespace-nowrap" target="_blank" novalidate>
              <div id="mc_embed_signup_scroll" class="inline relative">
                <div class="mc-field-group inline">
                  <label class="hidden" for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
                  <input type="email" value="" name="EMAIL" class="required email h-text" id="mce-EMAIL">
                </div>
                <div id="mce-responses" class="clear absolute mt-5">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_449e3187f98c4ba89d808f08d_7463220291" tabindex="-1" value=""></div>
                <div class="clear inline h-text">
                  <button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 10"><rect class="cls-1" y="4.01" width="47.01" height="1.99"/><polygon class="cls-1" points="36.26 10 35.56 8.08 44.02 5 35.56 1.92 36.26 0 50 5 36.26 10"/></svg>
                  </button>
                </div>
              </div>
          </form>
        </div>
        <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
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

    <div class="about-button-container bottom fixed bottom-0 left-0 h-text text-black flex items-end w-full">
      <button 
        ref="aboutButton"
        class="mr-10"
        :class="{ 'text-blue': showAbout }"
      >?</button>
      <p v-if="defText" class="text-blue">{{ defText }}</p>
    </div>
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
    ...mapState(['text', 'about', 'email', 'isMobile', 'device']),
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
        if (this.device === 'mobile' ) this.tl.pause()
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
    },
    getDeviceType () {
        if (process.client) {
          const ua = navigator.userAgent
          if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
              return "tablet"
          }
          else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
              return "mobile"
          }
          return "desktop"
        }
    }
  },
  mounted () {
    this.$store.dispatch('setDevice', this.getDeviceType())

    if (this.device === 'mobile') {
      this.tl = this.$gsap.timeline({ paused: true, repeat: -1 })
      const words = Array.from(document.querySelectorAll('.word-item'))

      words.forEach((textItem, index) => {
        this.tl.to(this.$refs.proxy, { 
          duration: 0, 
          color: 'blue',
          delay: 1,
          onComplete: () => {
            this.activeTextItem = parseInt(textItem.dataset.index)
          }
        })
      })

      this.tl.play()
    }

    if (this.device === 'desktop') {
      this.$refs.aboutButton.addEventListener('mouseenter', () => {
        this.toggleAbout()
      })

      this.$refs.aboutButton.addEventListener('mouseleave', () => {
        this.toggleAbout()
      })

      this.$refs.asterisk.addEventListener('mouseenter', () => {
        this.handleAsterisk()
      })

      this.$refs.asterisk.addEventListener('mouseleave', () => {
        this.handleAsterisk()
      })

      this.$refs.form.addEventListener('mouseenter', () => {
        if (this.email.definition) this.overrideText = this.email.definition
      })

      this.$refs.form.addEventListener('mouseleave', () => {
        this.overrideText = null
      })
    } else {
      this.$refs.aboutButton.addEventListener('click', () => {
        this.toggleAbout()
      })

      this.$refs.asterisk.addEventListener('click', () => {
        this.handleAsterisk()
      })
    }
  }
}
</script>

<style lang="scss">
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

  .about-button-container {
    @apply p-8;

    .device-mobile & {
      @apply p-6;
    }
  }

  .asterisk {
    // @apply top-8 right-8;

    // .device-mobile & {
    //   @apply top-6 right-6;
    //   font-size: 6rem;
    //   transform: translateY(-10px);
    // }

    &-container {
      width: 4rem;
      height: 5rem;
    }
  }

  #mc_embed_signup {
    // margin-left: -10px;

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
          border-bottom: 2px solid blue;
          color: blue;
        }

        &.mce_inline_error {
          // border-bottom: 2px solid red;
          border-bottom: 2px solid black;
        }

        &:hover {
          border-bottom: 2px solid blue;
          color: blue;
        }
      }
    }

    button {
      cursor: pointer;

      &:hover {
        color: blue;

        svg {
          rect,
          polygon {
            fill: blue;
          }
        }
      }

      svg {
        width: 50px;

        rect,
        polygon {
          fill: #231f20;
        }
      }
    }

    div.mce_inline_error {
      display: none !important;
    }
  }
</style>
