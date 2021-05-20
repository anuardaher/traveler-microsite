export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'traveler-microsite',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/amadeus/': {
      target: 'https://test.api.amadeus.com',
      pathRewrite: { '^/amadeus/': '/' },
    },
    '/weatherapi/': {
      target: 'https://dataservice.accuweather.com',
      pathRewrite: { '^/weatherapi/': '/' },
    },
  },

  env: {
    HOTEL_API_CLIENT_ID: process.env.HOTEL_API_CLIENT_ID,
    HOTEL_API_CLIENT_SECRET: process.env.HOTEL_API_CLIENT_SECRET,
    WEATHER_API_SECRET: process.env.WEATHER_API_SECRET,
    MAPS_API: process.env.MAPS_API,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
