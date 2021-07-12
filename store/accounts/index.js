import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  rewards: [],
  available: [],
  txs: [],
  commissions: [],
  unbonding: [],
  price: [],
  redelegations: {}
})

export default {
  namespaced: 'accounts',
  state,
  actions,
  mutations
}
