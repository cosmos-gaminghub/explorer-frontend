import helper from '~/utils/helper'

const mutations = {
  SET_VALIDATORS (state, data) {
    state.validators.origin = data

    for (let i = 0; i < data.length; i++) {
      data[i].index = i
      data[i].uptime = 100 - data[i].uptime
      data[i].width_cumulative_share = 0

      if (helper.isActiveValidator(data[i])) {
        state.validators.active.push(data[i])
      } else {
        state.validators.inactive.push(data[i])
      }
    }
    state.loaded = true
  },
  SET_CUMULATIVE_SHARE (state, data) {
    state.tokens = data
    state.calculatedCumulativeShare = true
  },
  SET_VALIDATOR (state, data) {
    state.loaded = true
    state.validator = data
  },
  SET_EMPTY_VALIDATORS (state) {
    state.validators = {
      active: [],
      inactive: [],
      origin: []
    }
    state.tokens = 0
    state.calculatedCumulativeShare = false
    state.loaded = false
  },
  SET_EMPTY_VALIDATOR (state) {
    state.validator = {}
  },
  SET_LOADED_TRUE (state) {
    state.loaded = true
  }
}

export default mutations
