import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_BLOCKS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_BLOCKS', response.data.blocks)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_BLOCK_DETAIL ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_BLOCK_DETAIL,
        variables: params
      }).then((response) => {
        if (!response.data.block_detail.height) {
          reject(response)
        } else {
          commit('SET_BLOCK_DETAIL', response.data.block_detail)
          resolve()
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_BLOCK_TXS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_BLOCK_TXS,
        variables: params
      }).then((response) => {
        commit('SET_BLOCK_TXS', response.data.block_txs)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_PROPOSED_BLOCKS ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_PROPOSED_BLOCKS_QUERY,
        variables: params
      }).then((response) => {
        if (params.last) {
          commit('SET_LAST_PROPOSED_BLOCKS', response.data.proposed_blocks)
        } else {
          commit('SET_PROPOSED_BLOCKS', response.data.proposed_blocks)
          resolve()
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_UPTIMES ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_UPTIMES,
        variables: params
      }).then((response) => {
        commit('SET_UPTIMES', response.data.uptimes)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_POWER_EVENT_QUERY ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_POWER_EVENT_QUERY,
        variables: params
      }).then((response) => {
        resolve()
        commit('SET_POWER_EVENT', response.data.power_events)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_DELEGATIONS_QUERY ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_DELEGATIONS_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_DELEGATIONS', response.data.delegations)
        resolve(response.data.delegations)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
