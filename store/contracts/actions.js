import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CONTRACT,
        variables: params
      }).then((response) => {
        resolve(response.data.contracts)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
export default actions
