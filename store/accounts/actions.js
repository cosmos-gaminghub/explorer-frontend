import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_REWARDS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_REWARDS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_REWARDS', response.data.rewards.rewards)
        resolve(response.data.rewards.rewards)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_COMMISSIONS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_COMMISSION_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_COMMISSIONS', response.data.commission.commission.commission)
        resolve(response.data.commission.commission.commission)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_UNBONDING ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_UNBONDINGS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_UNBONDING', response.data.unbonding.unbonding_responses)
        resolve(response.data.unbonding.unbonding_responses)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_BALANCES ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_BALANCES_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_AVAILABLE', response.data.balances.balances)
        resolve(response.data.balances.balances)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_ACCOUNT_TRANSACTIONS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_ACCOUNT_TRANSACTIONS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_TRANSACTIONS', response.data.account_transactions)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
