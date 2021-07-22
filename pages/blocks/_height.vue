<template>
  <div class="page-content">
    <div class="main-body-content">
      <not-found v-if="loaded && notFound" :obj-name="'Block'" />
      <div v-else class="cos-notice custom-page-title">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              Block detail
            </h2>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <div class="main-md-content block-detail-content">
          <div class="cos-table-item">
            <div class="cos-item-content">
              <ul class="list-owl-block owl-carousel owl-theme">
                <li>
                  <ul class="list-infor-detail">
                    <li>
                      <div class="title">
                        Height
                      </div>
                      <div class="detail">
                        {{ block_detail.height }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Block Time
                      </div>
                      <div class="detail">
                        {{ block_detail.time | getTime }} ago ({{ block_detail.time | formatTime }})
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Block Hash
                      </div>
                      <div class="detail">
                        {{ block_detail.hash }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Number of Tx
                      </div>
                      <div class="detail">
                        {{ block_detail.num_txs }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Proposer
                      </div>
                      <div class="detail">
                        <nuxt-link :to="'/validators/' + block_detail.operator_address">
                          {{ block_detail.moniker }}
                        </nuxt-link>
                      </div>
                    </li>
                  </ul>
                </li>
                <div class="owl-nav">
                  <div class="owl-prev">
                    <i class="fa fa-arrow-left" aria-hidden="true" @click="goToPrev()" />
                  </div><div class="owl-next">
                    <i class="fa fa-arrow-right" aria-hidden="true" @click="goToNext()" />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div class="main-md-content delegated-missed md-full">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content">
                  <div class="cos-title">
                    <h3 class="title-cos">
                      <span>Transactions</span>
                    </h3>
                  </div>
                  <empty-table v-if="loaded_block_txs && !block_txs.length" :obj-name="'Txs'" />
                  <div v-else class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-left tbl-block-txs">
                        <thead>
                          <tr>
                            <th>Tx Hash</th>
                            <th>Type</th>
                            <th class="text-center">
                              Result
                            </th>
                            <th>
                              Amount
                            </th>
                            <th>
                              Fee
                            </th>
                            <th class="text-center">Height</th>
                            <th class="text-center">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded_block_txs">
                          <tr v-for="tx in filteredRowTxs" :key="tx.tx_hash">
                            <td>
                              <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                                {{ tx.tx_hash | getHash }}
                              </nuxt-link>
                            </td>
                            <td><span class="box btn2">{{ tx.type_tx_convert }}</span></td>
                            <td :class="'text-center ' + (!tx.status ? 'green' : 'red')">
                              <span class="title">Result</span>
                              {{ !tx.status ? 'Success' : 'Failed' }}
                            </td>
                            <td v-if="tx.total_amount !== null">
                              <span class="title">Amount</span>
                              {{ tx.total_amount | convertNumber(true) }}.{{ tx.total_amount | convertNumber(false) }} ATOM
                            </td>
                            <td v-else-if="tx.messages && JSON.parse(tx.messages) && JSON.parse(tx.messages).length > 1" class="text-right">
                              <span class="title">Amount</span>
                              <nuxt-link :to="'/transactions/'+tx.tx_hash">
                                More
                              </nuxt-link>
                            </td>
                            <td v-else class="text-right">
                              <span class="title">Amount</span>
                              -
                            </td>
                            <td>
                              <span class="title">Free</span>
                              {{ tx.fee | getFeeTx }} ATOM
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
                      <div v-if="loaded_block_txs" class="pagination-wrapper">
                        <pagination
                          v-model="pagination.txs.page"
                          :records="block_txs.length"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import headerData from '@/components/header/Header.vue'
import NotFound from '@/components/error/NotFound.vue'
import EmptyTable from '@/components/error/EmptyTable.vue'
import helper from '~/utils/helper'

export default {
  filters: {
    getTime (value) {
      return helper.formatTime(value)
    },
    formatTime (value) {
      return helper.convertTime(value)
    },
    getHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    getStatusTx (value) {
      return value ? 'Success' : 'Failed'
    },
    getFeeTx (value) {
      const totalAmount = helper.getFeeTx(value)
      return (totalAmount / Math.pow(10, 6)).toFixed(6)
    },
    convertNumber (value, isInt) {
      const total = parseFloat(value) / Math.pow(10, 6)
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    }
  },
  components: {
    headerData,
    NotFound,
    EmptyTable
  },
  data () {
    return {
      loaded: false,
      loaded_block_txs: false,
      notFound: false,
      blockInterval: null,
      pagination: {
        txs: {
          page: 1,
          per: 5
        }
      },
      optionPaginate: {
        chunk: 5
      },
      allowCallApi: true
    }
  },
  head () {
    return {
      title: 'COSMOS Block#' + this.$route.params.height
    }
  },
  computed: {
    ...mapState('blocks', ['block_detail', 'block_txs']),
    filteredRowTxs () {
      return this.block_txs.filter((row, index) => {
        const from = (this.pagination.txs.page - 1) * this.pagination.txs.per
        const to = from + this.pagination.txs.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    }
  },
  watch: {
    $route () {
      if (this.$route.params.height) {
        this.getBlock(this.$route.params.height, true)
      }
    }
  },
  mounted () {
    helper.clearInterval(this.$nuxt.$route.name)
    if (this.$route.params.height) {
      this.getBlock(this.$route.params.height, true)
    }
  },
  destroyed () {
    clearInterval(this.blockInterval)
  },
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { height } = params
    return { height }
  },
  methods: {
    ...mapActions({
      getBlockDetail: 'blocks/GET_BLOCK_DETAIL',
      getBlockTxs: 'blocks/GET_BLOCK_TXS'
    }),
    goToPrev () {
      if (this.loaded && this.loaded_block_txs) {
        this.loaded = false
        this.loaded_block_txs = false
        clearInterval(this.blockInterval)
        helper.clearInterval(this.$nuxt.$route.name)
        this.$router.replace('/blocks/' + (parseInt(this.$route.params.height) - 1))
      }
    },
    goToNext () {
      if (this.loaded && this.loaded_block_txs) {
        this.loaded = false
        this.loaded_block_txs = false
        clearInterval(this.blockInterval)
        helper.clearInterval(this.$nuxt.$route.name)
        this.$router.replace('/blocks/' + (parseInt(this.$route.params.height) + 1))
      }
    },
    getBlock (height, init = false) {
      if (!this.$nuxt.$route.name.includes('blocks-height')) {
        helper.clearInterval(this.$nuxt.$route.name)
        return false
      }
      if (this.allowCallApi) {
        this.allowCallApi = false
        this.getBlockDetail({
          height
        }).then(() => {
          this.loaded = true
          this.notFound = false
          this.getBlockTxs({
            height
          }).then(() => {
            this.allowCallApi = true
            this.loaded_block_txs = true
            if (init) {
              clearInterval(this.blockInterval)
              this.blockInterval = setInterval(() => {
                this.getBlock(height)
              }, process.env.REAL_TIME_DELAY_MS * 2)
              localStorage.setItem('blockDetailInterval', this.blockInterval)
            }
          })
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error get block detail: ', error)
          this.allowCallApi = true
          this.loaded = true
          this.notFound = true
          this.loaded_block_txs = true
        })
      }
    }
  }
}
</script>
