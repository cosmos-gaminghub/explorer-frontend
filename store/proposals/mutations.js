const mutations = {
  SET_PROPOSALS (state, data) {
    let i = 0
    for (; i < 5; i++) {
      if (!data[i]) {
        break
      }
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
    const denom = data.current_denom === 'ATOM' ? 'uatom' : data.current_denom.toLowerCase()
    data = data.data
    for (; i < data.length; i++) {
      let amountConvert = data[i].amount.split(denom)
      amountConvert = amountConvert[0] ? parseFloat(amountConvert[0]) : 0
      if (['uatom', 'game'].includes(denom)) {
        amountConvert /= Math.pow(10, 6)
      }
      data[i].amountConv = amountConvert
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
