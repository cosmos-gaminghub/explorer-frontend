import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  transactions: [],
  tx_detail: {}
})

export default {
  namespaced: 'transactions',
  state,
  actions,
  mutations
}
