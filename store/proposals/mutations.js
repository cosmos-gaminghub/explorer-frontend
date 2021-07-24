const mutations = {
  SET_PROPOSALS (state, data) {
    let i = 0
    for (; i < 5; i++) {
      const value = data[i].tally
      if (!value) {
        continue
      }
      const totalTally = parseFloat(value.yes) + parseFloat(value.no) + parseFloat(value.no_with_veto) + parseFloat(value.abstain)
      if (!totalTally) {
        continue
      }
      let max = {
        text: 'Yes',
        value: parseFloat(value.yes),
        total: totalTally
      }
      if (value.no > max.value) {
        max = {
          text: 'No',
          value: parseFloat(value.no),
          total: totalTally
        }
      }
      if (value.no_with_veto > max.value) {
        max = {
          text: 'No With Veto',
          value: parseFloat(value.no_with_veto),
          total: totalTally
        }
      }
      if (value.abstain > max.value) {
        max = {
          text: 'Abstain',
          value: parseFloat(value.abstain),
          total: totalTally
        }
      }
      data[i].max = max
    }
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
  },
  SET_EMPTY (state) {
    state.proposal = {}
  }
}

export default mutations
