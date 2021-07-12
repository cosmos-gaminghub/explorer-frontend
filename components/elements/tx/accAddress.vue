<template>
  <li>
    <div class="title">
      {{ text }}
    </div>
    <div class="detail">
      <a v-if="address" :href="'/account/'+address">
        {{ address }}
      </a>
      <span v-if="amount">({{ amount | convertAmount(true) }}.{{ amount | convertAmount(false) }} ATOM)</span>
    </div>
  </li>
</template>
<script>
import helper from '~/utils/helper'

export default {
  filters: {
    convertAmount (value, isInt = false, notArr = false) {
      let total = 0
      if (notArr) {
        total = parseFloat(value)
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
  props: ['address', 'text', 'amount']
}
</script>
