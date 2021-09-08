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
        commit('SET_REWARDS', [])
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_ACCOUNT_DETAIL ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_ACCOUNT_DETAIL_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_ACC_DETAIL', response.data.account_detail)
        resolve(response.data.account_detail)
      }).catch((error) => {
        commit('SET_ACC_DETAIL', { is_validator: false })
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
        commit('SET_COMMISSIONS', [])
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
        commit('SET_UNBONDING', [])
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
        commit('SET_AVAILABLE', [])
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
        // eslint-disable-next-line prefer-const
        let dataToRender = {}
        dataToRender.data = response.data.account_transactions
        dataToRender.acc_address = params.acc_address
        commit('SET_TRANSACTIONS', dataToRender)
        resolve()
      }).catch((error) => {
        commit('SET_TRANSACTIONS', {
          data: [],
          acc_address: params.acc_address
        })
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_REDELEGATIONS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_REDELEGATIONS_QUERY,
        variables: params
      }).then((response) => {
        resolve(response.data.redelegations.redelegation_responses)
      }).catch((error) => {
        resolve([])
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_PRICE ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_PRICE_QUERY
      }).then((response) => {
        commit('SET_PRICE', response.data.price)
        resolve(response.data.price)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
