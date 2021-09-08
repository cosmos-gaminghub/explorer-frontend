<template>
  <div class="page-content header-smaller">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title cos-acount-detail">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="cnt-title-acc">
              <h2 class="page-title">
                ACCOUNT DETAILS
              </h2>
              <div class="link-transaction">
                <span class="box btn1">{{ accAddress | formatHash }}</span>
                <button class="btn-coppy">
                  <a
                    :ref="accAddress"
                    href="javasctipt:void(0)"
                    @click.stop.prevent="copy"
                  >
                    <i> <img src="/assets/images/icon/coppy.png" alt="copy"></i>Copy
                  </a>
                </button>
                <div class="cnt-qr-code">
                  <button class="qr-code">
                    <i> <img src="/assets/images/icon/qr.png" alt="qrcode"></i>QR Code
                  </button>
                  <div class="content-qr-code">
                    <vue-qr :text="accAddress" />
                  </div>
                </div>
                <div>
                  <span id="copied-address" class="hide">Copied</span>
                </div>
              </div>
            </div>
            <div class="cnt-chart-acc">
              <div class="cnt-text">
                <div class="total-atom">
                  Total {{ current_denom }}
                </div>
                <h3>{{ dataChart.totalAtom | convertNumber(true, false) }}.{{ dataChart.totalAtom | convertNumber(false, false) }}</h3>
                <div class="detail-chart">
                  <p>${{ current_price.toFixed(2) }} / {{ current_denom }}</p>
                  <p>${{ dataChart.totalUsd | convertNumber(true, false) }}.{{ dataChart.totalUsd | convertNumber(false, false) }}</p>
                </div>
              </div>
              <div class="content-chart">
                <div v-if="loaded.available && loaded.delegations && loaded.unbonding && loaded.rewards && loaded.commissions" class="images">
                  <doughnut
                    :data="renderDataChart"
                    :options="options"
                    :height="196"
                    :width="192"
                  />
                </div>
                <div class="note-chart">
                  <ul>
                    <li>
                      <div class="color col-01">
                        <i class="fa fa-circle" aria-hidden="true" />
                      </div>
                      <div class="name-title">
                        Available
                      </div>
                      <div class="percent">
                        {{ dataChart.available | getPercent(dataChart.totalAtom) }}%
                      </div>
                      <div class="number">
                        {{ dataChart.available | convertNumber(true, false) }}.{{ dataChart.available | convertNumber(false, false) }}
                      </div>
                    </li>
                    <li>
                      <div class="color col-02">
                        <i class="fa fa-circle" aria-hidden="true" />
                      </div>
                      <div class="name-title">
                        Delegated
                      </div>
                      <div class="percent">
                        {{ dataChart.delegations | getPercent(dataChart.totalAtom) }}%
                      </div>
                      <div class="number">
                        {{ dataChart.delegations | convertNumber(true, false) }}.{{ dataChart.delegations | convertNumber(false, false) }}
                      </div>
                    </li>
                    <li>
                      <div class="color col-03">
                        <i class="fa fa-circle" aria-hidden="true" />
                      </div>
                      <div class="name-title">
                        Unbonding
                      </div>
                      <div class="percent">
                        {{ dataChart.unbondings | getPercent(dataChart.totalAtom) }}%
                      </div>
                      <div class="number">
                        {{ dataChart.unbondings | convertNumber(true, false) }}.{{ dataChart.unbondings | convertNumber(false, false) }}
                      </div>
                    </li>
                    <li>
                      <div class="color col-04">
                        <i class="fa fa-circle" aria-hidden="true" />
                      </div>
                      <div class="name-title">
                        Reward
                      </div>
                      <div class="percent">
                        {{ dataChart.rewards | getPercent(dataChart.totalAtom) }}%
                      </div>
                      <div class="number">
                        {{ dataChart.rewards | convertNumber(true, false) }}.{{ dataChart.rewards | convertNumber(false, false) }}
                      </div>
                    </li>
                    <li v-if="is_validator">
                      <div class="color col-05">
                        <i class="fa fa-circle" aria-hidden="true" />
                      </div>
                      <div class="name-title">
                        Commission
                      </div>
                      <div class="percent">
                        {{ dataChart.commissions | getPercent(dataChart.totalAtom) }}%
                      </div>
                      <div class="number">
                        {{ dataChart.commissions | convertNumber(true, false) }}.{{ dataChart.commissions | convertNumber(false, false) }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
            <div class="cos-table-item">
              <div class="cos-item-content md-full">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Delegations</span>
                  </h3>
                </div>
                <empty-table v-if="loaded.delegations && !delegations.length" :obj-name="'Delegations'" />
                <div v-else class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover text-left table-delegation-account">
                      <thead>
                        <tr>
                          <th>Address</th>
                          <th class="text-center">
                            Amount
                          </th>
                          <th class="text-center">
                            Shares
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded.delegations">
                        <tr v-for="(delegation, index) in filteredRowDelegations" :key="index">
                          <td>
                            <nuxt-link :to="'/validators/'+delegation.validator_address">
                              {{ delegation.moniker }}
                            </nuxt-link>
                          </td>
                          <td class="text-center">
                            {{ delegation.amount | convertNumber(true) }}.{{ delegation.amount | convertNumber(false) }} {{ current_denom }}
                          </td>
                          <td class="text-center">
                            <span class="title">Shares</span>
                            {{ delegation.validator_address | getRewardByAddress(rewards) }} {{ current_denom }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="i in 5" :key="i">
                          <td colspan="3" class="td-skeleton">
                            <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="well">
                    <div v-if="loaded.delegations" class="pagination-wrapper">
                      <pagination
                        v-model="pagination.delegations.page"
                        :records="delegations.length"
                        :per-page="pagination.delegations.per"
                        :options="optionPaginate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cos-table-item">
              <div class="cos-item-content md-full">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Unbondings</span>
                  </h3>
                </div>
                <empty-table v-if="loaded.unbonding && !unbonding.length" :obj-name="'Unbondings'" />
                <div v-else class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Validator</th>
                          <th class="text-center">
                            Height
                          </th>
                          <th class="text-center">
                            Amount
                          </th>
                          <th class="text-right">
                            Completion Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded.unbonding">
                        <tr v-for="(unbonding, index) in filteredRowUnbondings" :key="index">
                          <td>
                            <nuxt-link :to="'/validators/' + unbonding.validator_address">
                              {{ unbonding.validator }}
                            </nuxt-link>
                          </td>
                          <td class="text-center">
                            <span>{{ unbonding.height }}</span>
                          </td>
                          <td class="text-center">
                            <span class="title">Amount</span>
                            <span>{{ unbonding.amount | convertNumber(true) }}.{{ unbonding.amount | convertNumber(false) }} {{ current_denom }}</span>
                          </td>
                          <td class="text-right">
                            <span class="title">Completion Time</span>
                            <div class="time-unbon">
                              <p class="cos-note">
                                {{ unbonding.time | convertTime }}
                              </p><span class="remain">({{ unbonding.time | getTime }} remaining)</span>
                            </div>
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
                    <div v-if="loaded.unbonding" class="pagination-wrapper">
                      <pagination
                        v-model="pagination.unbonding.page"
                        :records="unbondingDataConver.length"
                        :per-page="pagination.unbonding.per"
                        :options="optionPaginate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="cos-table-item table-transactions">
              <div class="cos-item-content">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Transactions</span>
                  </h3>
                </div>
                <empty-table v-if="loaded.txs && !txs.length" :obj-name="'Transactions'" />
                <div v-else class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover text-left">
                      <thead>
                        <tr>
                          <th>Tx Hash</th>
                          <th>Type</th>
                          <th class="text-center">
                            Result
                          </th>
                          <th>Amount</th>
                          <th>
                            Fee
                          </th>
                          <th class="text-center">
                            Height
                          </th>
                          <th class="text-center">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded.txs">
                        <tr v-for="tx in filteredRowTxs" :key="tx.tx_hash">
                          <td>
                            <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                              {{ tx.tx_hash | formatHash }}
                            </nuxt-link>
                          </td>
                          <td><span class="box btn2">{{ tx.type_tx_convert }}</span></td>
                          <td :class="'text-center ' + (!tx.status ? 'green' : 'red')">
                            <span class="title">Result</span>
                            {{ !tx.status ? 'Success' : 'Failed' }}
                          </td>
                          <td v-if="tx.total_amount !== null">
                            <span class="title">Amount</span>
                            {{ tx.total_amount | convertNumber(true) }}.{{ tx.total_amount | convertNumber(false) }} {{ current_denom }}
                          </td>
                          <td v-else-if="tx.messages && JSON.parse(tx.messages) && JSON.parse(tx.messages).length > 1">
                            <span class="title">Amount</span>
                            <nuxt-link :to="'/transactions/'+tx.tx_hash">
                              More
                            </nuxt-link>
                          </td>
                          <td v-else>
                            <span class="title">Amount</span>
                            -
                          </td>
                          <td>
                            <span class="title">Free</span>
                            {{ tx.fee | getFeeTx }} {{ current_denom }}
                          </td>
                          <td class="text-center">
                            <span class="title">Height</span>
                            <nuxt-link class="box btn1" :to="'/blocks/' + tx.height">
                              {{ tx.height }}
                            </nuxt-link>
                          </td>
                          <td class="text-center">
                            <span class="title">Time</span>
                            {{ tx.timestamp | getTime }} ago
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="i in 5" :key="i">
                          <td colspan="7" class="td-skeleton">
                            <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="well">
                    <div v-if="loaded.txs" class="pagination-wrapper">
                      <pagination
                        v-model="pagination.txs.page"
                        :records="txs.length"
                        :per-page="pagination.txs.per"
                        :options="optionPaginate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="redelegationsDataConver.length" class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="cos-table-item table-transactions">
              <div class="cos-item-content">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Redelegation Status</span>
                  </h3>
                </div>
                <div class="cos-title">
                  <span>1. You must wait 21 days in order to be able to redelegate from the "To" validator.</span><br>
                  <span>2. You can redelegate from and to the same validator set only up to 7 times.</span>
                </div>
                <div class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover text-left">
                      <thead>
                        <tr>
                          <th>From</th>
                          <th class="text-left">
                            To
                          </th>
                          <th class="text-left">
                            Height
                          </th>
                          <th>Amount</th>
                          <th class="text-right">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded.redelegations">
                        <tr v-for="(item, index) in filteredRowRedelegations" :key="'redelegation_'+index">
                          <td>
                            <nuxt-link class="box btn1" :to="'/validators/' + item.validator_src_address">
                              {{ item.validator_src_moniker }}
                            </nuxt-link>
                          </td>
                          <td class="text-left">
                            <span class="title">To</span>
                            <nuxt-link class="box btn1" :to="'/validators/' + item.validator_dst_address">
                              {{ item.validator_dst_moniker }}
                            </nuxt-link>
                          </td>
                          <td class="text-center">
                            <span class="title">Height</span>
                            <nuxt-link class="box btn1" :to="'/blocks/' + 1">
                              {{ item.height }}
                            </nuxt-link>
                          </td>
                          <td class="text-left">
                            <span class="title">Amount</span>
                            {{ item.amount | convertNumber(true) }}.{{ item.amount | convertNumber(false) }} {{ current_denom }}
                          </td>
                          <td class="text-right">
                            <span class="title">Time</span>
                            <p>{{ item.time | convertTime }}</p>
                            <p>({{ item.time | getTime }} remaining)</p>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="i in 5" :key="i">
                          <td colspan="7" class="td-skeleton">
                            <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="well">
                    <div v-if="loaded.redelegations" class="pagination-wrapper">
                      <pagination
                        v-model="pagination.redelegations.page"
                        :records="redelegationsDataConver.length"
                        :per-page="pagination.redelegations.per"
                        :options="optionPaginate"
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
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerData from '@/components/header/Header.vue'
import Doughnut from '@/components/libs/DoughnutChartAcc.vue'
import VueQr from 'vue-qr'
import helper from '~/utils/helper'
import EmptyTable from '~/components/error/EmptyTable.vue'

export default {
  filters: {
    getTotalRewards (value, isDecimal) {
      const total = (helper.getTotalRewards(value) / Math.pow(10, 6)).toFixed(6)
      if (isDecimal) {
        return ((total - parseInt(total)) * Math.pow(10, 6)).toFixed(0)
      } else {
        return helper.formatNumber(parseInt(total))
      }
    },
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getRewardByAddress (value, rewards) {
      return helper.getRewardByAddress(rewards, value)
    },
    getFeeTx (value) {
      const totalAmount = helper.getFeeTx(value)
      return (totalAmount / Math.pow(10, 6)).toFixed(6)
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    convertTime (value) {
      return helper.convertTime(value)
    },
    convertNumber (value, isInt, isDevice = true) {
      let total = parseFloat(value)
      if (isDevice) { total /= Math.pow(10, 6) }
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    getPercent (value, total) {
      const percent = total ? (value / total) * Math.pow(10, 2) : 0

      return percent.toFixed(2)
    }
  },
  components: {
    headerData,
    EmptyTable,
    Doughnut,
    VueQr
  },
  data () {
    return {
      data: {
        labels: [
          'available',
          'delegations',
          'unbondings',
          'rewards',
          'commissions'
        ],
        datasets: [{
          data: [],
          backgroundColor: [
            '#0058FF',
            '#669AFF',
            '#99BCFF',
            '#E5EEFF',
            '#B8BDC6'
          ],
          hoverOffset: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      loaded: {
        rewards: false,
        available: false,
        delegations: false,
        unbonding: false,
        commissions: false,
        txs: false,
        redelegations: false,
        validators: false
      },
      pagination: {
        delegations: {
          page: 1,
          per: 5
        },
        unbonding: {
          page: 1,
          per: 5
        },
        txs: {
          page: 1,
          per: 5
        },
        redelegations: {
          page: 1,
          per: 5
        }
      },
      optionPaginate: {
        chunk: 5
      },
      accAddress: '',
      dataChart: {
        available: 0,
        delegations: 0,
        unbondings: 0,
        rewards: 0,
        commissions: 0,
        totalAtom: 0,
        totalUsd: 0
      },
      unbondingDataConver: [],
      redelegationsDataConver: [],
      current_price: 1
    }
  },
  head () {
    return {
      title: 'COSMOS Account - ' + this.$route.params.address
    }
  },
  computed: {
    ...mapState('accounts', ['rewards', 'available', 'txs', 'commissions', 'unbonding', 'price', 'txs_paginations', 'is_validator']),
    ...mapState('blocks', ['delegations']),
    ...mapState('validators', ['validators']),
    filteredRowDelegations () {
      return this.delegations.filter((row, index) => {
        const from = (this.pagination.delegations.page - 1) * this.pagination.delegations.per
        const to = from + this.pagination.delegations.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    filteredRowUnbondings () {
      return this.unbondingDataConver.filter((row, index) => {
        const from = (this.pagination.unbonding.page - 1) * this.pagination.unbonding.per
        const to = from + this.pagination.unbonding.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    filteredRowTxs () {
      if (this.pagination.txs.per * this.pagination.txs.page >= this.txs.length && !this.txs_paginations.is_empty) {
        this.getAccTransactions(this.$route.params.address)
      }
      return this.txs.filter((row, index) => {
        const from = (this.pagination.txs.page - 1) * this.pagination.txs.per
        const to = from + this.pagination.txs.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    filteredRowRedelegations () {
      return this.redelegationsDataConver.filter((row, index) => {
        const from = (this.pagination.redelegations.page - 1) * this.pagination.redelegations.per
        const to = from + this.pagination.redelegations.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    renderDataChart () {
      return {
        labels: [
          'available',
          'delegations',
          'unbondings',
          'rewards',
          'commissions'
        ],
        datasets: [{
          data: [
            (helper.calculateValueFromArr(this.available)).toFixed(6),
            (helper.calculateValueFromArr(this.delegations) / Math.pow(10, 6)).toFixed(6),
            (helper.getTotalUnbondings(this.unbondings)).toFixed(6),
            (helper.getTotalRewards(this.rewards)).toFixed(6),
            (helper.calculateValueFromArr(this.commissions)).toFixed(6)
          ],
          backgroundColor: [
            '#0058FF',
            '#669AFF',
            '#99BCFF',
            '#E5EEFF',
            '#B8BDC6'
          ],
          hoverOffset: 1
        }]
      }
    },
    current_denom () {
      return this.$store.state.network.current_network ? this.$store.state.network.current_network.denom : 'ATOM'
    }
  },
  watch: {
    $route () {
      if (this.$route.params.address) {
        this.getData(this.$route.params.address)
      }
    }
  },
  mounted () {
    this.setEmpty()
    this.$store.commit('network/SET_CURRENT_NETWORK')
    if (this.$route.params.address) {
      this.getData(this.$route.params.address)
    }
  },
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { address } = params
    return { address }
  },
  methods: {
    ...mapActions({
      getRewards: 'accounts/GET_REWARDS',
      getCommissions: 'accounts/GET_COMMISSIONS',
      getAvailable: 'accounts/GET_BALANCES',
      getDelegations: 'blocks/GET_DELEGATIONS_QUERY',
      getTxs: 'accounts/GET_ACCOUNT_TRANSACTIONS',
      getUnbonding: 'accounts/GET_UNBONDING',
      getAllValidators: 'validators/GET_DATA',
      getPrice: 'accounts/GET_PRICE',
      getRedelegations: 'accounts/GET_REDELEGATIONS',
      getIsValidator: 'accounts/GET_ACCOUNT_DETAIL'
    }),
    ...mapMutations({
      setEmpty: 'accounts/SET_EMPTY'
    }),
    getData (accountAddress) {
      this.accAddress = accountAddress

      this.getUnbonding({
        acc_address: accountAddress
      }).then((unbondings) => {
        this.loaded.unbonding = true
        this.dataChart.unbondings = helper.getTotalUnbondings(unbondings)
        this.getTotalAtom()
        let i = 0
        for (; i < unbondings.length; i++) {
          if (!unbondings[i].entries) { continue }
          let j = 0
          for (; j < unbondings[i].entries.length; j++) {
            const item = unbondings[i].entries[j]
            this.unbondingDataConver.push({
              validator_address: unbondings[i].validator_address,
              validator: unbondings[i].moniker,
              height: item.creation_height,
              amount: parseFloat(item.balance),
              time: item.completion_time
            })
          }
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        this.loaded.unbonding = true
        console.log('error when get unbondings: ', error, this.loaded.unbonding)
      })

      this.getRedelegations({
        acc_address: accountAddress
      }).then((redelegations) => {
        this.loaded.redelegations = true
        let i = 0
        for (; i < redelegations.length; i++) {
          if (!redelegations[i].entries) { continue }
          let j = 0
          for (; j < redelegations[i].entries.length; j++) {
            const item = redelegations[i].entries[j]
            const info = redelegations[i].redelegation
            this.redelegationsDataConver.push({
              validator_src_moniker: info.moniker_src,
              validator_src_address: info.validator_src_address,
              validator_dst_moniker: info.moniker_dst,
              validator_dst_address: info.validator_dst_address,
              height: item.redelegation_entry.creation_height,
              amount: parseFloat(item.balance),
              time: item.redelegation_entry.completion_time
            })
          }
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when get redelegations: ', error)
        this.loaded.redelegations = true
      })

      this.getRewards({
        acc_address: accountAddress
      }).then((rewards) => {
        this.loaded.rewards = true
        this.dataChart.rewards = helper.getTotalRewards(rewards)
        this.getTotalAtom()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when get rewards: ', error)
        this.loaded.rewards = true
      })

      this.getIsValidator({
        acc_address: accountAddress
      }).then((accountDetail) => {
        if (accountDetail && accountDetail.is_validator) {
          this.getCommissions({
            operator_address: accountDetail.operator_address
          }).then((commissions) => {
            this.loaded.commissions = true
            this.dataChart.commissions = helper.calculateValueFromArr(commissions)
            this.getTotalAtom()
          }).catch((error) => {
            this.loaded.commissions = true
            // eslint-disable-next-line no-console
            console.log('error when get commission: ', error)
          })
        } else {
          this.loaded.commissions = true
        }
      }).catch(() => {
        this.loaded.commissions = true
      })

      this.getAvailable({
        acc_address: accountAddress
      }).then((balances) => {
        this.loaded.available = true
        this.dataChart.available = helper.calculateValueFromArr(balances)
        this.getTotalAtom()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when getAvailable: ', error)
        this.loaded.available = true
      })

      this.getDelegations({
        acc_address: accountAddress
      }).then((delegations) => {
        this.loaded.delegations = true
        this.dataChart.delegations = helper.calculateValueFromArr(delegations) / Math.pow(10, 6)
        this.getTotalAtom()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when getDelegations: ', error)
        this.loaded.delegations = true
      })

      this.getAccTransactions(accountAddress)

      this.getPrice().then((price) => {
        if (price) {
          this.current_price = parseFloat(price.price)
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when get price: ', error)
      })
    },
    copy () {
      this.$clipboard(this.accAddress)
      const x = document.getElementById('copied-address')

      if (x.classList.contains('hide')) {
        x.classList.remove('hide')
        setTimeout(function () { x.classList.add('hide') }, 1000)
      }
    },
    getTotalAtom () {
      this.dataChart.totalAtom = this.dataChart.rewards + this.dataChart.available + this.dataChart.commissions + this.dataChart.delegations + this.dataChart.unbondings
      this.dataChart.totalUsd = this.dataChart.totalAtom * parseFloat(this.current_price)
    },
    getAccTransactions (accountAddress) {
      this.getTxs({
        acc_address: accountAddress,
        before: this.txs_paginations.before,
        size: this.txs_paginations.size
      }).then(() => {
        this.loaded.txs = true
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when getTxs: ', error)
        this.loaded.txs = true
      })
    }
  }
}
</script>
