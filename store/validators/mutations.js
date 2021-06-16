const mutations = {
  SET_VALIDATORS (state, data) {
    let totalVotingPower = 0

    for (let i = 0; i < data.length; i++) {
      if (data[i].voting_power) {
        totalVotingPower += parseFloat(data[i].voting_power)
      }
    }

    for (let i = 0; i < data.length; i++) {
      data[i].cumulative_share = -1
      data[i].uptime = 100 - data[i].uptime

      if (data[i].voting_power) {
        data[i].percent_voting_power = parseFloat(data[i].voting_power) / totalVotingPower
      } else {
        data[i].percent_voting_power = 0
      }

      if (i <= 125) {
        state.validators.active.push(data[i])
      } else {
        state.validators.inactive.push(data[i])
      }
    }
  },
  SET_CUMULATIVE_SHARE (state, data) {
    for (let i = 0; i < state.validators.active.length; i++) {
      if (state.validators.active[i].voting_power) {
        state.validators.active[i].cumulative_share = parseFloat(state.validators.active[i].voting_power) / data
      }
    }
    for (let i = 0; i < state.validators.inactive.length; i++) {
      if (state.validators.inactive[i].voting_power) {
        state.validators.inactive[i].cumulative_share = parseFloat(state.validators.inactive[i].voting_power) / data
      }
    }
  }
}

export default mutations
