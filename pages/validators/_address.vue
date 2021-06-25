<template>
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
                    <img :src="validator.operator_address | avatarValidator" onError="this.onerror=null;this.src='https://www.mintscan.io/static/media/validator_none.83868b17.svg'" :alt="validator.moniker">
                  </div>
                </div>
                <div class="validator-info-status">
                  <h2 class="card-title under-line">
                    {{ validator | getStatus }}
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
                  ({{ validator.voting_power | formatNumber }}.<small>{{ validator.voting_power | getDecimalNumber }}</small> ATOM)
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
                  {{ delegations | getTotalSelfBoned }}.<small>{{ delegations | getTotalSelfBoned(true) }}</small> ATOM ( {{ delegations | getPercentSelfBoned(validator.voting_power) }})
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
            <div v-else class="status-validator">
              <div class="status-items">
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
                    <span class="title-total">Total :</span>{{ paginateBlocks.totalRecords | formatNumberPages }} blocks
                  </div>
                </div>
                <div class="cos-table-list" v-if="proposedBlocks.length">
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
                          <th class="text-right">
                            Txs
                          </th>
                          <th class="text-right">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded.blocks">
                        <tr v-for="block in filteredRow" :key="block.height">
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
                          <td class="text-right">
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
                          <td colspan="4">
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
                <div class="cos-table-list" v-else>
                  <div class="Section__section-content--hXY1b">
                    <div class="DelegatorTable__delegators-table-container--15lfW">
                      <div class="NoValues__no-values-wrapper--rrUFS">
                        <img class="NoValues__no-value-img--NL2Dm" src="/custom/img/noValues-icon.569cfd19.svg" alt="nodata">
                        <p class="NoValues__no-values--3sfhG">No Proposed Blocks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="cos-table-item table-transactions">
              <div class="cos-item-content md-full">
                <div class="cos-table-title">
                  <div class="table-title">
                    <h2 class="card-title">
                      UPTimes
                    </h2>
                  </div>
                  <div class="table-total">
                    <span class="title-total">Last 100 Blocks</span>
                  </div>
                </div>
                <div v-if="lastProposedBlocks.length" class="missed-content">
                  <a
                    v-for="block in lastProposedBlocks"
                    :key="block.height"
                    :href="'/blocks/'+block.height"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    :class="validator | getStatus"
                    :title="block.height"
                  />
                  <a
                    v-for="i in (100 - lastProposedBlocks.length)"
                    :key="i"
                    class="Inactive"
                  />
                </div>
                <div v-else class="missed-content">
                  <a
                    v-for="i in 100"
                    :key="i"
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
                <div class="cos-table-list">
                  <div class="Section__section-content--hXY1b">
                    <div class="DelegatorTable__delegators-table-container--15lfW">
                      <div class="NoValues__no-values-wrapper--rrUFS">
                        <img class="NoValues__no-value-img--NL2Dm" src="/custom/img/noValues-icon.569cfd19.svg" alt="nodata">
                        <p class="NoValues__no-values--3sfhG">No Delegators</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div v-if="powerEvents.length" class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover text-center">
                      <thead>
                        <tr>
                          <th class="text-left">
                            Height
                          </th>
                          <th class="text-left">
                            TxHash
                          </th>
                          <th class="text-right">
                            Amount
                          </th>
                          <th class="text-right">
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
                          <td class="text-left">
                            <nuxt-link :to="'/transactions/'+tx.tx_hash">
                              {{ tx.tx_hash | formatHashBlock }}
                            </nuxt-link>
                          </td>
                          <td :class="'text-right' + (tx.type ? ' green' : ' red')">
                            <img :src="tx.type | getTypeTx" :alt="tx.tx_hash">{{ tx.amount | formatNumber }}.<small>{{ tx.amount | getDecimalNumber }}</small>
                          </td>
                          <td class="text-right">
                            <span class="title">Time</span>
                            <p class="cos-note">
                              {{ tx.timestamp | getTime }} ago
                            </p>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="i in [1, 2, 3, 4, 5]" :key="i">
                          <td colspan="4">
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
                <div v-else class="cos-table-list">
                  <div class="Section__section-content--hXY1b">
                    <div class="DelegatorTable__delegators-table-container--15lfW">
                      <div class="NoValues__no-values-wrapper--rrUFS">
                        <img class="NoValues__no-value-img--NL2Dm" src="/custom/img/noValues-icon.569cfd19.svg" alt="nodata">
                        <p class="NoValues__no-values--3sfhG">No Power events</p>
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
import helper from '~/utils/helper'

