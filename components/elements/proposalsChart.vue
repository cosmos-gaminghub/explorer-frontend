<template>
  <div v-if="proposals.length" class="main-md-content delegated-missed">
    <div class="scroll-proposals">
      <ul class="list-proposals">
        <li v-for="proposal in filteredRow" :key="proposal.id">
          <div class="id">
            #{{ proposal.id }}
          </div>
          <div class="content-proposals">
            <div class="left">
              <h4>
                <nuxt-link v-if="proposal.content" :to="'/proposals/'+proposal.id" class="not-class-link">
                  {{ proposal.content.title }}
                </nuxt-link>
              </h4>
              <div class="list-time">
                <div class="item">
                  <div class="name">
                    Proposer
                  </div>
                  <div class="cnt">
                    <nuxt-link :to="'/account/'+proposal.proposer">
                      {{ proposal.proposer | formatHash }}
                    </nuxt-link>
                  </div>
                </div>
                <div class="item">
                  <div class="name">
                    Voting Start
                  </div>
                  <div class="cnt">
                    {{ proposal.voting_start | convertTime }}
                  </div>
                </div>
                <div class="item">
                  <div class="name">
                    Submit Time
                  </div>
                  <div class="cnt">
                    {{ proposal.submit_time | convertTime }}
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <a :class="'btn btn-passed btn-status-proposal ' + proposal.status">{{ proposal.status | getStatusProposal }}</a>
              <div class="images">
                <doughnut
                  v-if="proposal.max"
                  :data="getDataForChart(proposal.max)"
                  :options="option"
                  :height="73"
                  :width="72"
                />
              </div>
              <div class="text-note">
                <p v-if="proposal.max">Most voted on</p>
                <div v-if="proposal.max" class="note-color">
                  <i :class="'fa fa-circle color-vote-option-'+(proposal.max.text).toLowerCase()" aria-hidden="true" /><span>{{ proposal.max.text }} {{ proposal.max.value | getPercent(proposal.max.total) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Doughnut from '@/components/libs/DoughnutChartEl.vue'
import helper from '~/utils/helper'

export default {
  components: {
    Doughnut
  },
  filters: {
    formatHash (value) {
      return helper.formatHash(value, 6, 6)
    },
    convertTime (value) {
      return helper.convertTime(value)
    },
    getStatusProposal (value) {
      return helper.getTypeProposal(value)
    },
    getPercent (value, total) {
      const percent = (total) ? (value / total) * Math.pow(10, 2) : 0

      return percent.toFixed(2)
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['proposals'],
  data () {
    return {
      option: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      arrayColors: {
        yes: '#65A246',
        no: '#F0142F',
        no_with_veto: '#F99600',
        abstain: '#57B8FF'
      }
    }
  },
  computed: {
    filteredRow () {
      return this.proposals.filter((row, index) => {
        const from = 0
        const to = 4
        if (index >= from && index < to) {
          return true
        }
        return false
      })
    }
  },
  methods: {
    emptyTallyData (value) {
      if (!value) { return true }
      const total = parseFloat(value.yes) + parseFloat(value.no) + parseFloat(value.no_with_veto) + parseFloat(value.abstain)
      return !total
    },
    getDataForChart (value) {
      return {
        labels: [
          value.text
        ],
        datasets: [{
          data: [value.value],
          backgroundColor: [
            this.arrayColors[(value.text).toLowerCase()]
          ],
          hoverOffset: 1
        }]
      }
    }
  }
}
</script>
