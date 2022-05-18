<template>
    
    <td v-if="messages && JSON.parse(messages) && JSON.parse(messages).length > 1">
        <span class="title">Amount</span>
        <nuxt-link :to="{name: 'transactions-address', params: { address: tx_hash }}">
        More
        </nuxt-link>
    </td>
    <td v-else-if="total_amount !== null">
        <span class="title">Amount</span>
        {{ total_amount | convertNumber(true) }}.{{ total_amount | convertNumber(false) }} {{ denom }}
    </td>
    <td v-else>
        <span class="title">Amount</span>
        -
    </td>
</template>
<script>
import helper from '@/utils/helper'
export default {
    props: {
        messages: {
            type: String
        },
        tx_hash: {
            type: String
        },
        denom: {
            type: String
        }
    },
    filters: {
        convertNumber (value, isInt, isDevice = true) {
        let total = parseFloat(value)
            if (isDevice) { total /= Math.pow(10, 6) }
            if (isInt) {
                return helper.formatNumber(parseInt(total))
            } else {
                const decimal = (total.toFixed(6).toString()).split('.')
                return decimal[1]
            }
        },
    },
    computed: {
        total_amount () {
            return helper.getAmount(this.messages)
        }
    }
}
</script>
