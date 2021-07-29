<template>
  <div class="page-content header-smaller">
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
                    <input v-model="searchValidatorMoniker" class="form-control" type="text" placeholder="Search Validators">
                    <i class="fa fa-search" aria-hidden="true" />
                  </div>
                </div>

                <div class="valida-button">
                  <button :class="'btn btn-default' + (tab ? ' active' : '')" type="button" data-dismiss="modal" @click="changeTab(1)">
                    Active
                  </button>
                  <button :class="'btn btn-default' + (!tab ? ' active' : '')" type="button" data-dismiss="modal" @click="changeTab(0)">
                    Inactive
                  </button>
                </div>
              </div>
              <empty-table v-if="loaded && !validators.origin.length" :obj-name="'Validators'" />
              <div v-else class="cos-table-list md-full">
                <div class="table-responsive">
                  <table-el
                    v-show="tab"
                    :loaded="loaded"
                    :origin="validators.origin"
                    :validators="validators.active"
                    :search="searchValidatorMoniker"
                    :type="'active'"
                    :token="tokens"
                  />
                  <table-el
                    v-show="!tab"
                    :loaded="loaded"
                    :origin="validators.origin"
                    :validators="validators.inactive"
                    :search="searchValidatorMoniker"
                    :type="'inactive'"
                    :token="tokens"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="icon-back-to-top" class="back-top" @click="backToTop()">
        <i class="fa fa-arrow-up" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import headerData from '@/components/header/Header.vue'
import tableEl from '@/components/elements/validator.vue'

import Vue from 'vue'
import EmptyTable from '~/components/error/EmptyTable'
export const eventBus = new Vue()

export default {
  components: {
    EmptyTable,
    headerData,
    tableEl
  },
  data () {
    return {
      tab: 1,
      searchValidatorMoniker: ''
    }
  },
  head: {
    title: 'GAME Explorer - Validators'
  },
  computed: {
    ...mapState('validators', ['validators', 'tokens', 'loaded'])
  },
  watch: {
    searchValidatorMoniker (val) {
      eventBus.$emit('search', val)
    }
  },
  mounted () {
    this.$store.commit('validators/SET_EMPTY_VALIDATORS')
    this.getValidators()
  },
  methods: {
    ...mapActions({
      getValidators: 'validators/GET_DATA'
    }),
    changeTab (status) {
      this.tab = status
    },
    backToTop () {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      if (isSafari) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
