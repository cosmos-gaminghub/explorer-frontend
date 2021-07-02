<template>
  <table class="table table-striped table-bordered table-hover text-center table-validators">
    <thead>
      <tr>
        <th class="text-center">
          Rank
        </th>
        <th class="text-left">
          Validator
        </th>
        <th class="text-center td_pd">
          Voting Power
        </th>
        <th class="text-left">
          % Cumulative Share
        </th>
        <th class="text-center">
          Uptime
        </th>
        <th class="text-center">
          Commission
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
      <tr v-for="(validator, index) in filteredRow" :key="index">
        <th class="text-center" scope="row">
          <div class="stt">
            {{ validator.rank }}
          </div>
        </th>
        <td class="text-left">
          <nuxt-link :to="'/validators/'+validator.operator_address" class="acount-snow">
            <div :class="'va_avatar' + (validator.jailed ? ' inactive' : ' active')">
              <img :src="validator.operator_address | avatarValidator" onError="this.onerror=null;this.src='https://www.mintscan.io/static/media/validator_none.83868b17.svg'" alt="Title">
            </div>
            <span class="va_name">{{ validator.moniker }}</span>
          </nuxt-link>
        </td>
        <td class="text-center">
          <span class="title">Voting Power</span>
          <div class="cnt-validator-power">
            <p>{{ validator.voting_power | formatNumberVotingPower }}</p>
            <p class="value-percent">
              {{ validator.voting_power | getPercentVotingPower(token) }}
            </p>
          </div>
        </td>
        <td v-if="calculated && type == 'active'" class="text-right">
          <div class="prog">
            <div class="cum" :style="origin | getWidthCumulativeShare(validator.index, token)" />
            <div class="fill" :style="validator.voting_power | getWidthVotingWidth(token)" />
          </div>
          <p class="value">
            {{ origin | getCumulativeShare(validator.index, token) }}%
          </p>
        </td>
        <td v-else-if="type == 'inactive'" class="text-right">
          <div class="prog">
            <div class="cum" style="width: 0%" />
            <div class="fill" style="width: 0%" />
          </div>
          <p class="value">
            0.<small>00</small>%
          </p>
        </td>
        <td v-else>
          <Skeleton />
        </td>
        <td class="text-center">
          <span class="title">Uptime</span>
          {{ validator.uptime }}%
        </td>
        <td class="text-center">
          <span class="title">Commission</span>
          {{ validator.commission | getPercent }}
        </td>
      </tr>
    </tbody>
  </table>
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
    avatarValidator (value) {
      return helper.getAvatarValidator(value)
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
    getWidthCumulativeShare (value, index, token) {
      return 'width:' + helper.cumulativeShare(value, index, token) + '%'
    },
    getCumulativeShare (value, index, token) {
      return helper.cumulativeShare(value, index, token)
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['validators', 'type', 'calculated', 'token', 'loaded', 'origin'],
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    filteredRow () {
      return this.validators.filter((row) => {
        if (!this.searchValue) { return true }
        if (String(row.moniker).includes(this.searchValue)) {
          return true
        }
        return false
      })
    }
  },
  created () {
    eventBus.$on('search', (data) => {
      this.filterData(data)
    })
  },
  methods: {
    filterData (data) {
      this.searchValue = data
    }
  }
}
</script>
