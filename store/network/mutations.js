const mutations = {
  SET_STATUS_INFO (state, data) {
    data.bonded_token_percent = 0
    data.total_supply = 0
    state.bondedTokens = data.bonded_tokens
    if (data && data.total_supply_tokens && data.total_supply_tokens.supply) {
      let totalSupplyTokens = 0
      let item
      for (let i = 0; i < data.total_supply_tokens.supply.length; i++) {
        item = data.total_supply_tokens.supply[i]
        totalSupplyTokens += parseInt(item.amount)
      }

      if (totalSupplyTokens) {
        data.bonded_token_percent = parseInt((data.bonded_tokens / totalSupplyTokens) * 10000) / 100
      }
      data.total_supply = totalSupplyTokens
    }

    state.info = data
    state.loaded = true
  },
  SET_INFLATION_INFO (state, data) {
    state.inflation = data
  }
}

export default mutations
