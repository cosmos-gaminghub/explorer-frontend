import helper from '~/utils/helper'

const mutations = {
  SET_REWARDS (state, data) {
    state.rewards = data
  },
  SET_AVAILABLE (state, data) {
    state.available = data
  },
  SET_TRANSACTIONS (state, data) {
    for (const i in data) {
      data[i].total_amount = helper.getAmount(data[i].messages)
    }
    state.txs = data
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
