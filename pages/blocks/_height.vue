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
                        {{ block_detail.time | getTime }} ago ( {{ block_detail.time | formatTime }} )
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
                  <empty-table v-if="loaded && !block_txs.length" :obj-name="'Proposed Transactions'" />
                  <div v-else class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-left">
                        <thead>
                          <tr>
                            <th>Tx Hash</th>
                            <th>Type</th>
                            <th>Result</th>
                            <th>Amount</th>
                            <th class="text-center">
                              Fee
                            </th>
                            <th>Height</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded">
                          <tr v-for="tx in block_txs" :key="tx.tx_hash">
                            <td>
                              <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                                {{ tx.tx_hash | getHash }}
                              </nuxt-link>
                            </td>
                            <td><span class="box btn2">{{ tx.messages | getTypeTx }}</span></td>
                            <td :class="tx.status ? 'green' : 'red'">
                              <span class="title">Result</span>
                              {{ tx.status ? 'Success' : 'Failed' }}
                            </td>
                            <td v-if="tx.total_amount !== null">
                              <span class="title">Amount</span>
                              {{ tx.total_amount | formatAmount }} ATOM
                            </td>
                            <td v-else>
                              <span class="title">Amount</span>
                              <nuxt-link :to="'/transactions/'+tx.tx_hash">
                                More
                              </nuxt-link>
                            </td>
                            <td class="text-center">
                              <span class="title">Free</span>
                              {{ tx.fee | getFeeTx }} ATOM
                            </td>
                            <td>
                              <span class="title">Height</span>
                              <nuxt-link class="box btn1" :to="'/blocks/' + tx.height">
                                {{ tx.height }}
                              </nuxt-link>
                            </td>
                            <td>
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
    getTypeTx (value) {
      return helper.getTypeTx(value)
    },
    getFeeTx (value) {
      const totalAmount = helper.getFeeTx(value)
      return totalAmount / Math.pow(10, 6)
    },
    formatAmount (value) {
      return (value / Math.pow(10, 6)).toFixed(6)
    }
  },
  components: {
    headerData,
    NotFound,
    EmptyTable
  },
  header: {
    title: 'Block detail'
  },
  data () {
    return {
      loaded: false,
      notFound: false
    }
  },
  computed: {
    ...mapState('blocks', ['block_detail', 'block_txs'])
  },
  watch: {
    $route () {
      if (this.$route.params.height) {
        this.getBlock(this.$route.params.height)
      }
    }
  },
  mounted () {
    if (this.$route.params.height) {
      this.getBlock(this.$route.params.height)
    }
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
      this.$router.replace('/blocks/' + (parseInt(this.$route.params.height) - 1))
    },
    goToNext () {
      this.$router.replace('/blocks/' + (parseInt(this.$route.params.height) + 1))
    },
    getBlock (height) {
      this.getBlockDetail({
        height
      }).then(() => {
        this.getBlockTxs({
          height
        }).then(() => {
          this.loaded = true
          this.notFound = false
        })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error get block detail: ', error)
        this.loaded = true
        this.notFound = true
      })
    }
  }
}
</script>
