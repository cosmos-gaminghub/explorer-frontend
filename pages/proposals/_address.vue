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
    title: 'Proposal detail'
  },
  data () {
    return {
      tab: 1
    }
  },
  computed: {
    ...mapState('proposals', ['proposal'])
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
