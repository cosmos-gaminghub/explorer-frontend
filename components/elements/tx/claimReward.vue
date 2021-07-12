<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div class="detail">
      {{ logsObj | getAmountFromLogs(index, type) }} ATOM
    </div>
  </li>
</template>
<script>
import helper from '~/utils/helper'

export default {
  filters: {
    getAmountFromLogs (value, index = 0, type = 'withdraw_rewards') {
      let amount = 0
      if (value && value[index]) {
        let i = 0
        let out = false
        const events = value[index].Events
        if (events) {
          for (; i < events.length; i++) {
            if (out) { break }
            if (events[i].Type === type) {
              let j = 0
              const attr = events[i].Attributes
              for (; j < attr.length; j++) {
                if (attr[j].Key === 'amount') {
                  console.log('attr = ', events, i, attr, j)
                  const splitAmount = attr[j].Value.split('uatom')
                  amount = splitAmount ? parseFloat(splitAmount[0]) : 0
                  out = true
                  break
                }
              }
            }
          }
        }
      }

      amount /= Math.pow(10, 6)
      const decimal = (amount.toFixed(6).toString()).split('.')
      return [helper.formatNumber(parseInt(amount)), decimal[1]].join('.')
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['logsObj', 'index', 'type', 'text']
}
</script>
