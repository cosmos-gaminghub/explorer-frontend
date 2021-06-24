import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      setInterval(() => {
        client.cache.data.clear()
        client.query({
          query: api.GET_BLOCKS_QUERY,
          variables: params
        }).then((response) => {
          commit('SET_BLOCKS', response.data.blocks)
        }).catch((error) => {
          reject(error)
        })
      }, process.env.REAL_TIME_DELAY_MS)
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
      setInterval(() => {
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
      }, process.env.REAL_TIME_DELAY_MS * 3)
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
        console.log('delegations: ', response)
        commit('SET_DELEGATIONS', response.data.delegations)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
