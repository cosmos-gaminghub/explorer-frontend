<template>
  <div class="main-body-content">
    <div class="cos-notice custom-page-title cos-transaction-detail">
      <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <h2 class="page-title">
            TRANSACTION DETAILS
          </h2>
          <div class="link-transaction">
            <a class="box btn1" href="#">4749FEB…0417E7</a>
            <button class="btn-coppy">
              <i class="fa fa-files-o" aria-hidden="true" />Copy
            </button>
          </div>
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
                      4749FEB655F7E3445B2615E52E9F01228F97A980633C5229E40C1381DF0417E7
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Status
                    </div>
                    <div class="detail green">
                      Success
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Height
                    </div>
                    <div class="detail">
                      6,308,258
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Time
                    </div>
                    <div class="detail">
                      17s ago ( 2021-05-22 19:46:47 )
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Fee
                    </div>
                    <div class="detail">
                      0.002500ATOM
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Gas (used / wanted)
                    </div>
                    <div class="detail">
                      62,424 / 85,000
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Memo
                    </div>
                    <div class="detail">
                      2842730
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="main-md-content transaction-detail-message">
        <div class="cos-table-item">
          <div class="cos-item-content">
            <div class="cos-title">
              <h3 class="title-cos">
                <span>MESSAGE: </span><span>Send</span>
              </h3>
            </div>
            <ul class="list-owl-block">
              <li>
                <ul class="list-infor-detail">
                  <li>
                    <div class="title">
                      From Address
                    </div>
                    <div class="detail">
                      cosmos1t5u0jfg3ljsjrh2m9e47d4ny2hea7eehxrzdgd
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      To Address
                    </div>
                    <div class="detail">
                      cosmos1553kvgnmwvlwgzgcedgue7euu2dg49k2k5epvk
                    </div>
                  </li>
                  <li>
                    <div class="title">
                      Amount
                    </div>
                    <div class="detail">
                      1.919006ATOM
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import headerData from '@/components/header/Header.vue'

export default {
  components: {
    headerData
  },
  header: {
    title: 'Transaction detail'
  },
  data () {
    return {
      tab: 1
    }
  },
  computed: {
    ...mapState('blocks', ['blocks'])
  },
  watch: {
    $route () {
      if (this.$route.params.address) {
        /** */
      }
    }
  },
  mounted () {},
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { address } = params
    return { address }
  },
  methods: {}
}
</script>
