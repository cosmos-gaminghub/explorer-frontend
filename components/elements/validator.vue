<template>
  <table class="table table-striped table-bordered table-hover text-center">
    <thead>
      <tr>
        <th class="text-center">
          Rank
        </th>
        <th class="text-left">
          Validator
        </th>
        <th class="text-right td_pd">
          Voting Power
        </th>
        <th class="text-left">
          % Cumulative Share
        </th>
        <th class="text-left">
          Uptime
        </th>
        <th class="text-left">
          Commission
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(validator, index) in validators" :key="index">
        <th class="text-center" scope="row">
          <div class="stt">
            {{ (type === 'active') ? index : (index + 125) }}
          </div>
        </th>
        <td class="text-left">
          <nuxt-link :to="'/validators/'+validator.operator_address">
            <div class="va_avatar">
              <img :src="validator.operator_address | avatarValidator" alt="Title">
            </div>
            <span class="va_name">{{ validator.moniker }}</span>
          </nuxt-link>
        </td>
        <td class="text-right">
          <p>{{ validator.voting_power | formatNumber }}</p>
          <p class="value-percent">
            {{ validator.percent_voting_power | getPercent }}
          </p>
        </td>
        <td v-if="validator.cumulative_share != -1" class="text-right">
          <div class="prog">
            <div class="cum" :style="validator.cumulative_share | getWidthCumulativeShare" />
          </div>
          <p class="value">
            {{ validator.cumulative_share | getPercent }}
          </p>
        </td>
        <td v-else>
          <Skeleton />
        </td>
        <td class="text-left">
          {{ validator.uptime }}%
        </td>
        <td class="text-left">
          {{ validator.commission | getPercent }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import helper from '~/utils/helper'

export default {
  filters: {
    formatTxHash (value) {
      return value.substr(0, 6) + '...' + value.substr(value.length - 7, value.length - 1)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getTime (value) {
      return helper.formatTime(value)
    },
    avatarValidator (value) {
      const src = 'https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/moniker/cosmoshub/' + value + '.png'
      return src
    },
    getPercent (value) {
      return (value ? parseInt(value * 10000) / 100 : 0) + '%'
    },
    getWidthCumulativeShare (value) {
      return value ? 'width:' + (parseInt(value * 10000) / 100) + '%' : '0%'
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['validators', 'type']
}
</script>
