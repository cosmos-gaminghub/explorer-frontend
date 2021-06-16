import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  transactions: []
})

export default {
  namespaced: 'transactions',
  state,
  actions,
  mutations
}
