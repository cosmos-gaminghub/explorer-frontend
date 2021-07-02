<script>
import { Doughnut } from 'vue-chartjs'
import { eventBus } from '~/pages/account/_address.vue'
import { eventBus2 } from '~/pages/proposals/_id.vue'

export default {
  extends: Doughnut,
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'options'],
  created () {
    eventBus.$on('changeData', (data) => {
      if (data) {
        this.renderChart(data, this.options)
      }
    })
    eventBus2.$on('changeData', (data) => {
      if (data) {
        this.renderChart(data, this.options)
      }
    })
  },
  destroyed () {
    // Stop listening the event hello with handler
    console.log('off')
    eventBus.$off('changeData')
    eventBus2.$off('changeData')
    if (this.$data._chart) {
      this.$data._chart.destroy()
    }
  },
  mounted () {
    if (this.data && this.options) {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>
