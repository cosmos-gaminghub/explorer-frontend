import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  rewards: [],
  available: [],
  txs: [],
  commissions: [],
  unbonding: []
})

export default {
  namespaced: 'accounts',
  state,
  actions,
  mutations
}
