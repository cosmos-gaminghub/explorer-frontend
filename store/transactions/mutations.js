import helper from '~/utils/helper'

const mutations = {
  SET_TRANSACTIONS (state, data) {
    let i = 0
    for (; i < data.length; i++) {
      data[i].total_amount = helper.getAmount(data[i].messages)
    }
    state.transactions = data
  },
  SET_TRANSACTION_DETAIL (state, data) {
    state.tx_detail = data
  }
}

export default mutations
