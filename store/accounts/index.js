import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  rewards: [],
  available: [],
  txs: [],
  commissions: [],
  unbonding: [],
  price: [],
  redelegations: {},
  txs_paginations: {
    before: 0,
    size: 50,
    is_empty: false
  }
})

export default {
  namespaced: 'accounts',
  state,
  actions,
  mutations
}
