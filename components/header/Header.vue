<template>
  <div v-if="loaded" class="blocks-status no-tablet">
    <div class="status-items">
      <div class="title">{{ $t('text.block.height') }}</div>
      <div class="number">
        {{ info.block_height | formatNumber }}
      </div>
      <div class="sub-title">
        Last {{ info.block_time | getTime }} ago
      </div>
    </div>
    <div class="status-items">
      <div class="title">{{ $t('text.block.transaction') }}</div>
      <div class="number">
        {{ info.total_txs_num | formatNumber }}
      </div>
      <div class="sub-title">{{ $t('text.block.total') }}</div>
    </div>
    <div class="status-items">
      <div class="title">{{ $t('text.block.bonded_tokens') }}</div>
      <div class="number">
        {{ info.bonded_token_percent }}%
      </div>
      <div class="sub-title">
        {{ Math.round(info.bonded_tokens / Math.pow(10, 12)) }} M / {{ Math.round(info.total_supply / Math.pow(10, 12)) }} M
      </div>
    </div>
    <div class="status-items">
      <div class="title">{{ $t('text.block.inflation') }}</div>
      <div class="number">
        {{ inflation | getInflation }}%
      </div>
      <div class="sub-title">{{ $t('text.block.year') }}</div>
    </div>
  </div>
  <Skeleton v-else class="blocks-status no-tablet" />
</template>
<script>
import { mapActions, mapState } from 'vuex'
import helper from '~/utils/helper'

export default {
  filters: {
    getTime (value) {
      return helper.formatTime(value)
    },
    formatNumber (value) {
      return helper.formatNumber(value)
    },
    getInflation (value) {
      return (value * 100).toFixed(2)
    }
  },
  computed: {
    ...mapState('network', ['info', 'loaded', 'inflation'])
  },
  mounted () {
    this.getStatus()
    this.getInflation()
  },
  methods: {
    ...mapActions({
      getStatus: 'network/GET_DATA',
      getInflation: 'network/GET_DATA_INFLATION'
    })
  }
}
</script>
