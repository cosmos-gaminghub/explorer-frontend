<template>
  <div class="page-content header-smaller">
    <div class="main-body-content">
      <not-found v-if="notFound" :obj-name="'Validator'" />
      <div v-else class="cos-notice custom-page-title cos-validator-detail">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              VALIDATOR DETAILS
            </h2>
            <div class="name-item">
              <div class="number">
                {{ validator.rank }}
              </div>
              <div class="name">
                {{ validator.moniker }}
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <div class="main-md-content validator-detail-content md-full">
          <div class="cos-table-item md-full">
            <div class="cos-item-content md-full">
              <div class="validate-title-top">
                <div class="validator-info-title">
                  <div class="validator-info-avatar">
                    <div class="validator-avatar">
                      <img
                        v-if="validator.operator_address"
                        :src="validator.image_url"
                        onload="console.log('loaded')"
                        onError="console.log('Error');this.onerror=null;this.src='https://www.mintscan.io/static/media/validator_none.83868b17.svg'"
                        :alt="validator.moniker"
                      >
                    </div>
                  </div>
                  <div class="validator-info-status">
                    <h2 v-if="validator.jailed" class="card-title under-line status-jailed">
                      Jailed
                    </h2>
                    <h2 v-else-if="!validator.jailed && validator.status == 'BOND_STATUS_BONDED'" class="card-title under-line status-active">
                      Active
                    </h2>
                    <h2 v-else-if="validator" class="card-title under-line status-inactive">
                      Inactive
                    </h2>
                    <div class="validator-site">
                      <a :href="validator.website" target="_blank">{{ validator.website }}</a>
                    </div>
                  </div>
                </div>
                <div class="validator-info">
                  <div class="validator-info-link">
                    <h4>Operator address</h4><span>{{ validator.operator_address }}</span>
                  </div>
                  <div class="validator-info-link">
                    <h4>Address</h4>
                    <nuxt-link :to="'/account/'+validator.acc_address">
                      {{ validator.acc_address }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div v-if="validator.operator_address" class="status-validator">
                <div class="status-items">
                  <div class="title">
                    Commission
                  </div>
                  <div class="number">
                    {{ validator.commission | getPercent(true) }}%
                  </div>
                </div>
                <div class="status-items">
                  <div class="title">
                    Uptime
                  </div>
                  <div class="number">
                    {{ 100 - validator.uptime }}%
                  </div>
                </div>
                <div class="status-items">
                  <div class="title">
                    Voting Power
                  </div>
                  <div class="number">
                    {{ validator.voting_power | getPercentVotingPower(tokens) }}%
                  </div>
                  <div class="sub-title">
                    ({{ validator.voting_power | getAmount(true) }}.<small>{{ validator.voting_power | getAmount(false) }}</small> {{ current_denom }})
                  </div>
                </div>
                <div class="status-items">
                  <div class="title">
                    Bonded Height
                  </div>
                  <div class="number">
                    1
                  </div>
                </div>
                <div class="status-items">
                  <div class="title">
                    Self Bonded
                  </div>
                  <div class="number">
                    {{ delegations | getAmount(true, true) }}.<small>{{ delegations | getAmount(false, true) }}</small> {{ current_denom }} ( {{ delegations | getPercentSelfBoned(validator.voting_power) }})
                  </div>
                </div>
                <div class="status-items">
                  <div class="title">
                    Details
                  </div>
                  <div class="number">
                    {{ validator.details }}
                  </div>
                </div>
              </div>
              <div v-else class="status-validator skeleton">
                <div v-for="i in 6" :key="i" class="status-items">
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-md-content delegated-missed md-full">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full">
                  <div class="cos-table-title">
                    <div class="table-title">
                      <h2 class="card-title">
                        Proposed Blocks
                      </h2>
                    </div>
                    <div class="table-total">
                      <span class="title-total">Total :</span>{{ paginateBlocks.totalRecords | formatNumber }} blocks
                    </div>
                  </div>
                  <empty-table v-if="loaded.blocks && !proposedBlocks.length" :obj-name="'Proposed Blocks'" />
                  <div v-else class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-center">
                        <thead>
                          <tr>
                            <th class="text-left">
                              Height
                            </th>
                            <th class="text-left">
                              Block Hash
                            </th>
                            <th class="text-center">
                              Txs
                            </th>
                            <th class="text-right">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded.blocks">
                          <tr v-for="(block, index) in filteredRow" :key="index">
                            <td class="text-left">
                              <nuxt-link class="box btn1" :to="'/blocks/'+block.height">
                                {{ block.height }}
                              </nuxt-link>
                            </td>
                            <td class="text-left">
                              <nuxt-link :to="'/blocks/'+block.height">
                                {{ block.hash | formatHashBlock }}
                              </nuxt-link>
                            </td>
                            <td class="text-center">
                              <span class="title">Txs</span>
                              {{ block.num_txs }}
                            </td>
                            <td class="text-right">
                              <span class="title">Time</span>
                              <p class="cos-note">
                                {{ block.time | getTime }} ago
                              </p>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-for="i in [1, 2, 3, 4, 5]" :key="i">
                            <td colspan="4" class="td-skeleton">
                              <Skeleton />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="well">
                        <div v-if="loaded.blocks" class="pagination-wrapper">
                          <pagination
                            v-model="pagination.blocks.page"
                            :records="paginateBlocks.totalRecords"
                            :per-page="paginateBlocks.itemsPerPage"
                            :options="optionPaginate"
                            @paginate="getBlocksWithPage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full content-uptime">
                  <div class="cos-table-title">
                    <div class="table-title">
                      <h2 class="card-title">
                        UPTimes (Total missed blocks: {{ validator.total_missed_block }})
                      </h2>
                    </div>
                    <div class="table-total">
                      <span class="title-total">Last 100 Blocks</span>
                    </div>
                  </div>
                  <div v-if="lastProposedBlocks && lastProposedBlocks > 99" class="missed-content">
                    <a
                      v-for="height in 100"
                      :key="'block_' + (lastProposedBlocks - height + 1)"
                      :href="'/blocks/'+(lastProposedBlocks - height + 1)"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :class="uptimes | getStatus((lastProposedBlocks - height + 1), validator)"
                      :title="(lastProposedBlocks - height + 1)"
                    />
                  </div>
                  <div v-else class="missed-content">
                    <a
                      v-for="i in 99"
                      :key="i+1"
                      :href="'/blocks/'+i"
                      :title="i+1"
                      class="Inactive"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full">
                  <div class="cos-table-title">
                    <div class="table-title">
                      <h2 class="card-title">
                        Delegators
                      </h2>
                      <div class="table-total" />
                    </div>
                  </div>
                  <empty-table :obj-name="'Delegators'" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full">
                  <div class="cos-table-title">
                    <div class="table-title">
                      <h2 class="card-title">
                        Power event
                      </h2>
                    </div>
                  </div>
                  <empty-table v-if="loaded.tx && !powerEvents.length" :obj-name="'Power events'" />
                  <div v-else class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-center table-snow-power">
                        <thead>
                          <tr>
                            <th class="text-left">
                              Height
                            </th>
                            <th class="text-center">
                              TxHash
                            </th>
                            <th class="text-right">
                              Amount
                            </th>
                            <th class="text-center">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded.tx">
                          <tr v-for="tx in filteredRowTx" :key="tx.tx_hash">
                            <td class="text-left">
                              <nuxt-link class="box btn1" :to="'/transactions/'+tx.tx_hash">
                                {{ tx.height }}
                              </nuxt-link>
                            </td>
                            <td class="text-center">
                              <nuxt-link :to="'/transactions/'+tx.tx_hash">
                                {{ tx.tx_hash | formatHashBlock }}
                              </nuxt-link>
                            </td>
                            <td :class="'text-right' + ((tx.type == 'add') ? ' green' : ' red')">
                              <span class="title">Amount</span>
                              <div class="amount-power">
                                <img :src="tx.type | getTypeTx" :alt="tx.tx_hash">{{ tx.amount | getAmount(true) }}.<small>{{ tx.amount | getAmount(false) }}</small>
                              </div>
                            </td>
                            <td class="text-center">
                              <span class="title">Time</span>
                              <p class="cos-note">
                                {{ tx.timestamp | getTime }} ago
                              </p>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-for="i in 5" :key="i">
                            <td colspan="4" class="td-skeleton">
                              <Skeleton />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="well">
                      <div v-if="loaded.tx" class="pagination-wrapper">
                        <pagination
                          v-model="pagination.tx.page"
                          :records="paginateTx.totalRecords"
                          :per-page="paginateTx.itemsPerPage"
                          :options="optionPaginate"
                          @paginate="getTxWithPage"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import headerData from '@/components/header/Header.vue'
import NotFound from '@/components/error/NotFound.vue'
import EmptyTable from '@/components/error/EmptyTable.vue'
import helper from '~/utils/helper'

export default {
  filters: {
    getStatus (value, heightBlock, validator) {
      if (!helper.isActiveValidator(validator)) { return 'Inactive' }
      return (value && value.includes(heightBlock)) ? 'Inactive' : 'Active'
    },
    getPercent (value, isCalculate) {
      if (isCalculate) { value = value * Math.pow(10, 2) }

      return value.toFixed(2)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTypeTx (value) {
      return '/assets/images/icon/' + ((value === 'add') ? 'plus_icon.0ca4963c.svg' : 'minus_icon.ef8463f6.svg')
    },
    formatHashBlock (value) {
      return helper.formatHash(value, 8, 8)
    },
    getAmount (value, isInt = false, calcutatDelegations = false) {
      let total = 0
      if (!calcutatDelegations) {
        total = parseFloat(value) / Math.pow(10, 6)
      } else {
        total = helper.calcutatDelegations(value) / Math.pow(10, 6)
      }
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    getPercentVotingPower (value, token) {
      return (token ? ((value / token) * Math.pow(10, 2)).toFixed(2) : 0.00)
    },
    getPercentSelfBoned (value, votingPower) {
      const percent = votingPower ? ((helper.calcutatDelegations(value) / votingPower) * Math.pow(10, 2)) : 0
      return (percent ? percent.toFixed(2) : 0.00) + '%'
    }
  },
  components: {
    headerData, NotFound, EmptyTable
  },
  data () {
    return {
      optionPaginate: {
        chunk: 5
      },
      tab: 1,
      blocks: [],
      loaded: {
        blocks: false,
        tx: false
      },
      pagination: {
        blocks: {
          page: 1,
          totalRecords: 25,
          totalPage: 5
        },
        tx: {
          page: 1,
          totalRecords: 25,
          totalPage: 5
        }
      },
      notFound: false,
      uptimesInterval: null
    }
  },
  head () {
    return {
      title: 'COSMOS Validator ' + this.validator.moniker
    }
  },
  computed: {
    ...mapState('blocks', ['proposedBlocks', 'powerEvents', 'delegations', 'lastProposedBlocks', 'uptimes', 'paginateBlocks', 'paginateTx']),
    ...mapState('network', ['info', 'bondedTokens']),
    ...mapState('validators', ['validator', 'tokens']),
    filteredRow () {
      return this.proposedBlocks.filter((row, index) => {
        const from = (this.pagination.blocks.page - 1) * this.paginateBlocks.itemsPerPage
        const to = from + this.paginateBlocks.itemsPerPage
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    filteredRowTx () {
      return this.powerEvents.filter((row, index) => {
        const from = (this.pagination.tx.page - 1) * this.paginateTx.itemsPerPage
        const to = from + this.paginateTx.itemsPerPage
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    current_denom () {
      return this.$store.state.network.current_network ? this.$store.state.network.current_network.denom : 'ATOM'
    }
  },
  watch: {
    $route () {
      if (this.$route.params.address) {
        this.emptyOldData()
        this.getValidatorData()
      }
    }
  },
  mounted () {
    this.$store.commit('network/SET_CURRENT_NETWORK')
    this.emptyOldData()

    if (this.$route.params.address) {
      this.getValidatorData()
    }
    if (this.info) {
      this.cumulativeShare(this.bondedTokens)
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'network/SET_STATUS_INFO' && this.info) {
        this.cumulativeShare(this.bondedTokens)
      }
    })
  },
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { address } = params
    return { address }
  },
  destroyed () {
    clearInterval(this.uptimesInterval)
  },
  methods: {
    ...mapActions({
      getValidator: 'validators/GET_VALIDATOR_DETAIL',
      getProposedBlocks: 'blocks/GET_PROPOSED_BLOCKS',
      getPowerEvents: 'blocks/GET_POWER_EVENT_QUERY',
      getDelegations: 'blocks/GET_DELEGATIONS_QUERY',
      getMissedBlocks: 'blocks/GET_UPTIMES'
    }),
    ...mapMutations({
      cumulativeShare: 'validators/SET_CUMULATIVE_SHARE',
      setBlockPage: 'blocks/SET_PAGE_BLOCKS',
      setEmptyProposedBlocks: 'blocks/SET_EMPTY_PROPOSED_BLOCKS',
      setPowerEvents: 'blocks/SET_PAGE_POWER_EVENTS',
      setEmptyPowerEvents: 'blocks/SET_EMPTY_POWER_EVENTS',
      setEmptyValidator: 'validators/SET_EMPTY_VALIDATOR'
    }),
    getBlocksWithPage (page) {
      const index = page * this.paginateBlocks.itemsPerPage
      if (!this.proposedBlocks[index]) {
        const before = this.proposedBlocks[index - 1]
        if (before) {
          this.loaded.blocks = false
          this.setBlockPage({
            before: before.height
          })
          this.getProposedBlocksTable()
        }
      }
    },
    getTxWithPage (page) {
      const index = page * this.paginateTx.itemsPerPage
      if (!this.powerEvents[index]) {
        const beforeEvent = this.powerEvents[index - 1]
        if (beforeEvent) {
          this.loaded.tx = false
          this.setPowerEvents({
            before: beforeEvent.height
          })
          this.getPowerEventsTable()
        }
      }
    },
    getValidatorData () {
      this.getValidator({ operator_address: this.$route.params.address }).then((validator) => {
        this.getDelegations({
          acc_address: validator.acc_address
        })
        this.notFound = false
      }).catch(() => {
        this.notFound = true
      })
      this.uptimesInterval = setInterval(() => {
        this.getMissedBlocks({
          operator_address: this.$route.params.address
        })
      }, process.env.REAL_TIME_DELAY_MS)

      this.getProposedBlocksTable()
      this.getPowerEventsTable()
    },
    getProposedBlocksTable () {
      this.getProposedBlocks({
        before: this.paginateBlocks.before,
        size: this.paginateBlocks.size,
        operator_address: this.$route.params.address
      }).then(() => {
        this.loaded.blocks = true
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error getProposedBlocks ', error)
      })
    },
    getPowerEventsTable () {
      this.getPowerEvents({
        before: this.paginateTx.before,
        size: this.paginateTx.size,
        operator_address: this.$route.params.address
      }).then(() => {
        this.loaded.tx = true
      }).catch((error) => {
        this.loaded.tx = true
        // eslint-disable-next-line no-console
        console.log('error getPowerEvents ', error)
      })
    },
    emptyOldData () {
      this.setEmptyProposedBlocks()
      this.setEmptyPowerEvents()
      this.setEmptyValidator()
    }
  }
}
</script>
