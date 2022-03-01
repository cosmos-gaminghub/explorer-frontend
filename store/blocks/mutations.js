import helper from '~/utils/helper'

const mutations = {
  SET_BLOCKS (state, data) {
    state.blocks = data
  },
  SET_BLOCK_DETAIL (state, data) {
    state.block_detail = data
  },
  SET_BLOCK_TXS (state, data) {
    state.block_txs = helper.convertValueTxs(data)
  },
  SET_PROPOSED_BLOCKS (state, data) {
    state.paginateBlocks.before = data[data.length - 1] ? data[data.length - 1].height : 0
    if (data[0] && data[0].total_records) {
      state.paginateBlocks.totalRecords = data[0].total_records
    }
    let indexBlock = (state.paginateBlocks.currentPage - 1) * state.paginateBlocks.size
    let i = 0
    for (; i < data.length; i++) {
      data[i].index = indexBlock
      indexBlock++
    }
    state.paginateBlocks.currentPage++
    state.proposedBlocks = state.proposedBlocks.concat(data)
  },
  SET_UPTIMES (state, data) {
    if (data) {
      state.lastProposedBlocks = data.last_height
      state.uptimes = []
      for (const uptime in data.uptime) {
        state.uptimes.push(data.uptime[uptime].height)
      }
    }
  },
  SET_POWER_EVENT (state, data) {
    state.paginateTx.before = data[data.length - 1] ? data[data.length - 1].height : 0
    if (data[0] && data[0].total_records) {
      state.paginateTx.totalRecords = data[0].total_records
    }
    let indexEvent = (state.paginateTx.currentPage - 1) * state.paginateTx.size
    let i = 0
    for (i in data) {
      data[i].index = indexEvent
      indexEvent++
    }
    state.paginateTx.currentPage++
    state.powerEvents = state.powerEvents.concat(data)
  },
  SET_DELEGATORS (state, data) {
    state.paginateDelegators.offset = state.paginateDelegators.offset + data.delegators.length
    state.paginateDelegators.totalRecords = data.total_count
    let indexDelegator = (state.paginateDelegators.currentPage - 1) * state.paginateDelegators.limit
    let i = 0
    for (i in data.delegators) {
      data.delegators[i].index = indexDelegator
      indexDelegator++
    }
    state.paginateDelegators.currentPage++
    state.delegators = state.delegators.concat(data.delegators)
  },
  SET_DELEGATOR_OFFSET (state, data) {
    state.paginateDelegators.offset = data
  },
  SET_DELEGATIONS (state, data) {
    state.delegations = data
  },
  SET_EMPTY_PROPOSED_BLOCKS (state) {
    state.lastProposedBlocks = []
    state.proposedBlocks = []
    state.paginateBlocks.before = 0
    state.paginateBlocks.totalRecords = 0
    state.paginateBlocks.currentPage = 1
  },
  SET_PAGE_BLOCKS (state, data) {
    state.paginateBlocks.before = data.before
  },
  SET_EMPTY_POWER_EVENTS (state) {
    state.powerEvents = []
    state.paginateTx.before = 0
    state.paginateTx.totalRecords = 0
    state.paginateTx.currentPage = 1
  },
  SET_EMPTY_DELEGATORS (state) {
    state.delegators = []
    state.paginateDelegators.offset = 0
    state.paginateDelegators.totalRecords = 0
    state.paginateDelegators.currentPage = 1
  },
  SET_PAGE_POWER_EVENTS (state, data) {
    state.paginateTx.before = data.before
  }
}

export default mutations
