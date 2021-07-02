const mutations = {
  SET_REWARDS (state, data) {
    state.rewards = data
  },
  SET_AVAILABLE (state, data) {
    state.available = data
  },
  SET_TRANSACTIONS (state, data) {
    state.txs = data
  },
  SET_COMMISSIONS (state, data) {
    state.commissions = data
  },
  SET_UNBONDING (state, data) {
    state.unbonding = data
  }
}

export default mutations
