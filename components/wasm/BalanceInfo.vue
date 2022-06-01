<template>
    <div class="card_container" v-if="isAddress(address)">
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
        isAddress (value) {
            const prefix = this.$store.state.network.current_network ? this.$store.state.network.current_network.prefix : 'cosmos'
            const address = Buffer.from(value).toString().slice(9);
            return address.indexOf(prefix) == 0
        }
    }
}
</script>
