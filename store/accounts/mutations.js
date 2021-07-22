import helper from '~/utils/helper'

const mutations = {
  SET_REWARDS (state, data) {
    state.rewards = data
  },
  SET_AVAILABLE (state, data) {
    state.available = data
  },
  SET_TRANSACTIONS (state, data) {
    state.txs = helper.convertValueTxs(data)
  },
  SET_COMMISSIONS (state, data) {
    state.commissions = data
  },
  SET_UNBONDING (state, data) {
    state.unbonding = data
  },
  SET_PRICE (state, data) {
    state.price = data
  }
}

export default mutations