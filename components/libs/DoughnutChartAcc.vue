<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'options'],
  mounted () {
    if (this.data && this.options) {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>
