<template>
    <div class="Card_container">
        <div class="Card_cardHeader Card_border">
            <div class="PopularContracts_cardHeader">
                <img class="PopularContracts_contractIcon" src="icon.svg" alt="img" />
                <nuxt-link class="PopularContracts_link" :to="{name: 'wasm-contract-address', params: { address: contract_address }}">
                    {{ name }}
                </nuxt-link>
            </div>
        </div>
        <div class="Card_cardContent">
            <div class="CardItem_container">
                <div class="CardItem_label">Contract</div>
                <div class="CardItem_value">{{ contract_version }}</div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Contract Address</div>
                <div class="CardItem_value">
                    <nuxt-link class="PopularContracts_link" :to="{name: 'wasm-contract-address', params: { address: contract_address }}">
                        {{ contract_address | formatAddress }}
                    </nuxt-link>
                </div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Executes</div>
                <div class="CardItem_value">{{ execute }}</div>
            </div>
            <div class="CardItem_container">
                <div class="CardItem_label">Instantiated At</div>
                <div class="CardItem_value">{{ instantiated_at | formatTime }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import helper from '~/utils/helper'
export default {
    filters: {
        formatTime (value) {
            return helper.convertTime(value)
        },
        formatAddress (value) {
            return helper.formatHash(value, 8, 8)
        },
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        contract_address: {
            type: String,
            default: ''
        },
        instantiated_at: {
            type: String,
            default: ''
        },
        execute: {
            type: Number,
            default: ''
        },
        contract_version: {
            type: String,
            default: ''
        }
    }
}
</script>
