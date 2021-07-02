import api from '~/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_PROPOSALS_QUERY
      }).then((response) => {
        commit('SET_PROPOSALS', response.data.proposals)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_PROPOSAL_DETAIL ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_PROPOSAL_DETAIL_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_PROPOSAL_DETAIL', response.data.proposal_detail)
        resolve(response.data.proposal_detail)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_DEPOSIT ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_DEPOSIT_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_DEPOSIT', response.data.deposit)
        resolve(response.data.deposit)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_VOTE ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_VOTE_QUERY,
        variables: params
      }).then((response) => {
        commit('SET_VOTE', response.data.vote)
        resolve(response.data.vote)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
