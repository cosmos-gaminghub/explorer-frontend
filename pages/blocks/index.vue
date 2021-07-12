<template>
  <div class="page-content">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              Blocks
            </h2>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
        <div class="main-md-content delegated-missed md-full">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="cos-table-item table-transactions">
                <div class="cos-item-content md-full">
                  <div class="cos-table-list">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered table-hover text-center table-page-block">
                        <thead>
                          <tr>
                            <th class="text-left">
                              Height
                            </th>
                            <th class="text-left">
                              Block Hash
                            </th>
                            <th class="text-left">
                              Proposer
                            </th>
                            <th class="text-center">
                              Txs
                            </th>
                            <th class="text-left">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="loaded">
                          <tr v-for="block in blocks" :key="block.height">
                            <td class="text-left">
                              <nuxt-link class="box btn1" :to="'/blocks/' + block.height">
                                {{ block.height }}
                              </nuxt-link>
                            </td>
                            <td class="text-left">
                              <nuxt-link class="box btn1" :to="'/blocks/' + block.height">
                                {{ block.hash | formatHash }}
                              </nuxt-link>
                            </td>
                            <td class="text-left">
                              <span class="title">Proposer</span>
                              <nuxt-link :to="'/validators/' + block.operator_address">
                                {{ block.moniker }}
                              </nuxt-link>
                            </td>
                            <td class="text-center">
                              <span class="title">Txs</span>
                              {{ block.num_txs }}
                            </td>
                            <td class="text-left">
                              <span class="title">Time</span>
                              <p class="cos-note">
                                {{ block.time | getTime }} ago
                              </p>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-for="i in 5" :key="i">
                            <td colspan="5" class="td-skeleton">
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
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import headerData from '@/components/header/Header.vue'
import helper from '@/utils/helper'
export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 8, 8)
    },
    getTime (value) {
      return helper.formatTime(value)
    }
  },
  components: {
    headerData
  },
  head: {
    title: 'CCN - COSMOS Blocks'
  },
  data () {
    return {
      loaded: false,
      blockInterval: null,
      allowCallApi: true
    }
  },
  computed: {
    ...mapState('blocks', ['blocks'])
  },
  mounted () {
    this.getBlocksFunc(true)
  },
  destroyed () {
    clearInterval(this.blockInterval)
  },
  methods: {
    ...mapActions({
      getBlocks: 'blocks/GET_DATA'
    }),
    getBlocksFunc (init = false) {
      if (this.allowCallApi) {
        this.allowCallApi = false
        this.getBlocks({
          offset: 0,
          size: 20
        }).then(() => {
          this.allowCallApi = true
          this.loaded = true
          if (init) {
            clearInterval(this.blockInterval)
            this.blockInterval = setInterval(() => {
              this.getBlocksFunc()
            }, process.env.REAL_TIME_DELAY_MS)
          }
        })
      }
    }
  }
}
</script>
