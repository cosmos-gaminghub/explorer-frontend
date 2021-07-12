<template>
  <empty-table v-if="loaded && !data.length" :obj-name="'Votes'" />
  <div v-else class="cos-table-list">
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Voter</th>
            <th class="text-left">
              Tx Hash
            </th>
            <th class="text-center">
              Answer
            </th>
            <th class="text-left">
              Time
            </th>
          </tr>
        </thead>
        <tbody v-if="!loaded">
          <tr v-for="i in 5" :key="i">
            <td colspan="6" class="td-skeleton">
              <Skeleton />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="voter in filteredVote" :key="voter.tx_hash">
            <td>
              <a lass="box btn1" :href="'/account/'+voter.voter">
                {{ voter.voter | formatHash }}
              </a>
            </td>
            <td>
              <nuxt-link lass="box btn1" :to="'/transactions/'+voter.tx_hash">
                {{ voter.tx_hash | formatHash }}
              </nuxt-link>
            </td>
            <td class="text-center">
              <span class="title">Answer</span>
              <span>{{ voter.option | getOptions }}</span>
            </td>
            <td>
              <span class="title">Time</span>
              <p class="cos-note">
                {{ voter.time | calculatedTime }} ago ({{ voter.time | formatTime }})
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="well">
      <div v-if="loaded" class="pagination-wrapper">
        <pagination
          v-model="pagination.vote.page"
          :records="data.length"
          :per-page="pagination.vote.per"
          :options="optionPaginate"
        />
      </div>
    </div>
  </div>
</template>
<script>

import EmptyTable from '~/components/error/EmptyTable.vue'
import helper from '~/utils/helper'
import { eventBus } from '~/pages/proposals/_id.vue'

export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    getOptions (value) {
      return {
        VOTE_OPTION_NO: 'No',
        VOTE_OPTION_YES: 'Yes',
        VOTE_OPTION_NO_WITH_VETO: 'No With Veto',
        VOTE_OPTION_ABSTAIN: 'Abstain'
      }[value]
    },
    calculatedTime (value) {
      return helper.formatTime(value)
    },
    formatTime (value) {
      return helper.convertTime(value)
    }
  },
  components: {
    EmptyTable
  },
  props: ['data', 'loaded'],
  data () {
    return {
      pagination: {
        vote: {
          page: 1,
          per: 5,
          records: 0
        }
      },
      optionPaginate: {
        chunk: 5
      }
    }
  },
  computed: {
    filteredVote () {
      return this.data.filter((row, index) => {
        const from = (this.pagination.vote.page - 1) * this.pagination.vote.per
        const to = from + this.pagination.vote.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    }
  },
  created () {
    eventBus.$on('changeTab', (data) => {
      console.log('new tab = ', data)
      this.clearData(data)
    })
  },
  methods: {
    clearData () {
      this.pagination.vote = {
        page: 1,
        per: 5,
        records: 0
      }
    }
  }
}
</script>
