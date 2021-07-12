import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  blocks: [],
  block_detail: {},
  block_txs: [],
  proposedBlocks: [],
  lastProposedBlocks: 0,
  uptimes: [],
  powerEvents: [],
  delegations: [],
  paginateBlocks: {
    before: 0,
    size: 50,
    itemsPerPage: 5,
    totalRecords: 0,
    currentPage: 1
  },
  paginateTx: {
    before: 0,
    size: 50,
    itemsPerPage: 5,
    totalRecords: 0,
    currentPage: 1
  }
})

export default {
  namespaced: 'blocks',
  state,
  actions,
  mutations
}
