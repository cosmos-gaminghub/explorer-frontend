<template>
  <div class="page-content">
    <div class="main-body-content">
      <not-found v-if="notFound" :obj-name="'Transaction'" />
      <div v-else class="cos-notice custom-page-title cos-transaction-detail">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              TRANSACTION DETAILS
            </h2>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <div class="main-md-content transaction-detail-content">
          <div class="cos-table-item">
            <div class="cos-item-content">
              <ul class="list-owl-block">
                <li>
                  <ul class="list-infor-detail">
                    <li>
                      <div class="title">
                        TxHash
                      </div>
                      <div class="detail">
                        {{ tx_detail.tx_hash }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Status
                      </div>
                      <div :class="'detail' + (!tx_detail.status ? ' green' : ' red')">
                        {{ !tx_detail.status ? 'Success' : 'Failed' }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Height
                      </div>
                      <div class="detail">
                        <nuxt-link class="box btn1" :to="'/blocks/' + tx_detail.height">
                          {{ tx_detail.height | formatNumber }}
                        </nuxt-link>
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Time
                      </div>
                      <div class="detail">
                        {{ tx_detail.timestamp | getTime }} ago ( {{ tx_detail.timestamp | formatTime }} )
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Fee
                      </div>
                      <div class="detail">
                        {{ tx_detail.fee | getFeeTx }} ATOM
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Gas (used / wanted)
                      </div>
                      <div class="detail">
                        {{ tx_detail.gas_used | formatNumber }} / {{ tx_detail.gas_wanted | formatNumber }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Memo
                      </div>
                      <div class="detail">
                        {{ tx_detail.memo }}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="main-md-content transaction-detail-message">
          <div v-if="tx_detail" class="cos-table-item">
            <div v-for="(typeTx, index) in convertTxColumns" :key="index" class="cos-item-content">
              <div class="cos-title">
                <h3 class="title-cos">
                  <span>MESSAGES: </span><span>{{ typeTx.type }}</span>
                </h3>
              </div>
              <ul v-if="typeTx.columns" class="list-owl-block">
                <li>
                  <ul class="list-infor-detail">
                    <li v-for="(column, keyColumn) in typeTx.columns" :key="'key_' + keyColumn">
                      <div class="title title-unset">
                        {{ column.title }}
                      </div>
                      <div class="detail" v-html="column.details" />
                    </li>
                  </ul>
                </li>
              </ul>
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
import NotFound from '@/components/error/NotFound.vue'
import helper from '~/utils/helper'

export default {
  filters: {
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    getFeeTx (value) {
      const totalAmount = helper.getFeeTx(value)
      return (totalAmount / Math.pow(10, 6)).toFixed(6)
    },
    formatTime (value) {
      return helper.convertTime(value)
    }
  },
  components: {
    headerData,
    NotFound
  },
  data () {
    return {
      loaded: false,
      notFound: false,
      validatorsConv: []
    }
  },
  head () {
    return {
      title: 'COSMOS Tx ' + this.$route.params.address
    }
  },
  computed: {
    ...mapState('transactions', ['tx_detail']),
    ...mapState('validators', []),
    convertTxColumns () {
      if (this.tx_detail) {
        const columns = this.tx_detail.columns
        const htmlCh = '<p class="validator-moniker display-none">'
        for (const key in columns) {
          for (const dKey in columns[key].columns) {
            const detail = columns[key].columns[dKey]
            detail.details = detail.details.toString()
            if (detail.details.search(htmlCh) > 0) {
              let arr = detail.details.split(htmlCh)
              arr = arr[1].split('</p>')
              const addr = arr[0]
              if (this.validatorsConv[addr]) {
                columns[key].columns[dKey].details = detail.details.replace(htmlCh + addr, '<p>(' + this.validatorsConv[addr] + ')')
              }
            }
          }
        }

        return columns
      }

      return []
    }
  },
  watch: {
    $route () {
      if (this.$route.params.address) {
        this.loadData(this.$route.params.address)
      }
    }
  },
  mounted () {
    this.setEmptyTx()
    if (this.$route.params.address) {
      this.loadData(this.$route.params.address)
    }
  },
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { address } = params
    return { address }
  },
  methods: {
    ...mapActions({
      getTransactionDetail: 'transactions/GET_TRANSACTION_DETAIL',
      getValidators: 'validators/GET_DATA'
    }),
    ...mapMutations({
      setEmptyTx: 'transactions/SET_EMPTY_TX'
    }),
    // eslint-disable-next-line camelcase
    loadData (tx_hash) {
      this.getTransactionDetail({
        tx_hash
      }).then(() => {
        this.loaded = true
        this.notFound = false
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('eror load tx detail: ', error)
        this.loaded = true
        this.notFound = true
      })

      this.getValidators().then((validators) => {
        this.validatorsConv = helper.convertValidators(validators)
      })
    }
  }
}
</script>
