import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({ commit }) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_VALIDATORS_QUERY
      }).then((response) => {
        commit('SET_VALIDATORS', response.data.validators)
        resolve(response.data.validators)
      }).catch((error) => {
        commit('SET_LOADED_TRUE', error)
        reject(error)
      })
    })
  },
  // eslint-disable-next-line require-await
  async GET_VALIDATOR_DETAIL ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_VALIDATOR_DETAIL_QUERY,
        variables: params
      }).then((response) => {
        if (!response.data.validator_detail.operator_address) {
          reject(response)
        } else {
          resolve(response.data.validator_detail)
          commit('SET_VALIDATOR', response.data.validator_detail)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
