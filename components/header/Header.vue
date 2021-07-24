<template>
  <div v-if="loaded" class="blocks-status no-tablet">
    <div class="status-items">
      <div class="title">
        {{ $t('text.block.height') }}
      </div>
      <div class="number">
        {{ info.block_height | formatNumber }}
      </div>
      <div class="sub-title">
        Last {{ info.timestamp | getTime }} ago
      </div>
    </div>
    <div class="status-items">
      <div class="title">
        {{ $t('text.block.transaction') }}
      </div>
      <div class="number">
        {{ info.total_txs_num | formatNumber }}
      </div>
      <div class="sub-title">
        {{ $t('text.block.total') }}
      </div>
    </div>
    <div class="status-items">
      <div class="title">
        {{ $t('text.block.bonded_tokens') }}
      </div>
      <div class="number">
        {{ info.bonded_token_percent }}%
      </div>
      <div class="sub-title">
        {{ Math.round(info.bonded_tokens / Math.pow(10, 12)) }} M / {{
          Math.round(info.total_supply / Math.pow(10, 12))
        }} M
      </div>
    </div>
    <div class="status-items">
      <div class="title">
        {{ $t('text.block.inflation') }}
      </div>
      <div class="number">
        {{ inflation | getInflation }}%
      </div>
      <div class="sub-title">
        {{ $t('text.block.year') }}
      </div>
    </div>
    <ul class="header-smaller">
      <li><span>Height:</span>&nbsp;<span class="number">{{ info.block_height | formatNumber }}</span></li>
      <li><span>Transaction:</span>&nbsp;<span class="number">{{ info.total_txs_num | formatNumber }}</span></li>
      <li><span>Bonded:</span>&nbsp;<span class="number">{{ info.bonded_token_percent }}%</span></li>
      <li><span>Inflation:</span>&nbsp;<span class="number">{{ inflation | getInflation }}%</span></li>
    </ul>
  </div>
  <div v-else class="blocks-status no-tablet">
    <div v-for="i in 4" :key="'status-items-'+i" class="status-items">
      <Skeleton v-for="j in 3" :key="j" class="blocks-status no-tablet" />
    </div>
    <ul class="header-smaller loading">
      <li v-for="i in 4" :key="i">
        <Skeleton />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
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
  data () {
    return {
      statusInterval: null,
      callSuccessStatus: true
    }
  },
  destroyed () {
    clearInterval(this.statusInterval)
  },
  mounted () {
    this.getStatusFunc(true)
    this.getInflation()
  },
  methods: {
    ...mapActions({
      getStatus: 'network/GET_DATA',
      getInflation: 'network/GET_DATA_INFLATION'
    }),
    ...mapMutations({
      setLoadedError: 'network/SET_LOADED_TRUE'
    }),
    getStatusFunc (init = false) {
      if (this.callSuccessStatus) {
        this.callSuccessStatus = false
        this.getStatus().then(() => {
          this.callSuccessStatus = true
          if (init) {
            clearInterval(this.statusInterval)
            this.statusInterval = setInterval(() => {
              this.getStatusFunc()
            }, process.env.REAL_TIME_DELAY_MS)
          }
        }).catch((error) => {
          console.log('error when getStatusFunc: ', error)
          this.setLoadedError()
          if (init) {
            clearInterval(this.statusInterval)
            this.statusInterval = setInterval(() => {
              this.getStatusFunc()
            }, process.env.REAL_TIME_DELAY_MS)
          }
        })
      }
    }
  }
}
</script>
