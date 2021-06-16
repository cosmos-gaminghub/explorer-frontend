import api from '~/utils/api'

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
      }, 1000)
    })
  }
}
export default actions
