<template>
  <not-found v-if="loaded.proposal_detail && loaded.not_found" :obj-name="'Proposal with id ' + id + ' was'"></not-found>
  <div v-else class="page-content">
    <div class="main-body-content">
      <div class="cos-notice custom-page-title cos-proposals-detail">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <h2 class="page-title">
              PROPOSAL DETAILS
            </h2>
            <div class="name-item">
              <div class="number">
                #{{ proposal.id }}
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <header-data />
          </div>
        </div>
      </div>
    </div>
    <div class="main-md-content proposals-detail">
      <div class="row">
        <div class="col-md-8">
          <div class="cos-table-item">
            <div class="cos-item-content">
              <div class="cos-title">
                <a :class="'btn btn-passed btn-status-proposal ' + proposal.status">{{ proposal.status | getStatusProposal }}</a>
                <h3 class="title-cos">
                  {{ proposal.content ? proposal.content.title : '' }}
                </h3>
              </div>
              <ul class="list-owl-block">
                <li>
                  <ul class="list-infor-detail">
                    <li>
                      <div class="title">
                        Proposer
                      </div>
                      <div class="detail">
                        <a :href="'/account/'+proposal.proposer">
                          {{ proposal.moniker || proposal.proposer }}
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Initial Deposit
                      </div>
                      <div class="detail">
                        {{ initialDeposit | convertAmount(true) }}.{{ initialDeposit | convertAmount(false) }} ATOM
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Total Deposit
                      </div>
                      <div class="detail">
                        {{ proposal.total_deposit | getTotalFromArr(true) }}.{{ proposal.total_deposit | getTotalFromArr(false) }} ATOM
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Voting Start
                      </div>
                      <div class="detail">
                        {{ proposal.voting_start | convertTime }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Voting End
                      </div>
                      <div class="detail">
                        {{ proposal.voting_end | convertTime }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Type
                      </div>
                      <div v-if="proposal.content" class="detail">
                        {{ proposal.content.type | getTypeProposal }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Submit Time
                      </div>
                      <div class="detail">
                        {{ proposal.submit_time | convertTime }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Deposit End Time
                      </div>
                      <div class="detail">
                        {{ proposal.deposit_end_time | convertTime }}
                      </div>
                    </li>
                    <li>
                      <div class="title title-detail-proposal">
                        Details
                      </div>
                      <div class="detail" v-html="detectUrl" />
                    </li>
                    <li v-if="proposal.content && proposal.content.changes && proposal.content.changes.length">
                      <div class="title">
                        Parameter Changes
                      </div>
                      <div v-if="proposal.content" class="detail">
                        <div v-for="(change, index) in proposal.content.changes" :key="'params_'+index">
                          <span>{{ change.key }}</span>
                          <span>:</span>
                          <span v-if="change.value">
                            <span v-if="typeof JSON.parse(change.value) == 'object'">
                              <div v-for="(value, index) in JSON.parse(change.value)" :key="index">
                                <span v-if="typeof value == 'string'">{{ index }}: {{ value }}</span>
                                <span v-else-if="value">
                                  <div v-for="(item, indexChild) in value" :key="indexChild">
                                    <span>{{ index }}: {{ item.amount | convertAmount(true) }}.{{ item.amount | convertAmount(false) }} ATOM</span>
                                  </div>
                                </span>
                              </div>
                            </span>
                            <span v-else-if="change.key.search('Rate') >= 0">{{ (parseFloat(JSON.parse(change.value)) * Math.pow(10, 2)).toFixed(2) }}%</span>
                            <span v-else>{{ change.value }}</span>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li v-if="proposal.content && proposal.content.amount && proposal.content.amount.length">
                      <div class="title">
                        Request Amount
                      </div>
                      <div class="detail">
                        {{ proposal.content.amount | getTotalFromArr(true) }}.{{ proposal.content.amount | getTotalFromArr(false) }} ATOM
                      </div>
                    </li>
                    <li v-if="proposal.content && proposal.content.plan">
                      <div class="title">
                        Software Upgrade
                      </div>
                      <div v-if="proposal.content.plan" class="detail">
                        <div v-for="(item, index) in proposal.content.plan" :key="'software'+index">
                          <span v-if="['name', 'time', 'height', 'info', 'upgraded_client_state'].includes(index)">{{ index }}: </span>
                          <span v-if="['name', 'time', 'height', 'info', 'upgraded_client_state'].includes(index)">{{ item }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="cnt-chart-acc">
            <div class="cnt-text">
              <div class="total-atom">
                Total ATOM
              </div>
              <h3>{{ voteData.total | convertAmount(true) }}.{{ voteData.total | convertAmount(false) }}</h3>
              <div class="detail-chart">
                <p>ATOM</p>
              </div>
            </div>
            <div class="content-chart">
              <div class="images">
                <doughnut
                  :data="data"
                  :options="options"
                  :height="196"
                  :width="192"
                />
              </div>
              <div class="note-chart">
                <ul v-if="proposal && proposal.tally">
                  <li>
                    <div class="color col-green">
                      <i class="fa fa-circle" aria-hidden="true" />
                    </div>
                    <div class="name-title">
                      Yes
                    </div>
                    <div class="percent">
                      {{ proposal.tally.yes | getPercent(voteData.total) }}%
                    </div>
                    <div class="number">
                      {{ proposal.tally.yes | convertAmount(true) }}.{{ proposal.tally.yes | convertAmount(false) }}
                    </div>
                  </li>
                  <li>
                    <div class="color col-red">
                      <i class="fa fa-circle" aria-hidden="true" />
                    </div>
                    <div class="name-title">
                      No
                    </div>
                    <div class="percent">
                      {{ proposal.tally.no | getPercent(voteData.total) }}%
                    </div>
                    <div class="number">
                      {{ proposal.tally.no | convertAmount(true) }}.{{ proposal.tally.no | convertAmount(false) }}
                    </div>
                  </li>
                  <li>
                    <div class="color col-yellow">
                      <i class="fa fa-circle" aria-hidden="true" />
                    </div>
                    <div class="name-title">
                      No With Veto
                    </div>
                    <div class="percent">
                      {{ proposal.tally.no_with_veto | getPercent(voteData.total) }}%
                    </div>
                    <div class="number">
                      {{ proposal.tally.no_with_veto | convertAmount(true) }}.{{ proposal.tally.no_with_veto | convertAmount(false) }}
                    </div>
                  </li>
                  <li>
                    <div class="color col-blue">
                      <i class="fa fa-circle" aria-hidden="true" />
                    </div>
                    <div class="name-title">
                      Abstain
                    </div>
                    <div class="percent">
                      {{ proposal.tally.abstain | getPercent(voteData.total) }}%
                    </div>
                    <div class="number">
                      {{ proposal.tally.abstain | convertAmount(true) }}.{{ proposal.tally.abstain | convertAmount(false) }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-md-content table-votes">
      <div class="cos-table-item">
        <div class="cos-item-content md-full">
          <div class="cos-title">
            <h3 class="title-cos">
              <span>Votes</span>
            </h3>
            <ul class="list-filter">
              <li :class="voteData.current === tabVoter.all ? 'active' : ''">
                <span class="tab" @click="changeTab(tabVoter.all)">All <span>({{ vote.length }})</span></span>
              </li>
              <li :class="voteData.current === tabVoter.yes ? 'active' : ''">
                <span class="tab" @click="changeTab(tabVoter.yes)">Yes
                  <span>({{ voteData.yes.length }})</span>
                </span>
              </li>
              <li :class="voteData.current === tabVoter.no ? 'active' : ''">
                <span class="tab" @click="changeTab(tabVoter.no)">No
                  <span>({{ voteData.no.length }})</span>
                </span>
              </li>
              <li :class="voteData.current === tabVoter.no_with_veto ? 'active' : ''">
                <span class="tab" @click="changeTab(tabVoter.no_with_veto)">No with Veto
                  <span>({{ voteData.no_with_veto.length }})</span>
                </span>
              </li>
              <li :class="voteData.current === tabVoter.abstain ? 'active' : ''">
                <span class="tab" @click="changeTab(tabVoter.abstain)">Abstain
                  <span>({{ voteData.abstain.length }})</span>
                </span>
              </li>
            </ul>
          </div>
          <voter-table
            :v-hide="(voteData.current !== tabVoter.all)"
            :data="vote"
            :loaded="loaded.vote"
          />
          <voter-table
            :v-hide="(voteData.current !== tabVoter.yes)"
            :data="voteData.yes"
            :loaded="loaded.vote"
          />
          <voter-table
            :v-hide="(voteData.current !== tabVoter.no)"
            :data="voteData.no"
            :loaded="loaded.vote"
          />
          <voter-table
            :v-hide="(voteData.current !== tabVoter.no_with_veto)"
            :data="voteData.no_with_veto"
            :loaded="loaded.vote"
          />
          <voter-table
            :v-hide="(voteData.current !== tabVoter.abstain)"
            :data="voteData.abstain"
            :loaded="loaded.vote"
          />
        </div>
      </div>
    </div>
    <div class="main-md-content">
      <div class="cos-table-item">
        <div class="cos-item-content md-full">
          <div class="cos-title">
            <h3 class="title-cos">
              <span>Depositors</span>
            </h3>
          </div>
          <empty-table v-if="loaded.deposit && !deposit.length" :obj-name="'Depositors'" />
          <div v-else class="cos-table-list">
            <div class="table-responsive">
              <table class="table table-striped table-bordered table-hover table-depositor">
                <thead>
                  <tr>
                    <th>Depositors</th>
                    <th class="text-left">
                      Tx Hash
                    </th>
                    <th class="text-left">
                      Amount
                    </th>
                    <th class="text-left">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody v-if="!loaded.deposit">
                  <tr v-for="i in 5" :key="i">
                    <td colspan="4" class="td-skeleton">
                      <Skeleton />
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr v-for="depositor in filteredDeposit" :key="depositor.tx_hash">
                    <td>
                      <a class="box btn1" :href="'/account/'+depositor.depositor">
                        {{ depositor.depositor | formatHash }}
                      </a>
                    </td>
                    <td>
                      <nuxt-link class="box btn1" :to="'/transactions/'+depositor.tx_hash">
                        {{ depositor.tx_hash | formatHash }}
                      </nuxt-link>
                    </td>
                    <td class="text-left">
                      <span class="title">Amount</span>
                      <span>{{ depositor.amountConv | convertAmount(true) }}.{{ depositor.amountConv | convertAmount(false) }} ATOM</span>
                    </td>
                    <td>
                      <span class="title">Time</span>
                      <p class="cos-note">
                        {{ depositor.time | calculatedTime }} ago ({{ depositor.time | convertTime }})
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="well">
              <div v-if="loaded.deposit" class="pagination-wrapper">
                <pagination
                  v-model="pagination.deposit.page"
                  :records="deposit.length"
                  :per-page="pagination.deposit.per"
                  :options="pagination.optionPaginate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable prefer-const */
import { mapState, mapActions } from 'vuex'
import headerData from '@/components/header/Header.vue'
import voterTable from '@/components/elements/voter.vue'
import Vue from 'vue'
import Doughnut from '@/components/libs/DoughnutChart.vue'
import EmptyTable from '~/components/error/EmptyTable.vue'
import helper from '~/utils/helper'
import NotFound from '~/components/error/NotFound'

export const eventBus = new Vue()
export const eventBus2 = new Vue()

export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    getStatusProposal (value) {
      return helper.getTypeProposal(value)
    },
    getTypeProposal (value) {
      value = value.split('.')
      if (value[value.length - 1]) {
        value = value[value.length - 1].split('Proposal')
      }
      return (value && value[0]) ? value[0] : ''
    },
    getTotalFromArr (value, isInt) {
      const total = helper.calculateValueFromArr(value) / Math.pow(10, 6)

      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    convertAmount (value, isInt) {
      value = value / Math.pow(10, 6)

      if (isInt) {
        return helper.formatNumber(parseInt(value))
      } else {
        const decimal = (value.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    convertTime (value) {
      return helper.convertTime(value)
    },
    calculatedTime (value) {
      return helper.formatTime(value)
    },
    getPercent (value, total) {
      const percent = (total) ? (value / total) * Math.pow(10, 2) : 0

      return percent.toFixed(2)
    }
  },
  components: {
    NotFound,
    headerData,
    voterTable,
    EmptyTable,
    Doughnut
  },
  data () {
    return {
      data: {
        labels: [
          'Empty'
        ],
        datasets: [{
          data: [100],
          backgroundColor: [
            '#B8BDC6'
          ],
          hoverOffset: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      loaded: {
        proposal_detail: false,
        vote: false,
        deposit: false,
        not_found: false
      },
      voteData: {
        yes: [],
        no: [],
        no_with_veto: [],
        abstain: [],
        current: 1,
        total: 0
      },
      tabVoter: {
        all: 1,
        yes: 2,
        no: 3,
        no_with_veto: 4,
        abstain: 5
      },
      pagination: {
        deposit: {
          page: 1,
          per: 5
        },
        optionPaginate: {
          chunk: 5
        }
      }
    }
  },
  head () {
    return {
      title: 'COSMOS Proposal#' + this.$route.params.id
    }
  },
  computed: {
    ...mapState('proposals', ['proposal', 'vote', 'deposit']),
    filteredDeposit () {
      return this.deposit.filter((row, index) => {
        const from = (this.pagination.deposit.page - 1) * this.pagination.deposit.per
        const to = from + this.pagination.deposit.per
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    },
    initialDeposit () {
      let value = 0
      if (this.deposit && this.proposal) {
        for (const item in this.deposit) {
          if (this.deposit[item].depositor === this.proposal.proposer) {
            value += this.deposit[item].amountConv
          }
        }
      }
      return value
    },
    detectUrl () {
      if (this.proposal && this.proposal.content && this.proposal.content.description) {
        let desc = this.proposal.content.description
        let cosmosContent = ''
        if (desc.search('<> Cosmos') >= 0) {
          desc = desc.split('<> Cosmos')
          if (desc.length > 1) {
            cosmosContent = '<cosmos ' + desc[1] + '></cosmos>'
            desc = desc[0]
          }
        }
        return desc.replaceAll(/(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w-]*)?(\?[^\s]*)?/gi, function (url) {
          return '<a href="' + url + '">' + url + '</a>'
        }).replaceAll('\\n', function (rs) {
          return '<br>'
        }) + cosmosContent
      }

      return ''
    }
  },
  watch: {
    $route () {
      if (this.$route.params.id) {
        this.getData(this.$route.params.id)
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getData(this.$route.params.id)
    }
  },
  // eslint-disable-next-line require-await,vue/order-in-components
  async asyncData ({ params }) {
    const { id } = params
    return { id }
  },
  methods: {
    ...mapActions({
      getProposalDetail: 'proposals/GET_PROPOSAL_DETAIL',
      getVote: 'proposals/GET_VOTE',
      getDeposit: 'proposals/GET_DEPOSIT'
    }),
    getData (id) {
      this.getProposalDetail({
        proposal_id: id
      }).then((proposalDetail) => {
        this.loaded.proposal_detail = true
        const yes = parseFloat(proposalDetail.tally.yes)
        const no = parseFloat(proposalDetail.tally.no)
        const noWithVeto = parseFloat(proposalDetail.tally.no_with_veto)
        const abstain = parseFloat(proposalDetail.tally.abstain)
        this.voteData.total = yes + no + noWithVeto + abstain

        if (this.voteData.total > 0) {
          this.data = {
            labels: [
              'Yes',
              'No',
              'No With Veto',
              'Abstain'
            ],
            datasets: [{
              data: [
                yes / Math.pow(10, 6),
                no / Math.pow(10, 6),
                noWithVeto / Math.pow(10, 6),
                abstain / Math.pow(10, 6)
              ],
              backgroundColor: [
                '#65A246',
                '#F0142F',
                '#F99600',
                '#57B8FF'
              ],
              hoverOffset: 1
            }]
          }
          eventBus2.$emit('changeData', this.data)
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when proposal detail: ', error)
        this.loaded.not_found = true
        this.loaded.proposal_detail = true
      })

      this.getDeposit({
        proposal_id: id
      }).then((deposit) => {
        this.loaded.deposit = true
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when get deposit: ', error)
        this.loaded.deposit = true
      })

      this.getVote({
        before: 0,
        size: 0,
        proposal_id: id
      }).then((vote) => {
        let i = 0
        for (; i < vote.length; i++) {
          // eslint-disable-next-line eqeqeq
          if (vote[i].option == 'VOTE_OPTION_NO') {
            this.voteData.no.push(vote[i])
          // eslint-disable-next-line eqeqeq
          } else if (vote[i].option == 'VOTE_OPTION_YES') {
            this.voteData.yes.push(vote[i])
          // eslint-disable-next-line eqeqeq
          } else if (vote[i].option == 'VOTE_OPTION_NO_WITH_VETO') {
            this.voteData.no_with_veto.push(vote[i])
          // eslint-disable-next-line eqeqeq
          } else if (vote[i].option == 'VOTE_OPTION_ABSTAIN') {
            this.voteData.abstain.push(vote[i])
          }
        }
        this.loaded.vote = true
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when get vote: ', error)
        this.loaded.vote = true
      })
    },
    changeTab (tab) {
      this.voteData.current = tab
      eventBus.$emit('changeTab', tab)
    }
  }
}
</script>
