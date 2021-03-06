import helper from '~/utils/helper'

const mutations = {
  SET_VALIDATORS (state, data) {
    state.validators.origin = data
    let totalBonedTokens = 0

    for (let i = 0; i < data.length; i++) {
      data[i].index = i
      data[i].uptime = 100 - data[i].uptime
      data[i].width_cumulative_share = 0

      if (helper.isActiveValidator(data[i])) {
        totalBonedTokens += data[i].voting_power
        state.validators.active.push(data[i])
      } else {
        state.validators.inactive.push(data[i])
      }
    }
    state.tokens = totalBonedTokens
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
  },
  SET_IMAGE_URL (state, object) {
    const { type, index, imageUrl } = object
    state.validators[type][index].image_url = imageUrl
  },
  SET_VALIATOR_IMAGE_URL (state, imageUrl) {
    state.validator.image_url = imageUrl
  }
}

export default mutations
