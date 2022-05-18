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
  async GET_CONTRACT_DETAIL ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.query({
        query: api.GET_CONTRACT_DETAIL,
        variables: params
      }).then((response) => {
        resolve(response.data.contract_detail)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  async GET_CONTRACT_TRANSACTIONS ({}, params) {
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient
      client.cache.data.clear()
      client.query({
        query: api.GET_ACCOUNT_TRANSACTIONS_QUERY,
        variables: params
      }).then((response) => {
        resolve(response.data.account_transactions)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
export default actions
