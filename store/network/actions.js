import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_NETWORK_STATUS_QUERY
      }).then((response) => {
        commit('SET_STATUS_INFO', response.data.status)
        resolve(response.data.status)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_DATA_INFLATION ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_INFLATION_QUERY
      }).then((response) => {
        commit('SET_INFLATION_INFO', response.data.inflation.inflation)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_STATS ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_STATS_QUERY
      }).then((response) => {
        commit('SET_STATS_ASSETS', response.data.stats_assets)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
