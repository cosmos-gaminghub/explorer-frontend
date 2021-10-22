<template>
  <div class="page-content header-smaller">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              Transactions
            </h2>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <div class="main-md-content delegated-missed md-full">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full">
                  <empty-table v-if="loaded && !transactions.length" :obj-name="'Transactions'" />
                  <div v-else class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-left">
                        <thead>
                          <tr>
                            <th>Tx Hash</th>
                            <th class="text-left">Type</th>
                            <th class="text-left">Result</th>
                            <th class="text-right">Amount</th>
                            <th class="text-right">Fee</th>
                            <th class="text-right">Height</th>
                            <th class="text-right">Time</th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded">
                          <tr v-for="tx in transactions" :key="tx.tx_hash">
                            <td>
                              <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                                {{ tx.tx_hash | formatHash }}
                              </nuxt-link>
                            </td>
                            <td class="text-left"><span class="box btn2">{{ tx.type_tx_convert }}</span></td>
                            <td :class="'text-left ' + (!tx.status ? 'green' : 'red')">
                              <span class="title">Result</span>
                              {{ !tx.status ? 'Success' : 'Failed' }}
                            </td>
                            <td v-if="tx.total_amount != null" class="text-right">
                              <span class="title">Amount</span>
                              {{ tx.total_amount | formatAmount }} {{ current_denom }}
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
                            <td class="text-right">
                              <span class="title">Fee</span>
                              {{ tx.fee | getFeeTx }} {{ current_denom }}
                            </td>
                            <td class="text-right">
                              <span class="title">Height</span>
                              <nuxt-link class="box btn1" :to="'/blocks/' + tx.height">
                                {{ tx.height }}
                              </nuxt-link>
                            </td>
                            <td class="text-right">
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
import helper from '~/utils/helper'
import EmptyTable from '~/components/error/EmptyTable'

export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    getFeeTx (value) {
      const totalAmount = helper.getFeeTx(value)
      return (totalAmount / Math.pow(10, 6)).toFixed(6)
    },
    formatAmount (value) {
      return (value / Math.pow(10, 6)).toFixed(6)
    },
    getTime (value) {
      return helper.formatTime(value)
    }
  },
  components: {
    EmptyTable,
    headerData
  },
  head: {
    title: 'GAME Explorer - Txs'
  },
  data () {
    return {
      loaded: false,
      TxInterval: null,
      allowCallApi: true
    }
  },
  computed: {
    ...mapState('transactions', ['transactions']),
    current_denom () {
      return this.$store.state.network.current_network ? this.$store.state.network.current_network.denom : 'ATOM'
    }
  },
  mounted () {
    this.$store.commit('network/SET_CURRENT_NETWORK')
    helper.clearInterval(this.$nuxt.$route.name)
    clearInterval(this.TxInterval)
    this.getTxsFunc(true)
  },
  destroyed () {
    clearInterval(this.TxInterval)
  },
  methods: {
    ...mapActions({
      getTxs: 'transactions/GET_DATA'
    }),
    getTxsFunc (init = false) {
      if (!this.$nuxt.$route.name.includes('transactions')) {
        helper.clearInterval(this.$nuxt.$route.name)
        return false
      }
      if (this.allowCallApi) {
        this.getTxs({
          size: 20
        }).then(() => {
          this.loaded = true
          if (init) {
            clearInterval(this.TxInterval)
            this.TxInterval = setInterval(() => {
              this.getTxsFunc()
            }, process.env.REAL_TIME_DELAY_MS * 2.5)
            localStorage.setItem('TxInterval', this.TxInterval)
          }
        }).catch(() => {
          this.loaded = true
        })
      }
    }
  }
}
</script>
