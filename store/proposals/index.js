import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  proposals: [],
  proposal: {}
})

export default {
  namespaced: 'proposals',
  state,
  actions,
  mutations
}
