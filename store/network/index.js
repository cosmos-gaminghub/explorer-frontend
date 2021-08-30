import config from '@/nuxt.config'
import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  info: {},
  inflation: 0,
  bondedTokens: 0,
  loaded: false,
  stats_assets: {},
  lst_networks: config.networks,
  current_network: {}
})

export default {
  namespaced: 'network',
  state,
  actions,
  mutations
}
