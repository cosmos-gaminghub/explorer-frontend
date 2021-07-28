import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  validators: {
    active: [],
    inactive: [],
    origin: []
  },
  tokens: 0,
  loaded: false,
  validator: {}
})

export default {
  namespaced: 'validators',
  state,
  actions,
  mutations
}
