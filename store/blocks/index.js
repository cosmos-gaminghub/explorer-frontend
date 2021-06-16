import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  blocks: []
})

export default {
  namespaced: 'blocks',
  state,
  actions,
  mutations
}
