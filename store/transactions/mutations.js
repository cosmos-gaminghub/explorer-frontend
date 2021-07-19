import helper from '~/utils/helper'

const mutations = {
  SET_TRANSACTIONS (state, data) {
    state.transactions = helper.convertValueTxs(data)
  },
  SET_TRANSACTION_DETAIL (state, data) {
    state.tx_detail = data
    state.tx_detail.columns = helper.getColumnFromMsgTx(data.messages, data.logs, state.tx_detail.timestamp)
  },
  SET_EMPTY_TX (state) {
    state.tx_detail = {}
  }
}

export default mutations
