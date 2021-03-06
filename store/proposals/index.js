import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  proposals: [],
  proposal: {},
  deposit: [],
  vote: []
})

export default {
  namespaced: 'proposals',
  state,
  actions,
  mutations
}
