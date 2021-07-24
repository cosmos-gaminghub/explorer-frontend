<template>
  <div class="page-content header-smaller">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              Proposals
            </h2>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <chart-el :proposals="proposals" />
        <div class="main-md-content delegated-missed">
          <div :class="'cos-table-item table-proposal'+(loaded && !proposals.length ? 'no_proposal' : '')">
            <div class="cos-item-content">
              <empty-table v-if="loaded && !proposals.length" :obj-name="'PROPOSALS'" />
              <div v-else class="cos-table-list">
                <div class="table-responsive">
                  <table class="table table-striped table-bordered table-hover text-left table-proposals-page">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Voting Start</th>
                        <th class="text-center">Summit time</th>
                        <th class="text-center">Total Deposit</th>
                      </tr>
                    </thead>
                    <tbody v-if="loaded">
                      <tr v-for="proposal in proposals" :key="proposal.id">
                        <td><span class="number">#{{ proposal.id }}</span></td>
                        <td>
                          <nuxt-link :to="'/proposals/'+proposal.id">
                            {{ proposal.content.title }}
                          </nuxt-link>
                        </td>
                        <td class="text-center">
                          <span class="title">Status</span>
                          <div :class="'box blue_line ' + proposal.status">
                            {{ proposal.status | getTypeProposal }}
                          </div>
                        </td>
                        <td class="text-center">
                          <span class="title">Voting Start</span>
                          {{ proposal.voting_start | convertTime }}
                        </td>
                        <td class="text-center">
                          <span class="title">Summit time</span>
                          {{ proposal.submit_time | convertTime }}
                        </td>
                        <td class="text-center">
                          <span class="title">Total Deposit</span>
                          <span>{{ proposal.total_deposit | getTotalDeposit(true) }}.{{ proposal.total_deposit | getTotalDeposit(false) }} ATOM</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr v-for="i in 5" :key="i">
                        <td colspan="6" class="td-skeleton">
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
</template>
<script>
import { mapState, mapActions } from 'vuex'
import headerData from '@/components/header/Header.vue'
import chartEl from '@/components/elements/proposalsChart.vue'
import EmptyTable from '@/components/error/EmptyTable.vue'
import helper from '~/utils/helper'
export default {
  filters: {
    getTypeProposal (value) {
      return helper.getTypeProposal(value)
    },
    convertTime (value) {
      return helper.convertTime(value)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTotalDeposit (value, isInt) {
      const total = helper.calculateValueFromArr(value) / Math.pow(10, 6)

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
    chartEl,
    EmptyTable
  },
  data () {
    return {
      loaded: false
    }
  },
  head: {
    title: 'CCN - COSMOS Proposals'
  },
  computed: {
    ...mapState('proposals', ['proposals'])
  },
  mounted () {
    this.getPproposals().then(() => {
      this.loaded = true
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error get list proposals', err)
      this.loaded = true
    })
  },
  methods: {
    ...mapActions({
      getPproposals: 'proposals/GET_DATA'
    })
  }
}
</script>
