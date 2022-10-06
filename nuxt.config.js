import content from './content/index'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: content.seo.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: content.seo.description },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'keywords', name: 'keywords', content: content.seo.keywords },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: content.seo.title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: content.seo.description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: content.seo.image
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: content.seo.title
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: content.seo.title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: content.seo.description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: content.seo.image
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: content.seo.image
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: content.seo.title
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/src/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/gtag',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    ['nuxt-lazy-load', {
      observerConfig: {
        rootMargin: '0px 0px 50% 0px',
        threshold: 0
      }
    }]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    icon: {
      fileName: 'app-icon.png'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  generate: {
    routes() {
      const { projects } = content
      const routesToGenerate = []

      projects.forEach(project => {
        const slug = `/projects/${project.slug}`

        routesToGenerate.push(slug)
      })

      return routesToGenerate
    }
  }
}
