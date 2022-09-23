<template>
  <footer id="secondary-footer" class="fixed bottom-0 left-0 p-4 lg:px-6 lg:py-6 lg:pb-4 flex w-full">
    <div class="left flex justify-start items-center lg:mr-8">
      <nuxt-link 
        :to="$route.name == 'information' ? '/log' : '/information'"
        class="h-text text-white" 
      >?</nuxt-link>

      <nuxt-link 
        :to="$route.name == 'information' ? '/log' : '/information'" 
        class="h-text text-white ml-6 lg:ml-9 inline-block"
      >{{ $route.name == 'information' ? 'Log' : 'Information' }}</nuxt-link>
    </div>

    <div class="w-full">
      <!-- Begin Mailchimp Signup Form -->

      <div id="mc_embed_signup" class="inline">
        <form ref="form" action="https://studio.us5.list-manage.com/subscribe/post?u=449e3187f98c4ba89d808f08d&amp;id=7463220291" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll" class="relative flex w-full">
              <div class="mc-field-group input">
                <label class="wcag-hidden" for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
                <input 
                  type="email" 
                  value="" 
                  name="EMAIL" 
                  class="required email h-text py-1 px-2 w-full" 
                  :placeholder="isMobile ? 'Email' : 'Subscribe to our newsletter'" 
                  id="mce-EMAIL"
                  :style="{ backgroundColor: currentColor }"
                >
              </div>
              <div id="mce-responses" class="clear absolute">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
              </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_449e3187f98c4ba89d808f08d_7463220291" tabindex="-1" value=""></div>
              <div class="clear h-text flex-0-0">
                <button 
                  type="submit" 
                  name="subscribe" 
                  id="mc-embedded-subscribe" 
                  class="button py-1 px-2" 
                  aria-label="Click to subscribe to New Info's email list"
                  :style="{ backgroundColor: currentColor }"
                >
                  Subscribe
                </button>
              </div>
            </div>
        </form>
      </div>
      <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
      <!--End mc_embed_signup-->
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MainFooter',
  computed: {
    ...mapState(['currentProject', 'backLink', 'isMobile']),
    ...mapGetters(['currentColor'])
  }
}
</script>

<style lang="scss" scoped>
  #secondary-footer {
    z-index: 500;

    .left {
      width: 167px;
      flex: 0 0 auto;
    }

    #mc_embed_signup {
      .input {
        flex: 1 1 0%;
      }
      
      input {
        border: 0;
        outline: none;
        box-shadow: none;
        background: none;
        border-radius: 0px;

        &[type="email"] {
          border-left: 2px solid white;
          border-top: 2px solid white;
          border-bottom: 2px solid white;
          color: white;

          &::placeholder {
            color: white;
          }
        }
      }
      button {
        cursor: pointer;
        border: 2px solid white;
        width: auto;
        color: white;

        &:hover {
          background-color: white;
          color: black;
        }
      }

      div.mce_inline_error {
        display: none !important;
      }

      #mce-error-response {
        white-space: initial;
      }
    }
  }
</style>