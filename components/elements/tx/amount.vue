<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div v-if="amount && amount.amount" class="detail">
      {{ amount.amount | convertAmount(true, !isArr, notDivide) }}.{{ amount.amount | convertAmount(false, !isArr, notDivide) }} ATOM
    </div>
    <div v-else class="detail">
      {{ (0).toFixed(6) }} ATOM
    </div>
  </li>
</template>
<script>
import helper from '~/utils/helper'

export default {
  filters: {
    convertAmount (value, isInt = false, notArr = false, notDivide = false) {
      let total = 0
      if (notArr) {
        total = parseFloat(value)
        if (notDivide) { total *= Math.pow(10, 6) }
      } else {
        total = helper.calculateValueFromArr(value)
      }
      total /= Math.pow(10, 6)
      if (isInt) {
        return helper.formatNumber(parseInt(total))
      } else {
        const decimal = (total.toFixed(6).toString()).split('.')
        return decimal[1]
      }
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['amount', 'text', 'notDivide', 'isArr']
}
</script>
