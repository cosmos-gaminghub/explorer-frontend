<template>
  <div class="main-body-content">
    <div class="cos-notice custom-page-title">
      <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <h2 class="page-title">
            Dasboard
          </h2>
          <div class="left-infor">
            <div class="cnt">
              <div class="title">
                <div class="icon-title">
                  <div class="icon">
                    <img src="/assets/images/icon/atom.png" alt="atom">
                  </div>
                  <h3>14.30</h3>
                </div>
                <div class="sub-title">
                  Block Time 7,742ms
                </div><span class="percent">7%</span>
              </div>
              <div class="list-item-infor">
                <div class="item">
                  Market Caps:<span>$3,112,766,217</span>
                </div>
                <div class="item">
                  24h Vol: <span>$944,716,442.00</span>
                </div>
              </div>
            </div>
            <div class="chart">
              <div class="images">
                <img src="/assets/images/bgr/chart1.png" alt="atom">
              </div>
              <div class="list-btn">
                <div class="btn price">
                  Price
                </div>
                <div class="btn volume">
                  Volume
                </div>
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
                  <span>Blocks</span>
                  <nuxt-link class="show-more" to="/blocks">
                    {{ $t('text.view_all') }}
                    <i class="fa fa-chevron-right" />
                  </nuxt-link>
                </h3>
              </div>
              <div class="cos-table-list">
                <div class="table-responsive">
                  <table v-if="blocks" class="table table-striped table-bordered table-hover text-center">
                    <thead>
                      <tr>
                        <th>Height</th>
                        <th class="text-left">
                          Proposer
                        </th>
                        <th>Txs</th>
                        <th class="text-left">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="block in blocks" :key="block.hash">
                        <td>
                          <nuxt-link class="box btn1" :to="'/blocks/' + block.height">
                            {{ block.height }}
                          </nuxt-link>
                        </td>
                        <td class="text-left">
                          <nuxt-link class="box btn1" :to="'/validators/'+block.operator_address">
                            {{ block.moniker }}
                          </nuxt-link>
                        </td>
                        <td>{{ block.num_txs }}</td>
                        <td class="text-left">
                          <p class="cos-note">
                            {{ block.time | getTime }}
                          </p>
                        </td>
                      </tr>
                      <tr v-if="!blocks.length">
                        <td colspan="4">
                          <Skeleton v-for="i in [1, 2, 3, 4, 5]" :key="i"/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Skeleton v-else />
                </div>
              </div>
            </div>
          </div>
          <div class="cos-table-item">
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
                  <table class="table table-striped table-bordered table-hover">
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
                    <tbody>
                      <tr v-for="tx in transactions" :key="tx.tx_hash">
                        <td>
                          <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                            {{ tx.tx_hash | formatTxHash }}
                          </nuxt-link>
                        </td>
                        <td class="text-left">
                          <a class="box btn2" href="#">Get Reward</a>
                        </td>
                        <td class="text-left">
                          <span class="box btn1">{{ tx.height }}</span>
                        </td>
                        <td class="text-left">
                          <p class="cos-note">
                            {{ tx.timestamp | getTime }}
                          </p>
                        </td>
                      </tr>
                      <tr v-if="!transactions.length">
                        <td colspan="4">
                          <Skeleton v-for="i in [1, 2, 3, 4, 5]" :key="i"/>
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
import headerData from '@/components/header/Header.vue'
import helper from '@/utils/helper'

export default {
  filters: {
    formatTxHash (value) {
      return value.substr(0, 6) + '...' + value.substr(value.length - 7, value.length - 1)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTime (value) {
      return value ? (helper.formatTime(value) + ' ago') : ''
    }
  },
  components: {
    headerData
  },
  header: {
    title: 'Home'
  },
  computed: {
    ...mapState('blocks', ['blocks']),
    ...mapState('transactions', ['transactions'])
  },
  mounted () {
    this.loadData()
  },
  methods: {
    ...mapActions({
      getFiveNewestBlocks: 'blocks/GET_DATA',
      getFiveNewestTransactions: 'transactions/GET_DATA'
    }),
    loadData () {
      this.getFiveNewestBlocks({
        offset: 0,
        size: 5
      })
      this.getFiveNewestTransactions({
        offset: 0,
        size: 5
      })
    }
  }
}
</script>
