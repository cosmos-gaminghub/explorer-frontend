<template>
  <div class="main-body-content">
    <div class="cos-notice custom-page-title">
      <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <h2 class="page-title">
            {{ $t('menu.validator') }}
          </h2>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12">
          <header-data />
        </div>
      </div>
      <div class="main-md-content md-full main-validator">
        <div class="cos-table-item md-full">
          <div class="cos-item-content md-full">
            <div class="validator-search md-full mdb_10 fl_right">
              <div class="valida-search">
                <div class="input-search">
                  <input class="form-control" type="text" placeholder="Search Validators"><i class="fa fa-search" aria-hidden="true" />
                </div>
              </div>

              <div class="valida-button">
                <button class="btn btn-default active" type="button" data-dismiss="modal">
                  Active
                </button>
                <button class="btn btn-default" type="button" data-dismiss="modal">
                  Inactive
                </button>
              </div>
            </div>
            <div class="cos-table-list md-full">
              <div class="table-responsive">
                <table-el :validators="validators.active" :type="'active'"></table-el>
                <table-el :validators="validators.inactive" :type="'inactive'"></table-el>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import headerData from '@/components/header/Header.vue'
import tableEl from '@/components/elements/validator.vue'

export default {
  components: {
    headerData, tableEl
  },
  header: {
    title: 'Validator'
  },
  data () {
    return {
      tab: 1
    }
  },
  computed: {
    ...mapState('validators', ['validators']),
    ...mapState('network', ['info', 'bondedTokens'])
  },
  mounted () {
    this.getValidators()
    if (this.info) {
      this.cumulativeShare(this.bondedTokens)
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'network/SET_STATUS_INFO' && this.info) {
        this.cumulativeShare(this.bondedTokens)
      }
    })
  },
  methods: {
    ...mapActions({
      getValidators: 'validators/GET_DATA'
    }),
    ...mapMutations({
      cumulativeShare: 'validators/SET_CUMULATIVE_SHARE'
    })
  }
}
</script>
