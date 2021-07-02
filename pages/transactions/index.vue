<template>
  <div class="page-content">
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
                  <div class="cos-table-list">
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
                          <tr v-for="tx in transactions" :key="tx.tx_hash">
                            <td>
                              <nuxt-link class="box btn1" :to="'/transactions/' + tx.tx_hash">
                                {{ tx.tx_hash | formatHash }}
                              </nuxt-link>
                            </td>
                            <td><span class="box btn2">{{ tx.messages | getTypeTx }}</span></td>
                            <td :class="!tx.status ? 'green' : 'red'">
                              <span class="title">Result</span>
                              {{ !tx.status ? 'Success' : 'Failed' }}
                            </td>
                            <td v-if="tx.total_amount != null">
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
import helper from '~/utils/helper'

export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    getTypeTx (value) {
      return helper.getTypeTx(value)
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
    headerData
  },
  data () {
    return {
      loaded: false,
      TxInterval: null
    }
  },
  computed: {
    ...mapState('transactions', ['transactions'])
  },
  mounted () {
    this.TxInterval = setInterval(() => {
      this.getTxs({
        size: 20
      }).then(() => {
        this.loaded = true
      })
    }, process.env.REAL_TIME_DELAY_MS)
  },
  destroyed () {
    clearInterval(this.TxInterval)
  },
  methods: {
    ...mapActions({
      getTxs: 'transactions/GET_DATA'
    })
  }
}
</script>
