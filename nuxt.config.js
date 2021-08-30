// eslint-disable-next-line nuxt/no-cjs-in-config
const pkg = require('./package.json')
// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'CCN Game Explorer' },
      { hid: 'author', name: 'author', content: 'Paditech CCN' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/images/logo/logo_m.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&amp;display=swap' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script: [
      // { src: '/assets/js/jquery-3.3.1.min.js' },
      // { src: '/assets/vendor/bootstrap/js/bootstrap.min.js' }
      // { src: '/assets/vendor/owl/js/owl.carousel.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/assets/css/app.css',
    '~/static/assets/css/_for_element.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/lazyLoad.js',
    {
      src: '@/plugins/axios',
      ssr: false
    },
    '~/plugins/skeleton.js',
    '~/plugins/pagination2.js',
    '~/plugins/clipboard.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',
    // apollo
    '@nuxtjs/apollo',
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // bootstrap-vue
    ['bootstrap-vue/nuxt', { css: false }]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Apollo configuration
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_URL
      }
    }
  },

  axios: {
    proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // Configuration: list networks
  networks: [
    {
      id: 1,
      name: 'Cosmos',
      link: 'http://188.166.238.102:9900',
      logo: '/assets/images/icon/atom.png',
      denom: 'ATOM'
    },
    {
      id: 2,
      name: 'nibiru-2000',
      link: 'https://nibiru-2000.game-explorer.io/',
      logo: '/assets/images/icon/nibiru.png',
      denom: 'GAME'
    }
  ]
}
