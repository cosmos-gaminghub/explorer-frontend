import api from '@/utils/api'

const actions = {
  // eslint-disable-next-line require-await
  async GET_DATA ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CODE,
        variables: params
      }).then((response) => {
        resolve(response.data.codes)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  async GET_CODE_DETAIL ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CODE_DETAIL,
        variables: params
      }).then((response) => {
        resolve(response.data.code_detail)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async GET_CODE_TRANSACTIONS ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CODE_TRANSACTIONS,
        variables: params
      }).then((response) => {
        resolve(response.data.code_transactions)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async GET_CODE_CONTRACTS ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CODE_CONTRACTS,
        variables: params
      }).then((response) => {
        resolve(response.data.code_contracts)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
export default actions
