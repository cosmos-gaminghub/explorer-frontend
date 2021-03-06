import helper from '~/utils/helper'

const mutations = {
  SET_STATUS_INFO (state, data) {
    state.bondedTokens = data.bonded_tokens

    data.total_supply = 0
    data.total_supply = helper.totalSupplyTokens(data)
    data.bonded_token_percent = data.total_supply ? ((data.bonded_tokens / data.total_supply) * 100).toFixed(2) : 0

    state.info = data
    state.loaded = true
  },
  SET_LOADED_TRUE (state) {
    state.loaded = true
  },
  SET_INFLATION_INFO (state, data) {
    state.inflation = data
  },
  SET_STATS_ASSETS (state, data) {
    state.stats_assets = data.reverse()
  },
  SET_CURRENT_NETWORK (state) {
    // eslint-disable-next-line prefer-const
    let currentId = process.env.NETWORK_ID || 1
    state.lst_networks.forEach((item) => {
      if (item.id === parseInt(currentId)) {
        state.current_network = item
      }
    })
  }
}

export default mutations
