<template>
  <div class="page-content">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              Dashboard
            </h2>
            <div class="left-infor">
              <div class="cnt">
                <div class="title">
                  <div class="icon-title">
                    <div class="icon">
                      <img src="/assets/images/icon/atom.png" alt="atom">
                    </div>
                    <h3 v-if="price.price">
                      {{ parseFloat(price.price).toFixed(2) }}
                    </h3>
                  </div>
                  <div class="sub-title">
                    Block Time {{ (info && info.block_time) ? ((info.block_time / Math.pow(10, 9)).toFixed(3)) : 0 }}ms
                  </div><span v-if="price.percent_change_24h" :class="'percent' + (parseFloat(price.percent_change_24h) < 0 ? ' red' : '')">{{ parseFloat(price.percent_change_24h).toFixed(2) }}%</span>
                </div>
                <div class="list-item-infor">
                  <div class="item">
                    Market Caps:<span v-if="price.market_cap">${{ price.market_cap | convertNumber(true) }}.{{ price.market_cap | convertNumber(false) }}</span>
                  </div>
                  <div class="item">
                    24h Vol: <span v-if="price.volume_24h">${{ price.volume_24h | convertNumber(true) }}.{{ price.volume_24h | convertNumber(false) }}</span>
                  </div>
                </div>
              </div>
              <div class="chart">
                <div class="images">
                  <line-chart />
                </div>
                <div class="list-btn">
                  <div :class="'btn price'+(chart.current_tab === chart.price ? ' active' : '')" @click="changeCurrentTab(chart.price)">
                    Price
                  </div>
                  <div :class="'btn volume'+(chart.current_tab === chart.volume ? ' active' : '')" @click="changeCurrentTab(chart.volume)">
                    Volume
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
            <div class="cos-table-item cnt-home cnt-home-block">
              <div class="cos-item-content md-full">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Blocks</span>
                    <nuxt-link class="show-more" to="/blocks">
                      {{ $t('text.view_all') }}
                      <i class="fa fa-chevron-right" />
                    </nuxt-link>
                  </h3>
                </div>
                <div class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover text-center table-home-block">
                      <thead>
                        <tr>
                          <th class="text-left">Height</th>
                          <th class="text-left">
                            Proposer
                          </th>
                          <th class="text-left">Txs</th>
                          <th class="text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loadedBlock">
                        <tr v-for="block in blocks" :key="block.hash">
                          <td class="text-left">
                            <nuxt-link class="box btn1" :to="'/blocks/' + block.height">
                              {{ block.height }}
                            </nuxt-link>
                          </td>
                          <td class="text-left">
                            <nuxt-link class="" :to="'/validators/'+block.operator_address">
                              {{ block.moniker }}
                            </nuxt-link>
                          </td>
                          <td class="text-left">
                            <span class="title">Txs</span>
                            {{ block.num_txs }}
                          </td>
                          <td class="text-left">
                            <span class="title">Time</span>
                            <p class="cos-note">
                              {{ block.time | getTime }}
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
                </div>
              </div>
            </div>
            <div class="cos-table-item cnt-home">
              <div class="cos-item-content md-full">
                <div class="cos-title">
                  <h3 class="title-cos">
                    <span>Transactions</span>
                    <nuxt-link class="show-more" to="/transactions">
                      {{ $t('text.view_all') }}
                      <i class="fa fa-chevron-right" />
                    </nuxt-link>
                  </h3>
                </div>
                <div class="cos-table-list">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover tbl-transation-home">
                      <thead>
                        <tr>
                          <th>Tx Hash</th>
                          <th class="text-left">
                            Type
                          </th>
                          <th class="text-left">
                            Height
                          </th>
                          <th class="text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="loadedTx">
                        <tr v-for="tx in transactions" :key="tx.tx_hash">
                          <td>
                            <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                              {{ tx.tx_hash | formatTxHash }}
                            </nuxt-link>
                          </td>
                          <td class="text-left">
                            <span class="box btn2">{{ tx.type_tx_convert }}</span>
                          </td>
                          <td class="text-left">
                            <span class="title">Height</span>
                            <span class="box btn1">{{ tx.height }}</span>
                          </td>
                          <td class="text-left">
                            <span class="title">Time</span>
                            <p class="cos-note">
                              {{ tx.timestamp | getTime }}
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
import { mapActions, mapState } from 'vuex'
import headerData from '@/components/header/Header.vue'
import helper from '@/utils/helper'
import Vue from 'vue'
import LineChart from '~/components/libs/LineChart'

export const eventBus = new Vue()

