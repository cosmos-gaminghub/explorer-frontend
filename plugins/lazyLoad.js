import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://www.mintscan.io/static/media/validator_none.83868b17.svg',
  loading: '/assets/images/loading-spin.0050a079.svg',
  attempt: 1
})
