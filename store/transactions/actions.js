import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_TRANSACTIONS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_TRANSACTIONS', response.data.txs)
        resolve(response.data.txs)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_TRANSACTION_DETAIL ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_TRANSACTION_DETAIL_QUERY,
        variables: { tx_hash: params.tx_hash }
      }).then((response) => {
        if (!response.data.tx_detail.tx_hash) {
          reject(response)
        } else {
          // eslint-disable-next-line prefer-const
          let data = response.data.tx_detail
          data.current_denom = params.current_denom
          commit('SET_TRANSACTION_DETAIL', data)
          resolve()
        }
      }, process.env.REAL_TIME_DELAY_MS)
    })
  }
}
export default actions
