<script>
import { Line } from 'vue-chartjs'
import { eventBus } from '~/pages/dashboard/index.vue'

export default {
  extends: Line,
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  created () {
    eventBus.$on('changeData', (data) => {
      if (data) {
        this.renderChart(data, this.options)
      }
    })
  },
  data () {
    return {
      options: {
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              return '$' + (tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              callback: (value, index, values) => {
                value = value.split(' ')
                value = value[1].split(':')
                return [value[0], value[1]].join(':')
              }
            }
          }]
        }
      }
    }
  },
  destroyed () {
    eventBus.$off('changeData')
  },
  mounted () {
    if (this.data) {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>
