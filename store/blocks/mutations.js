const mutations = {
  SET_BLOCKS (state, data) {
    state.blocks = data
  },
  SET_PROPOSED_BLOCKS (state, data) {
    state.paginateBlocks.before = data[data.length - 1] ? data[data.length - 1].height : 0
    state.paginateBlocks.totalRecords = (data[0]) ? data[0].total_records : 0
    let indexBlock = (state.paginateBlocks.currentPage - 1) * state.paginateBlocks.size
    let i = 0
    for (; i < data.length; i++) {
      data[i].index = indexBlock
      indexBlock++
    }
    state.paginateBlocks.currentPage++
    state.proposedBlocks = state.proposedBlocks.concat(data)
  },
  SET_LAST_PROPOSED_BLOCKS (state, data) {
    let i = 0
    let item
    for (item in data) {
      state.lastProposedBlocks[i] = {
        height: data[item].height
      }
      i++
    }
  },
  SET_UPTIMES (state, data) {
    const _blocsArr = state.lastProposedBlocks
    if (_blocsArr.length >= 100) { _blocsArr.pop() }
    state.lastProposedBlocks = [{ height: data.last_height }].concat(_blocsArr)
  },
  SET_POWER_EVENT (state, data) {
    state.paginateTx.before = data[data.length - 1] ? data[data.length - 1].height : 0
    state.paginateTx.totalRecords = (data[0]) ? data[0].total_records : 0
    let indexEvent = (state.paginateTx.currentPage - 1) * state.paginateTx.size
    let i = 0
    for (i in data) {
      data[i].index = indexEvent
      indexEvent++
    }
    state.paginateTx.currentPage++
    state.powerEvents = state.powerEvents.concat(data)
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
  SET_PAGE_POWER_EVENTS (state, data) {
    state.paginateTx.before = data.before
  }
}

export default mutations