export default {
  filters: {
    avatarValidator (value) {
      return helper.getAvatarValidator(value)
    },
    getStatus (value) {
      return helper.isActiveValidator(value) ? 'Active' : 'Inactive'
    },
    getPercent (value, isCalculate) {
      if (isCalculate) { value = value * Math.pow(10, 2) }

      return value.toFixed(2)
    },
    formatNumber (value) {
      return helper.formatNumber(parseInt(value / Math.pow(10, 6)))
    },
    formatNumberPages (value) {
      return helper.formatNumber(value)
    },
    getTypeTx (value) {
      return '/assets/images/icon/' + (value ? 'plus_icon.0ca4963c.svg' : 'minus_icon.ef8463f6.svg')
    },
    formatHashBlock (value) {
      return helper.formatHash(value, 8, 8)
    },
    getDecimalNumber (value) {
      const decimal = value % Math.pow(10, 6)
      return decimal || '00'
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    getPercentVotingPower (value, token) {
      return (token ? ((value / token) * Math.pow(10, 2)).toFixed(2) : 0.00)
    },
    getTotalSelfBoned (value, isDecimal = false) {
      if (isDecimal) {
        const decimal = helper.calcutatDelegations(value) % Math.pow(10, 6)
        return decimal || '00'
      }
      const selfBoned = helper.calcutatDelegations(value)
      return helper.formatNumber(parseInt(selfBoned / Math.pow(10, 6)))
    },
    getPercentSelfBoned (value, votingPower) {
      const percent = votingPower ? ((helper.calcutatDelegations(value) / votingPower) * Math.pow(10, 2)) : 0
      return (percent ? percent.toFixed(2) : 0.00) + '%'
    }
  },
  components: {
    headerData, NotFound
  },
  header: {
    title: 'Validator'
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
      notFound: false
    }
  },
  computed: {
    ...mapState('blocks', ['proposedBlocks', 'powerEvents', 'delegations', 'lastProposedBlocks', 'paginateBlocks', 'paginateTx']),
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
  methods: {
    ...mapActions({
      getValidator: 'validators/GET_VALIDATOR_DETAIL',
      getProposedBlocks: 'blocks/GET_PROPOSED_BLOCKS',
      getPowerEvents: 'blocks/GET_POWER_EVENT_QUERY',
      getDelegations: 'blocks/GET_DELEGATIONS_QUERY',
      getLastBlocks: 'blocks/GET_UPTIMES'
    }),
    ...mapMutations({
      cumulativeShare: 'validators/SET_CUMULATIVE_SHARE',
      setBlockPage: 'blocks/SET_PAGE_BLOCKS',
      setEmptyProposedBlocks: 'blocks/SET_EMPTY_PROPOSED_BLOCKS',
      setPowerEvents: 'blocks/SET_PAGE_POWER_EVENTS',
      setEmptyPowerEvents: 'blocks/SET_EMPTY_POWER_EVENTS',
      setEmptyValidator: '/validators/SET_EMPTY_VALIDATOR'
    }),
    getBlocksWithPage (page) {
      // eslint-disable-next-line no-console
      console.log('paginate proposed blocks,  page = ', page)
      const index = page * this.paginateBlocks.itemsPerPage
      if (!this.proposedBlocks[index]) {
        const before = this.proposedBlocks[index - 1]
        if (before) {
          console.log('blocks load continue', index, before.height)
          this.loaded.blocks = false
          this.setBlockPage({
            before: before.height
          })
          this.getProposedBlocksTable()
        }
      }
    },
    getTxWithPage (page) {
      // eslint-disable-next-line no-console
      console.log('paginate power events,  page = ', page)
      const index = page * this.paginateTx.itemsPerPage
      if (!this.powerEvents[index]) {
        const beforeEvent = this.powerEvents[index - 1]
        if (beforeEvent) {
        // eslint-disable-next-line no-console
          console.log('power events load continue', index, beforeEvent.height)
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
        this.getLastBlocks({
          operator_address: validator.operator_address
        })
        this.notFound = false
      }).catch(() => {
        this.notFound = true
      })
      /** get last 100 Blocks */
      this.getProposedBlocks({
        before: 0,
        size: 100,
        operator_address: this.$route.params.address,
        last: true
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('get last 100 Blocks error = ', error)
      })
      /** end last 100 Blocks */
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
        console.log('getProposedBlocks error = ', error)
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
        // eslint-disable-next-line no-console
        console.log('getPowerEvents error = ', error)
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
