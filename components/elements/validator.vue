<template>
  <table v-if="!loaded" class="table table-striped table-bordered table-hover text-center table-validators">
    <thead>
      <tr>
        <th class="text-center">
          Rank
        </th>
        <th class="text-center">
          Validator
        </th>
        <th class="text-center td_pd">
          Voting Power
        </th>
        <th class="text-center">
          % Cumulative Share
        </th>
        <th class="text-center">
          Uptime
        </th>
        <th class="text-center">
          Total Missed Blocks
        </th>
        <th class="text-center">
          Commission
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 5" :key="i">
        <td colspan="7" class="td-skeleton">
          <Skeleton />
        </td>
      </tr>
    </tbody>
  </table>
  <b-table
    v-else
    id="table-validators"
    :table-class="'table table-striped table-bordered table-hover text-center table-validators'"
    :token="token"
    :items="filteredRow"
    :fields="fields_option"
    :no-sort-reset="true"
    primary-key="operator_address"
    responsive="sm"
  >
    <template #cell(operator_address)="row">
      <nuxt-link :to="'/validators/'+row.value" class="acount-snow">
        <div :class="'va_avatar' + (row.item.jailed ? ' inactive' : ' active')">
          <img v-if="row.value" v-lazy="row.item.image_url" onError="this.onerror=null;this.src='https://www.mintscan.io/static/media/validator_none.83868b17.svg'" :alt="row.item.moniker">
        </div>
        <span class="va_name">{{ row.item.moniker }}</span>
      </nuxt-link>
    </template>
    <template #cell(rank)="row">
      <div :class="'stt' + ((parseInt(row.value) > 10) ? ' not-top-ten' : '')">
        {{ row.value }}
      </div>
    </template>
    <template #cell(voting_power)="row">
      <span class="title">Voting Power</span>
      <div class="cnt-validator-power">
        <p>{{ row.value | formatNumberVotingPower }}</p>
        <p class="value-percent">
          {{ row.value | getPercentVotingPower(token) }}
        </p>
      </div>
    </template>
    <template #cell(width_cumulative_share)="row">
      <div v-if="type === 'active'" class="prog">
        <div class="cum" :style="origin | getWidthCumulativeShare(row.item.index, token, row.item.voting_power)" />
        <div class="fill" :style="row.item.voting_power | getWidthVotingWidth(token)" />
      </div>
      <div v-else class="prog">
        <div class="cum" style="width: 0%" />
        <div class="fill" style="width: 0%" />
      </div>
      <p v-if="token" class="value">
        {{ origin | getCumulativeShare(row.item.index, token, type) }}%
      </p>
    </template>
    <template #cell(uptime)="row">
      <span class="title">Uptime</span>
      {{ row.value }}%
    </template>
    <template #cell(commission)="row">
      <span class="title">Commission</span>
      {{ row.value | getPercent }}
    </template>
  </b-table>
</template>
<script>
import helper from '~/utils/helper'
import { eventBus } from '~/pages/validators'

export default {
  filters: {
    formatTxHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    formatNumberVotingPower (value) {
      return helper.formatNumber(Math.round(value / Math.pow(10, 6)))
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    getPercent (value) {
      return (value ? (value * 100).toFixed(2) : 0.00) + '%'
    },
    getPercentVotingPower (value, token) {
      return (token ? ((value / token) * Math.pow(10, 2)).toFixed(2) : 0.00) + '%'
    },
    getWidthVotingWidth (value, token) {
      return 'width:' + (token ? ((value / token) * Math.pow(10, 2)).toFixed(2) : 0.00) + '%'
    },
    getWidthCumulativeShare (value, index, token, votingPower) {
      const percentVoting = (votingPower / token) * Math.pow(10, 2)
      const percentCumulativeShare = helper.cumulativeShare(value, index, token, 'active')
      return 'width:' + ((percentVoting > 0) ? (percentCumulativeShare - percentVoting) : percentCumulativeShare) + '%'
    },
    getCumulativeShare (value, index, token, type) {
      return helper.cumulativeShare(value, index, token, type)
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['validators', 'type', 'token', 'loaded', 'origin'],
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    filteredRow () {
      return this.validators.filter((row) => {
        if (!this.searchValue) { return true }
        if (String(row.moniker).toLowerCase().includes(this.searchValue.toLowerCase())) {
          return true
        }
        return false
      })
    },
    fields_option () {
      return [
        {
          key: 'rank',
          label: 'Rank',
          sortable: false
        },
        {
          key: 'operator_address',
          label: 'Validator',
          sortable: false
        },
        {
          key: 'voting_power',
          label: 'Voting Power',
          sortable: true
        },
        {
          key: 'width_cumulative_share',
          label: '% Cumulative Share',
          sortable: false
        },
        {
          key: 'uptime',
          label: 'Uptime',
          sortable: true
        },
        {
          key: 'commission',
          label: 'Commission',
          sortable: true
        }
      ]
    }
  },
  created () {
    eventBus.$on('search', (data) => {
      this.filterData(data)
    })
  },
  watch: {
    filteredRow (a, b) {
      this.changeValidatorImage(this.filteredRow)
    }
  },
  methods: {
    filterData (data) {
      this.searchValue = data
    },
    async getKeyBaseImage (identity) {
      return await new Promise((resolve, reject) => {
        this.$axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    },
    async changeValidatorImage (filteredRow) {
      let index = 0
      for (const element of filteredRow) {
        if (element.identity !== '') {
          await this.getKeyBaseImage(element.identity).then((data) => {
            if (data.status.name === 'OK') {
              const imageUrl = data.them[0].pictures.primary.url
              this.emitChangeImageUrl(index, imageUrl)
            }
          })
        }
        index += 1
      }
    },
    emitChangeImageUrl (index, imageUrl) {
      this.$store.commit('validators/SET_IMAGE_URL', {
        type: this.type,
        index,
        imageUrl
      })
    }
  }
}
</script>
