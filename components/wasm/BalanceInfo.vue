<template>
    <div class="card_container">
        <div class="card_cardHeader">
            <nuxt-link class="balances_address" :to="{name: 'account-address', params: { address: formatAddress(address) }}">
                {{ formatAddress(address) }}
            </nuxt-link>
            <div class="balanceLabel">Balance</div>
        </div>
        <div class="card_cardContent">
            <span class="decimal_decimal">
                <span class="decimal-text-big">{{ value | formatValue }}</span>
                <span class="text-demo">{{ symbol }}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    filters: {
        formatValue (value) {
            return Buffer.from(value).toString().replace(/['"]+/g, '')
        }
    },
    props: {
        address: {
            type: Uint8Array
        },
        symbol: {
            type: String
        },
        value: {
            type: Uint8Array
        }
    },
    methods: {
        formatAddress (value) {
            return Buffer.from(value).toString().slice(9);
        },
    }
}
</script>
