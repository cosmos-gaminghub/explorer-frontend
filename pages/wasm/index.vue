<template>
    <div class="page-content header-smaller">
        <div class="main-body-content">
        <div class="cos-notice custom-page-title">
            <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                    <h2 class="page-title">
                    Wasm Contracts
                    </h2>
                </div>
                <!-- <div class="col-lg-8 col-md-12 col-sm-12">
                    <header-data />
                </div> -->
            </div>
            <div class="main-md-content delegated-missed md-full">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <section class="Section_container PopularContracts_container">
                            <div class="SectionHeader_sectionHeader">
                                <h2 class="SectionHeader_sectionHeading">Popular Contracts</h2>
                            </div>
                            <div class="SectionContent_sectionContent">
                                <section class="PopularContracts_cardContainer">
                                    <PopularItem
                                        v-for="contract in popular_contracts"
                                        :key="contract.contract_address" 
                                        :name="contract.label" 
                                        :contract_address="contract.contract_address" 
                                        :contract_version="contract.version" 
                                        :execute="contract.executed_count" 
                                        :instantiated_at="contract.instantiated_at" 
                                    />
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import PopularItem from '~/components/wasm/PopularContractItem.vue'
import headerData from '@/components/header/Header.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        PopularItem,
        headerData
    },
    data () {
        return {
            popular_contracts: []
        }
    },
    mounted () {
        this.getContracts(
            {
                offset: 0,
                size: 1000
            }
        ).then((data) => {
            this.popular_contracts = data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        ...mapActions({
            getContracts: 'contracts/GET_DATA',
        }),
    }
}
</script>

<style scoped>
</style>