export default {
  filters: {
    formatTxHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTime (value) {
      return value ? (helper.formatTime(value) + ' ago') : ''
    },
    convertNumber (value, isInt) {
      const total = parseFloat(value)
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(2).toString()).split('.')
        return decimal[1]
      }
    }
  },
  components: {
    headerData,
    LineChart
  },
  data () {
    return {
      loadedBlock: false,
      loadedTx: false,
      blockIntervalDashboard: null,
      TxIntervalDashboard: null,
      PriceInterval: null,
      StatsInterval: null,
      allowCallApiBlocks: true,
      allowCallApiTxs: true,
      allowCallApiPrice: true,
      allowCallApiStats: true,
      chart: {
        current_tab: 1,
        price: 1,
        volume: 2
      }
    }
  },
  head: {
    title: 'CCN - COSMOS Explorer by COSMOSTATION'
  },
  computed: {
    ...mapState('blocks', ['blocks']),
    ...mapState('transactions', ['transactions']),
    ...mapState('accounts', ['price']),
    ...mapState('network', ['info', 'stats_assets'])
  },
  mounted () {
    if (localStorage.getItem('TxInterval')) {
      window.clearInterval(localStorage.getItem('TxInterval'))
      localStorage.removeItem('TxInterval')
    }
    if (localStorage.getItem('blockIntervalDashboard')) {
      window.clearInterval(localStorage.getItem('blockIntervalDashboard'))
      localStorage.removeItem('blockIntervalDashboard')
    }
    this.loadData()
  },
  beforeDestroy () {
    this.clearAllFunc()
  },
  methods: {
    ...mapActions({
      getFiveNewestBlocks: 'blocks/GET_DATA',
      getFiveNewestTransactions: 'transactions/GET_DATA',
      getPrice: 'accounts/GET_PRICE',
      getStatsAsset: 'network/GET_STATS'
    }),
    loadData () {
      this.clearAllFunc()
      this.getBlocks(true)
      this.getTxs(true)
      this.getPriceFunc(true)
      this.getStatsFunc(true)
    },
    getBlocks (init = false) {
      if (this.allowCallApiBlocks) {
        this.allowCallApiBlocks = false
        this.getFiveNewestBlocks({
          offset: 0,
          size: 5
        }).then(() => {
          this.allowCallApiBlocks = true
          this.loadedBlock = true
          if (init) {
            clearInterval(this.blockIntervalDashboard)
            this.blockIntervalDashboard = setInterval(() => {
              this.getBlocks()
            }, process.env.REAL_TIME_DELAY_MS)
            localStorage.setItem('blockIntervalDashboard', this.blockIntervalDashboard)
          }
        }).catch((error) => {
          this.allowCallApiBlocks = true
          // eslint-disable-next-line no-console
          console.log('error getFiveNewestBlocks', error)
          this.loadedBlock = true
        })
      }
    },
    getTxs (init = false) {
      if (this.allowCallApiTxs) {
        this.allowCallApiTxs = false
        this.getFiveNewestTransactions({
          offset: 0,
          size: 5
        }).then(() => {
          this.allowCallApiTxs = true
          this.loadedTx = true
          if (init) {
            clearInterval(this.TxIntervalDashboard)
            this.TxIntervalDashboard = setInterval(() => {
              this.getTxs()
            }, process.env.REAL_TIME_DELAY_MS * 2.5)
            localStorage.setItem('TxIntervalDashboard', this.TxIntervalDashboard)
          }
        }).catch((error) => {
          this.allowCallApiTxs = true
          // eslint-disable-next-line no-console
          console.log('error getFiveNewestBlocks', error)
          this.loadedTx = true
        })
      }
    },
    getPriceFunc (init = false) {
      if (this.allowCallApiPrice) {
        this.allowCallApiPrice = false
        this.getPrice().then(() => {
          this.allowCallApiPrice = true
          if (init) {
            clearInterval(this.PriceInterval)
            this.PriceInterval = setInterval(() => {
              this.getPriceFunc()
            }, process.env.REAL_TIME_DELAY_MS * 15)
          }
        })
      }
    },
    getStatsFunc (init = false) {
      if (this.allowCallApiStats) {
        this.allowCallApiStats = false
        this.getStatsAsset().then(() => {
          this.allowCallApiStats = true
          this.changeCurrentTab(this.chart.current_tab)
          if (init) {
            clearInterval(this.StatsInterval)
            this.StatsInterval = setInterval(() => {
              this.getPriceFunc()
            }, process.env.REAL_TIME_DELAY_MS * 15)
          }
        })
      }
    },
    changeCurrentTab (tab) {
      this.chart.current_tab = tab
      if (tab === this.chart.price) {
        this.fillDataForChart('price')
      } else {
        this.fillDataForChart('volume')
      }
    },
    fillDataForChart (type = 'price') {
      /* eslint-disable prefer-const */
      let labels = []
      let data = []
      for (const item in this.stats_assets) {
        const time = helper.convertTime(this.stats_assets[item].timestamp)
        let price = 0
        if (type === 'price') {
          price = parseFloat(this.stats_assets[item].price).toFixed(2)
        } else {
          price = parseFloat(this.stats_assets[item].volume_24h).toFixed(2)
        }
        if (!labels.includes(time)) {
          labels.push(time)
          data.push(parseFloat(price))
        }
      }
      eventBus.$emit('changeData', {
        labels,
        datasets: [
          {
            backgroundColor: 'rgba(28,92,246,0.3)',
            borderColor: 'rgba(28,92,246,100)',
            pointRadius: 0,
            borderWidth: 3,
            pointBorderColor: 'rgba(28,92,246,100)',
            data
          }
        ]
      })
    },
    clearAllFunc () {
      clearInterval(this.blockIntervalDashboard)
      clearInterval(this.TxIntervalDashboard)
      clearInterval(this.PriceInterval)
      clearInterval(this.StatsInterval)
    }
  }
}
</script>
