<template>
  <div v-if="proposal" class="page-content">
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
                        {{ proposal.proposer }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Initial Deposit
                      </div>
                      <div class="detail">
                        1.000000 ATOM
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Total Deposit
                      </div>
                      <div class="detail">
                        {{ proposal.total_deposit | getTotalDeposit(true) }}.{{ proposal.total_deposit | getTotalDeposit(false) }} ATOM
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
                        2021-05-20 22:24:15
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Details
                      </div>
                      <div class="detail">
                        {{ proposal.content ? proposal.content.description : '' }}
                      </div>
                    </li>
                    <li>
                      <div class="title">
                        Parameter <br>Changes
                      </div>
                      <div v-if="proposal.content" class="detail">
                        <div v-for="change in proposal.content.changes" :key="change.key">
                          <span>{{ change.key }}</span>
                          <span>:</span>
                          <span v-if="change.value">
                            <span v-if="JSON.parse(change.value)">
                              <div v-for="(value, index) in JSON.parse(change.value)" :key="index">
                                <span v-if="typeof value == 'string'">{{ index }}: {{ value }}</span>
                                <span v-else-if="value">
                                  <div v-for="(item, indexChild) in value" :key="indexChild">
                                    <span>{{ index }}: {{ item.amount | convertAmount(true) }}.{{ item.amount | convertAmount(false) }} ATOM</span>
                                  </div>
                                </span>
                              </div>
                            </span>
                            <span v-else>{{ change.value }}</span>
                          </span>
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
              <h3>{{ vote.length | convertAmount(true, true) }}.{{ vote.length | convertAmount(false, true) }}</h3>
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
                <ul>
                  <li>
                    <div class="color col-green">
                      <i class="fa fa-circle" aria-hidden="true" />
                    </div>
                    <div class="name-title">
                      Yes
                    </div>
                    <div class="percent">
                      {{ voteData.yes.length | getPercent(vote.length) }}%
                    </div>
                    <div class="number">
                      {{ voteData.yes.length | convertAmount(true, true) }}.{{ voteData.yes.length | convertAmount(false, true) }}
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
                      {{ voteData.no.length | getPercent(vote.length) }}%
                    </div>
                    <div class="number">
                      {{ voteData.no.length | convertAmount(true, true) }}.{{ voteData.no.length | convertAmount(false, true) }}
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
                      {{ voteData.no_with_veto.length | getPercent(vote.length) }}%
                    </div>
                    <div class="number">
                      {{ voteData.no_with_veto.length | convertAmount(true, true) }}.{{ voteData.no_with_veto.length | convertAmount(false, true) }}
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
                      {{ voteData.abstain.length | getPercent(vote.length) }}%
                    </div>
                    <div class="number">
                      {{ voteData.abstain.length | convertAmount(true, true) }}.{{ voteData.abstain.length | convertAmount(false, true) }}
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
              <table class="table table-striped table-bordered table-hover">
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
import { mapState, mapActions } from 'vuex'
import headerData from '@/components/header/Header.vue'
import voterTable from '@/components/elements/voter.vue'
import Vue from 'vue'
import Doughnut from '@/components/libs/DoughnutChart.vue'
import EmptyTable from '~/components/error/EmptyTable.vue'
import helper from '~/utils/helper'

export const eventBus = new Vue()
export const eventBus2 = new Vue()

export default {
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 8, 8)
    },
    getStatusProposal (value) {
      return helper.getTypeProposal(value)
    },
    getTypeProposal (value) {
      value = value.split('.')
      return value[value.length - 1]
    },
    getTotalDeposit (value, isInt) {
      const total = helper.calculateValueFromArr(value) / Math.pow(10, 6)

      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    },
    convertAmount (value, isInt, notDevice = false) {
      value = notDevice ? value : value / Math.pow(10, 6)

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
    headerData,
    voterTable,
    EmptyTable,
    Doughnut
  },
  header: {
    title: 'Proposal detail'
  },
  data () {
    return {
      data: {
        labels: [
          'None'
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
        deposit: false
      },
      voteData: {
        yes: [],
        no: [],
        no_with_veto: [],
        abstain: [],
        current: 1
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
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error when proposal detail: ', error)
        this.loaded.proposal_detail = true
      })

      this.getDeposit({
        proposal_id: id
      }).then((deposit) => {
        console.log('deposit = ', deposit)
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
        if (vote.length) {
          this.data = {
            labels: [
              'Yes',
              'No',
              'No With Veto',
              'Abstain'
            ],
            datasets: [{
              data: [
                this.voteData.yes.length,
                this.voteData.no.length,
                this.voteData.no_with_veto.length,
                this.voteData.abstain.length
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
        }
        eventBus2.$emit('changeData', this.data)
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
