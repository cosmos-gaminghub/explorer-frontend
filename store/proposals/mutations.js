const mutations = {
  SET_PROPOSALS (state, data) {
    state.proposals = data
  },
  SET_DEPOSIT (state, data) {
    let i = 0
    for (; i < data.length; i++) {
      const amountConvert = data[i].amount.split('uatom')
      data[i].amountConv = amountConvert[0] ? parseFloat(amountConvert[0]) : 0
    }
    state.deposit = data
  },
  SET_PROPOSAL_DETAIL (state, data) {
    state.proposal = data
  },
  SET_VOTE (state, data) {
    state.vote = data
  }
}

export default mutations
