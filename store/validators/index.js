import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  validators: {
    active: [],
    inactive: []
  }
})

export default {
  namespaced: 'validators',
  state,
  actions,
  mutations
}
