import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  info: {},
  inflation: 0,
  bondedTokens: 0,
  loaded: false
})

export default {
  namespaced: 'network',
  state,
  actions,
  mutations
}
