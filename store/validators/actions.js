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
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default actions
